---
title: Manually Install Looper Code on RPi
date: "2022-04-06T10:00:00.000Z"
description: Step-by-step commands in RPi Terminal to install files needed for the Looper pedal.
mainTag: Software-Installation
---
#### Current Version: Beta - June 15, 2022
In the early days of deploying thi software, I am making changes often, based on early adopters comments and experiences.  Check here often to see if I have posted a new version - identified by the ***date***.
>Note: I am not changing the version  number of the software while in Beta.  
> To check current version date on your Raspberry Pi:  Open looperLog.log file in the loop directory and look for the line that starts with ********* Starting Looper ** version date ...

#### About
Step by Step (manually) install on your Raspberry Pi the looper code written in Python.
> **Warning:**  
>The software you are about to install is intended to run on a **dedicated** Raspberry Pi (RPi), inside a Looper Pedal Enclosure.  
>As a result, this install may **overwrite** or **break** some other audio/video programs/config files  you have previously installed on the Raspberry Pi.
> Furthermore, the Looper runs a very tight loop for sampling audio - and if you use the raspberry pi to run other programs at the same time, the Looper audio may skip, have unacceptable delays, and otherwise not be very musically usable.

***In short: Please use a dedicated Raspberry Pi with a fresh OS install to enjoy this looper pedal.***

#### Requirements
1. Operating System (OS):
The Raspberry Pi Operating System must be already installed (typically on an SD card), it boots, and you have the ability to control it via terminal (either SSH from another computer for headless Pi or with attached keyboard/mouse/monitor for desktop version).

