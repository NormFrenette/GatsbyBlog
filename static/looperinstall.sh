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

#2 Modify the bluetooth service file that came with the system
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

#4 Installing glib and dbus and alsaaudio dependencies:
echo Installing dependencies for Python modules as needed...
echo 
echo Checking if pip for Python3 is installed...
echo 
pipcheck=$($pythondir -m pip --version 2>&1| grep '\<No module\>')
# -z is true if length of var /string is zero
if [ ! -z "$pipcheck" ]; then
echo Pip module not found - Installing pip for python3...
echo
apt-get install -y python3-pip
echo
fi

echo Checking for Python module alsaaudio...
echo 
alsamod=$($pythondir -c 'import alsaaudio' 2>&1 | grep 'ModuleNotFoundError\|ImportError')
if [ ! -z "$alsamod" ]; then
echo Installing alsaaudio module...
echo
$pythondir -m pip install pyalsaaudio
else 
echo OK
fi
echo 
echo Checking for Python module GLib...
echo 
glib=$($pythondir -c "from gi.repository import GLib" 2>&1| grep  'ModuleNotFoundError\|ImportError')
if [ ! -z "$glib" ]; then
echo installing module GLib ...
apt-get install -y python3-gi 
else 
echo OK
fi
echo 
echo Checking for Python module dbus...
echo 
dbus=$($pythondir -c 'import dbus' 2>&1 | grep 'ModuleNotFoundError\|ImportError')
if [ ! -z "$dbus" ]; then
echo Installing libdbus-glib package...
echo 
apt-get install -y libdbus-glib-1-dev
echo 
echo Installing python module dbus with pip...
echo 
$pythondir -m pip install dbus-python
else 
echo OK
fi
echo

#5 download files from website:
# first stop service if it is running: (if user is downloading an update)
if [ -f "/etc/systemd/system/looper.service" ]; then
echo stopping looper service ...
sudo systemctl stop looper.service
fi
#Note: tar will overwrite files and directories / which we do not want if user is updating 
#by rerunning this automatic install. Check for dir loop and file looper4.py...
homeDir=$(eval echo ~$SUDO_USER)
loopDir="$homeDir/loop"
loopFile="$loopDir/looper4.py"
echo $loopDir
echo $loopFile
if [ -d $theDir ] && [ -f $loopFile ]; then 
tmpDir="$homeDir/temp"$(date +"%m%d%y")
if [ -d $tmpDir ]; then rm -Rf $tmpDir; fi
sudo -u $SUDO_USER  mkdir $tmpDir
sudo -u $SUDO_USER  wget -P $tmpDir https://normfrenette.com/looper.tar.gz
sudo -u $SUDO_USER  tar -xzvf $tmpDir/looper.tar.gz --directory $tmpDir
mv $tmpDir/loop/looper4.py $loopDir
mv $tmpDir/loop/bt_svc.py $loopDir
mv $tmpDir/loop/statemgr.py $loopDir
mv $tmpDir/loop/rgb_segment.py $loopDir
rm -Rf $tmpDir
echo 
echo Python files were updated.
echo 
else
sudo -u $SUDO_USER  wget -P $homeDir https://normfrenette.com/looper.tar.gz
sudo -u $SUDO_USER  tar -xzvf $homeDir/looper.tar.gz --directory $homeDir
# checking .asoundrc for correct usb card number (set to 1 in downloaded files)
usbcard=$(aplay -l | grep 'USB' | grep -Po 'card\s\d')
if [ "$usbcard" != "card 1" ]; then
if [ -z "$usbcard" ]; then
echo ERROR: No usb sound card found! 
echo Please check looper and ensure usb sound card is connected.
echo Installation will now stop.   
echo Relauch installation after usb card is plugged in to raspberry pi looper.
echo Note: If you are not using a usb sound card - you cannot use this automated install file.
exit 1
else
echo Fixing .asoundrc file for usb card: $usbcard
sed -i "s/card 1/$usbcard/g" $homeDir/.asoundrc
fi
fi
sudo chown root: ~/.asoundrc
#
mv segment.service /etc/systemd/system
chown root: /etc/systemd/system/segment.service
systemctl enable segment.service
#this modifies the looper-service file in home dir with correct python path
sed -r -i "s|(ExecStart.*=).*\/.*\b( \/.*\b)|\1$pythondir\2|g" $homeDir/looper.service
mv ~/loop/looper.service /etc/systemd/system
chown root: /etc/systemd/system/looper.service
systemctl enable looper.service 
fi


