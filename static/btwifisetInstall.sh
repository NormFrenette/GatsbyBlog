#run this file with sudo

#1) check python interpreter and get its location:
echo Checking Python version ...
pythonlist=()
#find all pythons on system / check if file or directory / if file check versions
for w in $(whereis python | grep -Po '[^\s]+?/python3\.\d\s'); do 
if [ -f $w ]; then
    vPython=$($w --version | grep -Po '\d+\.\K\d+')
    if ((vPython>=7)); then
        pythonlist+=( $w );
    fi
fi
done
#pythonlist has location of python interpreters that atch version 3.7 or above
foundcount=${#pythonlist[@]}

#if no correct version of python is found - script exits wihout doing anything / warn user to install python 3.7+
if ((foundcount==0)); then
    echo Warning: No python3 interpreter found of version 3.7 or above!
    echo This install script will exit.  
    echo Please install a version of Python at least 3.7 or above, then run this script again.
    echo 
    exit 1
fi
#defaults to first python found
pythondir=${pythonlist[0]};
#if more than one python of correct version is found - give user choice
if ((foundcount>1)); then
    echo More than one python interpreter meets the requirements.
    echo Please select the version/location you want to use:
    for i in ${!pythonlist[@]}; do
        printf "\tenter %s for: %s\n" $i ${pythonlist[$i]}
    done
    echo 
    read -p "Enter your choice [default = 0]: " choice
    choice=${choice:-0}
    for i in ${!pythonlist[@]}; do
    #note if user does not enter a number the expression evaluates to 0 on first pass so 0 is selected
        if [ $choice = $i ] ; then
        pythondir=${pythonlist[i]};
        fi
    done
fi
echo The Bluettooth Python app will use this Python interpreter: $pythondir
echo 

#2 Check wpa_supplicant.conf
echo Checking /etc/wpa_supplicant/wpa_supplicant.conf ...
if [ -f "/etc/wpa_supplicant/wpa_supplicant.conf" ]; then 
    check=$(sed -n /update_config=1/p /etc/wpa_supplicant/wpa_supplicant.conf)
        if [ -z "$check" ]; then
        #add the needed line after the first line:
        sed -i '1 a update_config=1' /etc/wpa_supplicant/wpa_supplicant.conf
        fi
    country=$(sed -n /country=/p /etc/wpa_supplicant/wpa_supplicant.conf)
        if [ -z "$country" ]; then
            echo Warning: the file wpa_supplicant.conf is missing your country code.
            echo Warning: you will not be able to connect to wifi properly.
            echo Please enter your country code to continue. 
            echo If you do not know your contry code - please use this link to retreive it:
            echo "https://www.nationsonline.org/oneworld/country_code_list.htm"
            echo 
            read -p "Enter your country code  - 2 Capital letters only [leave blank to exit]: " countrycode
            cutcode=${countrycode:0:2}
            if [ -z "$cutcode" ]; then
                echo Exiting Install script...
                echo Please find your country code and run the script again to finish the installation.
                exit 1
            fi
            echo $cutcode will be added to "/etc/wpa_supplicant/wpa_supplicant.conf"
            echo If the country code is not valid - you will need to edit the file yourself after installation
            #add the needed line after the first line:
            sed -i "1 a country=$cutcode" /etc/wpa_supplicant/wpa_supplicant.conf
        fi
else
    echo You are missing the wpa_supplicant.conf file.
    read -p "Do you want to create one automatically (enter y or n)? [y]" createconf
    createconf=${createconf:-y}
    if [ $createconf = "y" ] || [ $createconf = "Y" ]; then
    echo creating file ...
        touch /etc/wpa_supplicant/wpa_supplicant.conf
        echo "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=US
update_config=1

" >> /etc/wpa_supplicant/wpa_supplicant.conf
        wpa_cli -i wlan0 reconfigure
        echo the file "/etc/wpa_supplicant/wpa_supplicant.conf" was created with country "code=US"
        echo please edit the file if you are from another country "(and reboot)"
    else
    echo Please create a wpa_supplicant.conf file in directory /etc/wpa_supplicant/
    echo using these directions: https://raspberryexpert.com/raspberry-pi-wifi-setup/
    echo "Then," run the script again to complete installation
    exit 1
    fi
fi
echo OK
echo

#3 Modify the bluetooth service file that came with the system
echo Modifying system bluetoothd.service as needed ...
x=0
if ! sed -n '/^ExecStart/p' /lib/systemd/system/bluetooth.service | grep -q '\-\-experimental'; then 
sed -i 's/^ExecStart.*bluetoothd\b/& --experimental/' /lib/systemd/system/bluetooth.service; 
let x+=1;
fi
if ! sed -n '/ExecStart/p' /lib/systemd/system/bluetooth.service | grep -q '\-P battery'; then 
sed -i 's/^ExecStart.*experimental\b/& -P battery/' /lib/systemd/system/bluetooth.service;  
let x+=1;
fi
#If mods where made: Run systemctl daemon-reload and systemctl restart bluetooth
if ((x>0)); then
echo restarting bluetooth service ...
systemctl daemon-reload;
systemctl restart bluetooth;
fi
echo OK
echo 

#4 Installing glib and dbus dependencies:
echo Installing dependencies for Python modules as needed...
echo 
glib=$($pythondir -c "from gi.repository import GLib" 2>&1| grep  'ModuleNotFoundError\|ImportError')
if [ ! -z "$glib" ]; then
echo installing module GLib ...
apt-get install -y python3-gi 
else 
echo Python module GLib is installed
fi
echo 
dbus=$($pythondir -c 'import dbus' 2>&1 | grep 'ModuleNotFoundError\|ImportError')
if [ ! -z "$dbus" ]; then
echo Installing libdbus-glib package...
apt-get install -y libdbus-glib-1-dev
echo 
pipcheck=$($pythondir -m pip --version 2>&1| grep '\<No module\>')
# -z is true if length of var /string is zero
if [ ! -z "$pipcheck" ]; then
echo Pip module not found - Installing pip for python3...
echo
apt-get install -y python3-pip
echo
fi
echo Installing python module dbus with pip...
echo 
$pythondir -m pip install dbus-python
else 
echo Python module dbus is installed
fi
echo

#5 download files from website:
# first stop service if it is running:
if [ -f "/etc/systemd/system/btwifiset.service" ]; then
echo stopping btwifiset service ...
sudo systemctl stop btwifiset.service
fi
#this creates an empty directory btwifiset (deletes it if it exists)
homeDir=$(eval echo ~$SUDO_USER)
theDir="$homeDir/btwifiset"
echo $theDir
echo Creating Directory: btwifiset in home directory \($homeDir\) ...
if [ -d $theDir ]; then rm -Rf $theDir; fi
sudo -u $SUDO_USER mkdir $theDir
echo OK
echo 
# this fetches the files in the correct directory, untar them and sets permission
echo Downloading Python files to $theDir ...
wget -P $theDir https://normfrenette.com/btwifiset.tar.gz
echo 
echo Unpacking files...
sudo -u $SUDO_USER tar -xzvf $theDir/btwifiset.tar.gz -C $theDir
chmod 755 $theDir/wifiup.py
chmod 755 $theDir/wifidown.py
echo OK
echo 

#6 creating btwifiset.service 
echo Creating or updating  btwifiset.service file ...
sed -r -i "s|(ExecStart.*=).*\/.*\b( \/.*\b)|\1$pythondir\2|g" $theDir/btwifiset.service
mv $theDir/btwifiset.service /etc/systemd/system
chown root: /etc/systemd/system/btwifiset.service

echo starting btwifiset.service...
systemctl daemon-reload
systemctl enable btwifiset.service
systemctl start btwifiset.service
#/etc/systemd/system

echo OK
echo Installation complete.
echo Set-Wifi-via-Bluetooth service '(btwifiset.service)' is running,
echo and is set to start automatically on Raspberry Pi boot.
echo 
echo By default Btwifiset runs 15 minutes after boot/start then shuts down.  
echo Edit btwifiset.ini to change this behavior.
echo
echo You may now connect to this Raspberry Pi with the iphone app SetWifiViaBT 
