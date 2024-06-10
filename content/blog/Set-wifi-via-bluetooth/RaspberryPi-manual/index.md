---
title: Manually Install Bluetooth Code on RPi
date: "2024-06-08T10:00:00.000Z"
description: Step-by-step commands in RPi Terminal to install files & configure for BLE server.
mainTag: Installation
appearOrder: 116
---


#### Current Version: 2.0 - June 8, 2004
I continue to make changes often based on early adopters comments and experiences.  Check here often to see if I have posted a new version.

To check installed current version date on your Raspberry Pi, check the log file in terminal:
```
journalctl --unit=btwifiset.service -n 100 --no-pager
```
And look for the line that starts with: ******* Starting BTwifiSet - version date.

#### About
Step by Step (manually) install on your Raspberry Pi of a bluetooth BLE Server written in Python .  BLE advertises a custom service that communicates with the IOS app to remotely set the wifi on a headless raspberry pi.

<h4 id="crypto-exit">Automated Install issues: exited due to cryptography</h4>

If you came here from the [github repository](https://github.com/nksan/Rpi-SetWiFi-viaBluetooth) because the installer exited with a warning about and old version of  cryptography module: On older Raspberry Pi OS (Buster = version 10), if the cryptography module is version 2.x or earlier, the Python code to be installed on the raspberry pi will not run.  

>You need to decide to install an updated version of the cryptography module. The installer would not do it automatically in case upgrading the module would break some other program you are running that relies on it.  

See [Step 3 - Cryptography](#cryptoinstall) for installation details.
>Note: once you have installed/upgraded the cryptography module, you will need to install all other dependencies/python code since none were installed when the automatic installer existed. The automated installer can be used at that point.

#### Requirements
*Python3: version 3.7 or later **must** be installed on the Raspberry Pi.*  


#### General
All commands below are to be typed at the prompt in a terminal window on the Raspberry Pi.
- If you are on a headless RPi - it is assumed you have SSH into the RPi from your computer in a terminal window.
- If you are using the desktop version of the Pi OS - please open a terminal session.

Copy/paste or type the commands in the code blocks into your terminal on the RPi - one line at the time - and run them (hit return on keyboard)

<h4 id="step-one">Step 1 - get the Raspberry Pi ready</h4>

1. Check your Raspberry pi OS release (Look for VERSION-ID=):
```
sudo cat /etc/os-release
```
> The software has been tested on Raspbian 10 & 11 & 12. Consider upgrading the RPI to a newer release if your release is below 10. (also tested on latest version of Armbian and Ubuntu with Network Manager).

2. Update the Raspberry Pi:
```
sudo apt-get update
sudo apt-get full-upgrade
sudo reboot
```

3. Check your version of python3 on the Rpi.
> If you have the latest version of the RPi OS - you already have the correct version of Python.  If you have an older version, or have installed different versions on you pi, use this command to check the version of python3 on your RPi:
```
python3 --version
```
> **If the version returned is less then Python 3.7, you must install a newer version of Python before continuing.** Here is one way to [install the newest python](/Raspberry-Pi/Installation-Install-Python-Higher-Version/#sectionTop) 


#### Step 2: download the python files

>These instructions install the python file btwifiset.py in usr/local/ in a directory called btwifiset.  You can install it anywhere else if you prefer - simply modify the "ExecStart" line in the btwifiset.service file (see **Step 6**) to use the location where you install the btwifiset.py file.


1. Navigate to /usr/local directory, create a directory named **btwifiset**, then navigate there:
```
cd /usr/local
sudo mkdir btwifiset
cd btwifiset
```
2. Download the python files into this directory. There are 3 files: btwifiset.py, btpassword.py, and  passwordREADME.txt.
Use these command: (use capital letter O in the option)
```
curl -O https://raw.githubusercontent.com/nksan/Rpi-SetWiFi-viaBluetooth/main/btwifiset.py  
curl -O https://raw.githubusercontent.com/nksan/Rpi-SetWiFi-viaBluetooth/main/btpassword.py 
curl -O https://raw.githubusercontent.com/nksan/Rpi-SetWiFi-viaBluetooth/main/passwordREADME.txt 
```

3. Create the password file and password:
Version 2 now supports [Encryption and Lock The Pi](/Set-wifi-via-bluetooth/Supporter-extra-features/#sectionTop).  For this to work, a password needs to be created.
To use the current hostname of your Raspberry Pi as the default password (see [why](/Set-wifi-via-bluetooth/Supporter-extra-features/#password-management)), do:
```
hostname > /usr/local/btwifiset/crypto
```
or to make your own password (replace thw word password with your own selection):
```
echo password > /usr/local/btwifiset/crypto
```
>Important: the file containing the password is named crypto (with no extension). Do not change this name as it is hard coded in the bluetooth Python code that looks for the password when connecting to the iPhone app.
note: You can use view and/or change the password at anytime after the crypto file is created with this command
```
/usr/local/btwifiset/btpassword.py
```

#### Step 3 - Check for/Install Python modules:
The BLE server python script requires the use of three python modules not already included with python: **dbus** and **GLib** and **Cryptography**

##### GLib

1. Prepare for the installation of libpythonX.Y-dev. You need the first two digit of the python version .  Run this command - it will return a python version in the format X.Y.Z (for example 3.9.2). 
```
python3 --version
```
Write down the first number (X) and the second number (Y) of the python version that is returned, and replace X.Y in the command line below with these values. - keep everything else the same. 
```
sudo apt install python3-gi libdbus-glib-1-dev libpythonX.Y-dev
```
>Replace X.Y above by the first two digit of python version. For example: if your version showed something like 3.9.2, run ***libpython3.9-dev*** above.

##### Dbus
1.Under [Step 1](#step-one) you checked the Raspberry Pi OS release. If you have  version 11 or greater for your Raspberry Pi OS (or a new-ish version of Ubuntu) - use apt install:
```
sudo apt install python3-dbus
```

2. If the above did not work or if you have version 10 (buster) or less for Raspberry Pi OS, then install the Python module dbus using pip

Check if you have pip3 installed:
```
sudo python3 -m pip --version
```
If you get: *module does not exists error*, then install pip:
```
sudo apt install python3-pip
```
And finally install dbus:
```
sudo python3 -m pip install dbus-python
```
> Sudo is important. if you install without sudo the package will be installed in your user .local/lib and the systemd service we create later will not find it. 

<h5 id="cryptoinstall">Cryptography</h5>

1. Under [Step 1](#step-one) you checked the Raspberry Pi OS release. If you have  version 11 or greater for your Raspberry Pi OS (or a new-ish version of Ubuntu) - use apt install:
```
sudo apt install python3-cryptography
```
2. If the above has an error, or you have Raspberry Pi OS version 10 or less, or you came here because the automatic install script exited due to older cryptography version, you must use pip3:  

i) First check/install pip3 (see ***dbus*** heading - bullet 2 above for instructions).  
ii) Next check if you have cryptography already installed:
```
sudo pip3 show cryptography
```
>If the version is 3.3.2 or above - no need to install. Move to [test your modules](#test-modules)

If show cryptography responds with a version is less than 3.3.2, upgrade cryptography like this:
```
sudo pip3 install --upgrade cryptography
```
If show cryptography responds with  *package not found* - just install it:
```
sudo pip3 install cryptography
```

<h5 id="test-modules">test your modules installation with python</h5>

1. Run the following code to verify that python module were installed correctly.  If you get no response, the module is installed correctly.

```
python3 -c 'import dbus'
python3 -c 'from gi.repository import GLib'
python3 -c 'import cryptography'
```

#### Step 4 - Modify the BlueZ service (and symlinks):
The system service for bluetooth needs to be modified to run BLE,  and to stop it from constantly requesting the battery status of the iphone/ipad that will connect to it (*default behavior*).

1. Copy the existing bluetooth.service file to /etc/systemd/system and navigate there:
```
sudo cp /lib/systemd/system/bluetooth.service /etc/systemd/system
cd /etc/systemd/system
```

1. Open the copied .service file in your preferred editor - here we use nano:
```
sudo nano bluetooth.service
```
2. Find the line that starts with **ExecStart** and add the following at the end of the line - on the same line, leaving a space before the two hyphens:
```
  --experimental -P battery
```
> the line should read something like: <br/>
>ExecStart=/usr/lib/bluetooth/bluetoothd --experimental -P battery
3. Save the file (for nano: Ctrl o + return) and exit (for nano: Ctrl x)
4. Update the symlink bluetooth.target.wants to point to our versions of bluetooth.service
```
sudo rm -f /etc/systemd/system/bluetooth.target.wants/bluetooth.service
sudo ln -s /etc/systemd/system/bluetooth.service /etc/systemd/system/bluetooth.target.wants/bluetooth.service
```
5. Similarly update symlink for bluez service:
```
sudo rm -f /etc/systemd/system/dbus-org.bluez.service
sudo ln -s /etc/systemd/system/bluetooth.service /etc/systemd/system/dbus-org.bluez.service
```
6. Reboot the Raspberry Pi for changes to take effect:
``` 
sudo reboot
```

#### step 5 - Verify that wpa_supplicant.conf exists
>This step is not necessary if Network Manager is installed  ***and running*** on your OS (typically Raspberry OS Bookworm (version 12) and Ubuntu). To test if you have Network manager installed run:
```
nmcli
```
>Note: nmcli may exists on your system - but if you get "Error: NetworkManager is not running." then you must carry on with the rest of step 5.

If your pi has ever connected to wifi, it should have a file named **wpa_supplicant.conf**.  If not, we need to create it.  Run this command to check if you have this file on your Raspberry Pi:
```
sudo cat /etc/wpa_supplicant/wpa_supplicant.conf
```
If you get a message with : ***No such file or directory***, The file does not exists and you need to create it (see below:  **If the file does not exists**).  

##### If the file exists:
At this point, you are seeing the content of the file in the terminal window.  Please check that both of the following lines appear at the top of the file (order is not important) - XX is a country code such as US, GB, CA etc.
```
country=XX     
update_config=1
```
If either (or both) of these lines are missing - open the file in an editor and add the missing lines below the first line of the file. To edit the file:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```
Then add the missing lines from above to the file.  For country code - make sure you use your own [country code](https://www.nationsonline.org/oneworld/country_code_list.htm)

##### If the file does exists:
Create the file and open it in an editor:
```
sudo touch /etc/wpa_supplicant/wpa_supplicant.conf
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf
```
Then copy/paste the following at the top of the file - making sure to replace the country code XX with your correct [country code](https://www.nationsonline.org/oneworld/country_code_list.htm)
```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
country=US
update_config=1

```
Save the file and exit the editor.

#### Step 6 - Create the btwifiset.service file

This creates a [Systemd service](https://man7.org/linux/man-pages/man1/systemd.1.html) file that will automatically starts btwifiset.py when your RPi boots up. This is assumed to be the desired behavior for a RPi in headless mode.  (If your RPi is connected to a terminal and keyboard - you don't need to set the wifi using an iphone app and bluetooth...)

These instructions assume that you installed (step 2) the btwifiset.py file in  /usr/local/btwifiset.  If you used a different location, replace ***/usr/local/btwifiset/*** with the full path location to where you installed it. 

These instructions also assume that python3 resides in /usr/bin/ - which is typical of the python that comes with RPi OS.  You can test this by running:
```
/usr/bin/python3 --version
```
which should return the version of python.  If this fails and python3 is not in /usr/bin/ run this: 
```
command -v python3
```
this will return the location of python3 - Substitute this location to the /usr/bin/python3 on the ExecStart line below.

Command Line switches: btwifiset accepts the following command line switches - which you can modify on the ExecStart line below.  The installation  shown here uses the --syslog switch to store log entries in syslog.  This can be modified as below:


>`--`syslog    (Logs messages to syslog).  
>`--`console   (Logs messages to console - this should not be used in the service file).  
>`--`logfile  /path/to/filename.log   (Logs messages to specified file using absolute path).  
>`--`timeout x  (where x is the number of minutes btwifiset will run after booting up, before shuting down).    


Timeout defaults to 15 minutes if **`--`timeout x** switch is not included.  The timeout is the number of minutes that btwifiset will run after booting up if it does not receives any command from the IOS app (timeout resets to 15 min each time a command is received).  The idea behind timeout is that a headless RPi that requires to have its wifi set-up will do this upon boot - after which the set wifi via bluetooth function is not needed, since it is then possible to ssh into the RPi using the wifi.  Since other bluetooth programs may be running on the pi - it is prudent to shutdown btwifiset if it is not used.
    
1. Now, Create the btwifiset.service file and open it in an editor:
```
sudo  touch /etc/systemd/system/btwifiset.service
sudo nano /etc/systemd/system/btwifiset.service
```
2. Copy the below and insert in the editor: (this uses the --syslog option for logging)

```
[Unit]
Description=btwifiset Wi-Fi Configuration over Bluetooth
After= bluetooth.target

[Service]
Type=simple
ExecStart=/usr/bin/python3 /usr/local/btwifiset/btwifiset.py --syslog

[Install]
WantedBy=multi-user.target

```
3. Save the file and exit the editor.  



4. Run the following commands:
```
sudo systemctl daemon-reload
sudo systemctl enable btwifiset
```
6. Now reboot the RPi:
```
sudo reboot
```
5. At this point, the bluetooth BLE service is running automatically upon boot of the RPi. 
    - you can check it's status with:
    ```
    systemctl status btwifiset.service
    ```
    - If you want to stop it : 
	```
    sudo systemctl stop btwifiset.service</span>
    ```
    - If you want to start it again  : 
	```
    sudo systemctl restart btwifiset.service</span>
    ```

> Remember, unless you modified the timeout using the --timeout x switch, btwifiset will run for 15 minutes and then shut down unless you connect to it with the companion IOS app.

> You are now ready to use the ios app ***BTBerryWifi*** <a href="https://apps.apple.com/us/app/btberrywifi/id1596978011" target="_blank">(On App Store)</a>. Enjoy!

### Checking the log if things are not working

1. After reboot, to check if the btwifiset service has started and is running:
```
systemctl status btwifiset
```
>Look for a line that says active
2. To check the log - to track down a possible fault:
```
journalctl --unit=btwifiset.service -n 100 --no-pager
```

= = = =  End of manual install instructions. = = = = 