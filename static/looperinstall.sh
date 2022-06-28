#run this file with sudo

echo "
*******************************************************
****                                               ****
**** Installation of  Looper files on Raspberry Pi ****
****                                               ****
*******************************************************"

#check if fresh install - by checking for .ini file
homeDir=$(eval echo ~$SUDO_USER)
iniFile="$homeDir/loop/looper.ini"

if [ -f $iniFile ]; then
echo Looper.ini file - OK
chosenBuild=0
else
echo "
First, We need to to know which Physical Build you used 
to assemble the looper,so we can set the GPIO pin numbers 
correctly in the software."
echo
echo "
Enter 1 or 2 only if you followed the wiring instruction 
from the website normfrenette.com. Otherwise enter 3."
echo
echo "Please select your build (enter 1, 2 or 3):"

select built in "Raspberry Pi HAT Proto Board wired per website instructions" \
"Looper PCB version 1.0 - obtained from normfrenette.com" \
"Any other build (you wired your own GPIO pins numbers)" 
do
    if [[ ! -z "$built" ]]; then 
        echo You have chosen $REPLY: 
        echo " ===> $built"
        read -p "**** Please confirm [y/n]: " confirmchoice
        confirmchoice=${confirmchoice:-'y'}
        if [[ "$confirmchoice" == "Y" || "$confirmchoice" == "y" ]] ; then
            break
        else 
        echo Please re-enter your choice: 1,2 or 3:
        fi
    else
    echo Please enter selection 1, 2, or 3
    fi
done
chosenBuild=$REPLY

fi


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
echo Checking for Python module alsaaudio...
echo 
alsamod=$($pythondir -c 'import alsaaudio' 2>&1 | grep 'ModuleNotFoundError\|ImportError')
if [ ! -z "$alsamod" ]; then
echo Installing alsaaudio module...
echo
sudo apt-get install libasound2-dev
$pythondir -m pip install pyalsaaudio
else 
echo OK
fi

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
if [ -d $loopDir ] && [ -f $loopFile ]; then 
tmpDir="$homeDir/temp"$(date +"%m%d%y")
if [ -d $tmpDir ]; then rm -Rf $tmpDir; fi
sudo -u $SUDO_USER  mkdir $tmpDir
echo downloading files to temporary directory $tmpDir...
sudo -u $SUDO_USER  wget -P $tmpDir https://normfrenette.com/looper.tar.gz
sudo -u $SUDO_USER  tar -xzvf $tmpDir/looper.tar.gz --directory $tmpDir
echo moving python files...
mv $tmpDir/loop/looper4.py $loopDir
mv $tmpDir/loop/bt_svc.py $loopDir
mv $tmpDir/loop/looperui.py $loopDir
mv $tmpDir/loop/segment.sh $loopDir
#add the location of the looper.ini file to segment
sed -i "s|^ini_file=|&$homeDir/loop/looper.ini|" $homeDir/loop/segment.sh
rm -Rf $tmpDir
echo 
echo Python files were updated.
echo 
else
sudo -u $SUDO_USER  wget -P $homeDir https://normfrenette.com/looper.tar.gz
sudo -u $SUDO_USER  tar -xzvf $homeDir/looper.tar.gz --directory $homeDir
# copy the correct looper.ini file - delete others
case "$chosenBuild" in
    "1")
    mv $loopDir/looperHAT $loopDir/looper.ini
    rm $loopDir/looperBLANK
    rm $loopDir/looperPCB
    ;;
    "2")
    mv $loopDir/looperPCB $loopDir/looper.ini
    rm $loopDir/looperBLANK
    rm $loopDir/looperHAT 
    ;;
    "3")
    mv $loopDir/looperBLANK $loopDir/looper.ini
    rm $loopDir/looperHAT
    rm $loopDir/looperPCB
    ;;
esac

#add the location of the loper.ini file to segment
sed -i "s|^ini_file=|&'"$homeDir/loop/looper.ini"'|" $homeDir/loop/segment.sh
chown root: $homeDir/.asoundrc
chmod 666 $homeDir/.asoundrc
# checking .asoundrc for correct usb card number (set to 1 in downloaded files)
usbcard=$(aplay -l | grep 'USB' | grep -Po 'card\s\d')
if [ -z "$usbcard" ]; then
echo ERROR: No usb sound card found! 
echo Please check looper and ensure usb sound card is connected.
echo Installation will now stop.   
echo Relauch installation after usb card is plugged in to raspberry pi looper.
echo Note: If you are not using a usb sound card - you cannot use this automated install file.
exit 1
fi
rm $homeDir/looper.tar.gz
fi
#
if [ -f /etc/systemd/system/segment.service ]; then 
echo segment.service file - OK
else
#this adds segment.sh location to file then moves it
sed -i "s|^ExecStart=|&$homeDir/loop/segment.sh|" $homeDir/segment.service
mv $homeDir/segment.service /etc/systemd/system
chown root: /etc/systemd/system/segment.service
systemctl enable segment.service
fi
if [ -f /etc/systemd/system/looper.service ]; then 
echo looper.service file - OK
else
#this adds python interpreter location and looper4.py location to file then moves it
sed -i "s|^ExecStart=|&$pythondir $homeDir/loop/looper4.py|" $homeDir/looper.service
mv $homeDir/looper.service /etc/systemd/system
chown root: /etc/systemd/system/looper.service
systemctl enable looper.service 
fi
echo "********* Install complete. ****************"
echo 
echo Please reboot Raspberry Pi to start looper. 
echo "at the prompt - type: sudo reboot "
echo
if (( chosenBuild>0 )); then
echo "************** WARNING ************** WARNING **************"
fi
case "$chosenBuild" in
    "1")
    echo "
    The looper.ini file uses GPIO pin assignment from 
    Raspberry Pi HAT Proto board instructions at normfrenette.com.
    If you made changes to pin assignment (different from website instructions),
    you must edit looper.ini file BEFORE starting the Looper (before reboot)
    to prevent dammage to your Raspberry Pi."
    ;;
    "2")
    echo "
    looper.ini file uses GPIO pin assignment from Looper PCB version 1.0
    obtained from  normfrenette.com.
    If you used an older version of the PCB (or did not use the PCB)
    you must edit looper.ini file BEFORE starting the Looper (before reboot)
    to prevent dammage to your Raspberry Pi."
    ;;
    "3")
    echo "
    The looper.ini file MUST BE EDITED before you 
    reboot to startthe Looper.
    You must enter the GPIO pin assignment you used
    to connect to LED and switches during your build.
    The looper will fail to start if you do not edit the file
    to protect potential dammage to the Raspberry Pi.
    "
    ;;
esac
echo 
if (( chosenBuild>0 )); then
echo " Note - how to edit the looper.ini file:
1) at the prompt type: nano ${loopDir}/looper.ini
2) using arrows, scroll down to bottm and enter GPIO BCM pin number in list
   to match the LED, switches and segment LED pins
3) do: ctrl-o and hit return to save your changes (hold ctrl and o keys together)
4) do: ctrl-x to exit editor.  File is now ready to use
5) reboot looper:  type:  sudo reboot"
fi

