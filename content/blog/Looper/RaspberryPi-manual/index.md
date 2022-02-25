---
title: Manually Install Looper Code on RPi
date: "2022-02-25T10:00:00.000Z"
description: Step-by-step commands in RPi Terminal to install files needed for the Looper pedal.
mainTag: Software Installation
---
#### About
Step by Step (manuallly) install on your Raspberry Pi the looper code written in Python.
> **Warning:**  
>The software you are about to install is intended to run on a **dedicated** Raspberry Pi (RPi), inside a Looper Pedal Enclosure.  
>As a result, this install may **overwrite** some other programs, or **break** some other software you have previously installed on the Raspberry Pi (especially if you were using it for audio or video).
> Furthermore, the Looper runs a very tight loop for sampling audio - and if you use the raspberry pi to run other programs at the same time, the Looper audio may skip, have unacceptable delays, and otherwise not be very musically usable.

***In short: Please use a dedicated Raspberry Pi with a fresh OS install to enjoy this looper pedal.***

#### Requirements
1. Operating System (OS):
The Raspberry Pi Operating System must be already installed (typically on an SD card), it boots, and you have the ability to control it via terminal (either SSH from another computer for headless Pi or with attached keybaord/mouse/monitor for desktop version).

2. Python3: 
Version 3.7 or later **must** be instaled on the Raspberry Pi.  *(see below how to check this)*  
Here is one way to [install the newest python version](/Python/Installation-RaspberryPi-Higher-Version/) 

#### General
All commands below are to be typed at the prompt in a terminal window on the Raspberry Pi.
- If you are on a headless RPi - it is assumed you have SSH into the RPi from your computer in a terminal window.
- If you are using the desktop version of the Pi OS - please open a terminal session.

Copy/paste or type the commands shown in the (grey-colored) code blocks below,  into your terminal on the RPi - one line at the time - and run them (hit return on keyboard).

#### Step 1 - Get the Raspberry Pi ready
1. Check your Raspberry pi OS release:
```
sudo cat /etc/os-release
```
> The software has been tested on Raspbian 10 & 11. Consider upgrading the RPI to a newer release if your release is below 10.
2. Update the Raspberry Pi:
```
sudo apt-get update
sudo apt-get full-upgrade
sudo reboot
```

#### Step 2 - get Python ready
1. Check your version of python3 on the Rpi.
> If you have not installed a new version of Python3 on the pi you may use the version that came with the operating system - this command returns the version of python3 on your RPi:
```
python3 --version
```
> **If the version returned is less then Python 3.7, you must install a newer version of Python before continuing.** Here is one way to [install the newest python](/Python/Installation-RaspberryPi-Higher-Version/) 

These instructions assumes you installed the latest version of the RPi OS - which comes with Python version 3.9. The instructions make use of this system python.  
> If you have installed a different (newer) version of python and created an alias, or if you are installing python in a separate environment,  - replace all instances of **python3** in the commands below with your alias/environment.

2. Check if you have **pip** installed:
```
python3 -m pip --version
```
3. If the previous command returned *No module named pip* instead of a version number  - install pip with this command:
```
sudo apt install python3-pip
```

#### Step 3 - Check for/Install Python modules:
The Looper python script requires the use of three python modules not included with the python interpreter: **dbus**,  **GLib** and **alsaaudio**.

1. Check if **GLib** is installed (*do not forget the single quotes*):
```
python3 -c 'from gi.repository import GLib'
```
If this command returns nothing it means GLib is already installed - go to next bullet.  
If it returns: *no module...* or *Import Error ...* - you need to install GLib with this command:
```
apt-get install -y python3-gi
```

2. Next, check if **dbus** is installed:
```
python3 -c 'import dbus'
```
If this command returns nothing it means dbus is already installed.  
If this command returns: *no module...* - you need to install dbus as follows:    
First install libdbus-glib package:
```
apt-get install -y libdbus-glib-1-dev
```
Then install the Python module dbus using pip:  
(*make sure you installed pip from step 2.3 above*)
```
python3 -m pip install dbus-python
```
3. Next - check if **alsaaudio** is installed:
```
python3 -c 'import alsaaudio'
```
If this command returns nothing it means alsaaudio is already installed.  
If this command returns: *no module...* - you need to install alsaaudio as follows:
```
python3 -m pip install pyalsaaudio
```

4. Test the installs - these command should return nothing if properly installed:
```
python3 -c 'import dbus'
python3 -c 'from gi.repository import GLib'
python3 -c 'import alsaaudio'
```

#### Step 4 - Modify the BlueZ service that came with Raspbian:
The system service for bluetooth needs to be modified to run BLE,  and to stop it from constantly requesting the battery status of the iphone/ipad that will connect to it (*default behavior*).