2. Python3: 
Version 3.7 or later **must** be installed on the Raspberry Pi.  *(see below how to check this)*  
Here is one way to [install the newest python version](/Python/Installation-RaspberryPi-Higher-Version/#sectionTop) 

#### General
All commands below are to be typed at the prompt in a terminal window on the Raspberry Pi.
- If you are on a headless RPi - it is assumed you have SSH into the RPi from your computer in a terminal window.
- If you are using the desktop version of the Pi OS - please open a terminal session.

Copy/paste or type the commands shown in the (grey-colored) code blocks below,  into your terminal on the RPi - one line at the time - and run them (hit return on keyboard).  Install instructions use the linux command line

> I have written a script that automates all installations task.  If you want to go faster and are not interested in each details of the installation, go [here](/Looper/Software-Installation-Raspberry-Pi-Automated/#sectionTop).

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
> If you have not installed a latest version of Raspberry Pi OS (bullseye) you may use the Python version that came with the operating system.

 This command returns the version of python3 on your RPi:
```
python3 --version
```
> **If the version returned is less then Python 3.7, you must install a newer version of Python before continuing.** Here is one way to [install the newest python](/Python/Installation-RaspberryPi-Higher-Version/#sectionTop).  

These instructions assumes you installed the latest version of the RPi OS - which comes with Python version 3.9. The instructions make use of this system python.  
> If you have installed a different version of python and created an alias, or if you are installing python in a separate environment,  - replace all instances of **python3** in the commands below with your alias/environment.

2. Check if you have **pip** installed:
```
python3 -m pip --version
```
3. If the previous command returned *No module named pip* instead of a version number  - install pip with this command:
```
sudo apt install python3-pip
```

#### Step 3 - Check for/Install Python modules:
The Looper python script requires the use of three python modules not included with the Python install: **dbus**,  **GLib** and **alsaaudio**.

1. Check if **GLib** is installed (*do not forget the single quotes*):
```
python3 -c 'from gi.repository import GLib'
```
If this command returns nothing it means GLib is already installed - go to next bullet.  
If it returns: *no module...* or *Import Error ...* - you need to install GLib with this command:
```
apt-get install -y python3-gi
```

2. Next, check if **dbus** is installed, with:
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
If this command returns: *no module...* - you need to install alsaaudio with these commands, one after the other:
```
sudo apt-get install libasound2-dev
python3 -m pip install pyalsaaudio
```

4. Test the modules installation - These command should return nothing if properly installed:
```
python3 -c 'import dbus'
python3 -c 'from gi.repository import GLib'
python3 -c 'import alsaaudio'
```

#### Step 4 - Modify the BlueZ service that came with Raspbian:
The system service for bluetooth needs to be modified to run BLE,  and to stop it from constantly requesting the battery status of the iphone/ipad that will connect to it (*default behavior*).

1. Open the bluetooth service file in your preferred editor - here we use nano:
```
sudo nano /lib/systemd/system/bluetooth.service
```
2. Find the line that starts with **ExecStart** and add the following at the end of the line - on the same line, leaving a space before the double hyphens:
```
  --experimental -P battery
```
> the resulting line should read something like this (*note: the path may be different - leave it as is*): 
>ExecStart=/usr/lib/bluetooth/bluetoothd --experimental -P battery
3. Save the file (for nano: Ctrl-o + return) and exit (for nano: Ctrl-x)
4. Reboot the Raspberry Pi for changes to take effect:
``` 
sudo reboot
```
>Note: ***ctrl-o*** means press the control key and the letter o at the same time.

#### Step 5: download the code 
You will download a compressed file (tar archive) into your home directory - and unpack it. It will create the necessary sub-directories (loop, data, repo).
> You access your home directory by doing a change directory by typing: ***cd ~***  - then you can get the full path of your directory by typing: ***pwd***  .This will return your home directory.  For me it is /home/pi.  

>**Warning:** This will download and unpack a file named .asoundrc which is needed to correctly set-up the usb sound card of the looper.  If you have just installed a fresh version of the RPi OS (recommended) - the .asoundrc file does not exist yet - and all will be fine.  If however, you have previously created a .asoundrc file - **this will overwrite it**.  You should rename your current .asoundrc (to something like .asoundrc_old) before downloading.  You will then need to manually merge the old and new file.  

>Note: Typing ***ls*** in your home directory will not show the .asoundrc file. you have to type ***ls -la*** .

1. Navigate to your home directory:
```
cd ~
```
2. Download the compressed file (.tar.gz), then extract the files. Type these commands:
```
wget https://www.normfrenette.com/looper.tar.gz
tar -xzvf looper.tar.gz
```
3. Change the owner of the .asoundrc file:
```
sudo chown root: ~/.asoundrc
``` 

#### Step 6: Select the correct looper.ini file:
The Looper uses a initialization text file called looper.ini (follows the typical windows .ini format).  Among other things, this files identifies the correct GPIO pins that connect to the various switches and LED of the looper.

You mat have noticed from the [schematics](/Looper/How-to-Build-it-circuit-schematics/#sectionTop), that GPIO pins connect differently whether you use the Looper PCB (which I  created and you can get by ([contacting me](/contact#sectionTop) ) or whether you use the RPi HAT Proto board - and wired each connection on the board.  This is due to physical constraints on the different board layouts.  You may have even laid out a totally different pattern on a single sided pad board - so your list of GPIO might not match either of the afore mentioned designs.

Accordingly, I create three copies of the .ini files.  You now need to select the correct one and rename it lopper.ini. First go to the loop directory (under your home directory):
```
cd ~/loop
```
>Note: in Linux, you rename a file by using the move command ***mv***

Do only one of the following:

1. If you have used the RPI HAT Proto board - and wired components connections following the assembly layout provided, rename the file looperHAT like this:
```
mv looperHAT looper.ini
```

2. If you have used the Looper PCB which I sent you, rename the looperPCB file:
```
mv looperPCB looper.ini
```

3. If you have built your custom layouts and the pins do not match either choice on the schematic, rename the looperBLANK file:
```
mv looperBLANK looper.ini
```
At this point you have the correct looper.ini, so you can delete the files you did not use:
```
rm looperBLANK
rm looperPCB
rm LooperHAT
```
>Note: only two of these files remain since you renamed one of them to looper.ini .

>IMPORTANT WARNING: If you chose option 3, none of the pins are set - and the looper will not start until you fill in the information.  Open the file looper.ini with the editor (***nano looper.ini***), and using the arrows scroll to the bottom section called ***[GPIO]***, and enter the corresponding GPIO pin (use BCM naming) for each of the switches, LED and seven segment LED listed therein.  

> The same applies if you selected option 1 (RPi HAT Proto board) - and made some changes from the assembly/schematics suggested.  

> It is important that you set the pins correctly for each switch/LED. If you do not, not only the Looper will not function correctly (or at all) - but in some cases you could damage you RPi.  (In practice there are resistor to protect against this - but one never knows if the resistor has not failed, short circuit a trace or other issues).


#### Step 7: update paths and move the necessary Systemd service files where they belong:

Systemd files are files used by the operating system upon boot to launch the Looper programs automatically when the Looper (Raspberry Pi is turned on or rebooted). There are two programs to launch in sequence:
- segment.sh is a small bash file that scrolls the letter L-O-O-P across the seven segment LED while waiting for Looper to boot up fully (serves as indication that the system is working).
- looper4.py is the main python file that controls the looper function

First you need to tell the segment.sh where is your looper.ini file (so it can read the GPIO pins it needs to control).  
1.  Go to the loop directory:
``` 
cd ~/loop
```
2. Get and note (write-down) the full path of this directory (mine is /home/pi/loop)
```
pwd
```
3. Open the segment.sh file in a text editor:
```
nano ~/loop/segment.sh
```
4. Add the location of looper.ini file on the line that starts with ***ini_file=***.  Simply replace /home/pi/loop/ by what you received from ***pwd*** in step 2. Edited line should read like this:
```
ini_file=/home/pi/loop/looper.ini
```
5. Save and close editor (ctrl-o + return + ctrl-x)

Now you are ready to edit the service file for the segment bash script:

1. make sure you are in the home directory:
```
cd ~
```
2. Open the segment.service file with the text editor:
```
nano segment.service
```
3. Locate the line that starts with ExecStart=, and add the location ogf the segment.sh file (replace /home/pi/below by what you got from the ***pwd*** command above). the line should read:
```
ExecStart=/home/pi/loop/segment.sh
```
4. save and close the file.

5. Now, move the segment.service file and change it's owner to root.
```
sudo mv segment.service /etc/systemd/system
sudo chown root: /etc/systemd/system/segment.service
```
6. enable the service to start automatically at start-up:
```
sudo systemctl enable segment.service
```

Finally let's tackle the looper.service file. Here we need to add the location of the python interpreter as well as the location of the looper4.py file that will be launched by the python interpreter.

1. Find and note (write-down) the path to the python interpreter: 
If you are using the python that came with the fresh install of the Raspberry Pi OS, this will return the full path to interpreter: - in my case is says ***/usr/bin/python3.9***. Note the path - we need it.
```
type -P $(readlink $(which python3))
``` 

If you are using  different interpreter, or you installed a newer python and created an alias, you should know the full path of that version of python. Note it.

2. Edit the looper service file. Here replace ***/usr/bin/python3.9*** with what you received from the ***type*** command above, and replace /home/pi/ with yur home directory from the command ***pwd*** above.
```
nano looper.service
```

Locate the line that start with ***ExecStart=***. Add the full path of the python interpreter and then the full path of the looper4.py file separated by a space, like so:
```
ExecStart=/usr/bin/python3.9 /home/pi/loop/looper4.py

```
3. Save and close the file.

4. You now can move the file and change its owner to root:
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
- First, the letters L O O P scroll across the 7 segment diode. (*this can be very short depending how fast your Raspberry pi is*)
- Secondly the number zero (if looper is in edit/bypass mode) or an hyphen (-) if looper is in run mode.

The number zero or hyphen indicates there are currently no tracks recorded in the Looper.  Refer to the [user guide](/Looper/How-to-Use-User-Guide/#sectionTop) on how to use the looper.