1. Open the configuration file in your prefered editor - here we use nano:
```
sudo nano /lib/systemd/system/bluetooth.service
```
2. Find the line that starts with **ExecStart** and add the following at the end of the line - on the same line, leaving a space before the two hyphens:
```
  --experiemntal -P battery
```
> the resulting line should read something like this (*note: the path may be different - leave it as is*): 
>ExecStart=/usr/lib/bluetooth/bluetoothd --experimental -P battery
3. Save the file (for nano: Ctrl o + return) and exit (for nano: Ctrl x)
4. Reboot the Raspberry Pi for changes to take effect:
``` 
sudo reboot
```

#### Step 5: download the code 
You will download a compressed file (tar archive) into your home directory - and unpack it. It will create the necessary sub-directories (loop, data, repo).  
>**Warning:** This will download a file named .asoundrc which is needed to correctly set-up the usb sound card of the looper.  If you have just created a new SD card with RPi OS (recomended) for the looper - the .asoundrc file does not exist - and all will be fine.  If however you have previously created a .soundrc file - **this will overwrite it**.  You should rename your current .asoundrc (to something like .asoundrc_old) before downloading.  You will then need to manually merge the old and new file.  
1. Navigate to your home directory:
```
cd ~
```
2. Download the compressed file into this directory, then extract the files. Type these commands:
```
wget https://www.normfrenette.com/looper.tar.gz
tar -xzvf btwifiset.tar.gz
```
3. Change the owner of the .asoundrc file:
```
sudo chown root: ~/.asoundrc
``` 

#### Step 6: Verify that the usb sound card settings are correct:
1. First reboot the Raspberry Pi - so it can read the .asoundrc file just downloaded in your home directory.
```
sudo reboot
```
2. Check that the USB card is seen as card index #1 - type this in the terminal:
``` 
aplay -l   
```
3. This lists the various devices (called cards) seen on your RPI.  Look for a line that says something like:
```
card 1: Device [USB Audio Device], device 0: USB Audio [USB Audio]
```
4. If the USB Audio device you are using for the looper is listed wiht a **different number than card 1**, you must edit the .asoundrc file.  
Open the file in an editor like nano (use sudo since we made the owner: root)
```
sudo nano ~/.asoundrc
```
Locate the lines:
```
pcm.output {
  type hw
  card 1
}

ctl.!default {
  type hw
  card 1
}
```
and change the card number to the number that was listed above for USB audio device (using the aplay command).  
Save (ctrl-o + return) and exit (ctrl-x) the editor.  
Then reboot the RPi and repeat this step - ensuring that the card number in the .asoundrc file matches the card number of the USB Audio device listed with the command "aplay -l".

#### Step 7: move the necessary Systemd service files where they belong:
1. make sure you are in the home directory:
```
cd ~
```
2. Move the segment.service file. Then change it's owner to root.
```
sudo mv segment.service /etc/systemd/system
sudo chown root: /etc/systemd/system/segment.service
```
3. enable the service to start automatically at start-up:
```
sudo systemctl enable segment.service
```
4. change the path to the python interpreter:  
At the time of writing (Feb 2022), the looper.service file is set to use the python interpreter which comes with the currently available Raspberry Pi OS (Debian version 11 - bullseye) - which path is:
> /usr/bin/python3.9
If you are using  different interpreter, or you installed a newer python and created an alias, you must edit the looper.service file and change the path on the line: (path is bolded here for clarity)
> ExecStart=**/usr/bin/python3.9** /home/pi/loop/looper4.py
If you need to change the path - open the file in your editor:
```
nano looper.service
```
and change - only the bolded path in the line displayed above - with the path or alias to your python interprter.  
> Make sure you do not change the second part of the line (path-to-looper-code) - and leave the space between the path-to-Python-Interpreter.  

5. You now can move the file and change its owner to root:
```
sudo mv looper.service /etc/systemd/system
sudo chown root: /etc/systemd/system/looper.service
```
6. Enable the service to start automatically at start-up:
```
sudo systemctl enable segment.service
```

#### Step 8 -  Reboot the pi and use the Looper Pedal
Upon reboot - assuming all is fine with the electronics,  you will see:
- First, the letters L O O P scroll accross the 7 segment diode. (*this can be very short depending how fast your Raspberry pi is*)
- Second - a short random pattern on the 7-segment diode followed by the number zero (if looper is in edit/bypass mode) or an hyphen (-) if looper is in run mode.

The short random pattern indicates that the looper pedal is ready to use.  The number zero or hyphen indicates there are currently no tracks recorded in the Looper.  Refer to the instructions on how to use the looper.



