---
title: Manually Install Bluetooth Code on RPi
date: "2021-12-06T10:00:00.000Z"
description: Step-by-step commands in RPi Terminal to install files & configure for BLE server.
mainTag: Installation
---
#### Current Version: Beta - April 22, 2022
In the early days of deploying this software, I am making changes often based on early adopters comments and experiences.  Check here often to see if I have posted a new version - identified by the ***date***.
> To check current version date on your Raspberry Pi:  Open btwifiset.log file in the btwifiset directory and look for the line that starts with ******* Starting BTwifiSet - version date: ...

#### About
Step by Step (manually) install on your Raspberry Pi of a bluetooth BLE Server written in Python .  BLE advertises a custom service that communicates with the IOS app to remotely set the wifi on a headless raspberry pi.

#### Requirements
*Python3: version 3.7 or later **must** be installed on the Raspberry Pi.*  
Here is one way to [install the newest python](/Python/Installation-RaspberryPi-Higher-Version/) 

#### General
All commands below are to be typed at the prompt in a terminal window on the Raspberry Pi.
- If you are on a headless RPi - it is assumed you have SSH into the RPi from your computer in a terminal window.
- If you are using the desktop version of the Pi OS - please open a terminal session.

Copy/paste or type the commands in the code block into your terminal on the RPi - one line at the time - and run them (hit return on keyboard)

#### Step 1 - get the Raspberry Pi ready
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
3. Check your version of python3 on the Rpi.
> If you have not installed a new version of Python3 on the pi you may use the version that came with the operating system - this command returns the version of python3 on your RPi:
```
python3 --version
```
> **If the version returned is less then Python 3.7, you must install a newer version of Python before continuing.** Here is one way to [install the newest python](/Python/Installation-RaspberryPi-Higher-Version/) 
4. Check if you have **pip** installed (if you installed a newer version of python and created an alias (python) - use the alias below instead of python3 in the commands.)
```
python3 -m pip --version
```
5. If it is  not installed (*returned message: No module named pip*) - install it:
```
sudo apt install python3-pip
```


#### Step 2: download the python files
You will create a directory called **btwifiset** under your home directory and download the python files into it:
1. Navigate to your home directory, create btwifiset, then navigate there:
```
cd ~
mkdir btwifiset
cd btwifiset
```
2. Download the compressed file into this directory, then extract the files. Type these commands:
```
wget https://www.normfrenette.com/btwifiset.tar.gz
tar -xzvf btwifiset.tar.gz
```
3. Set permissions on two of the files:
```
sudo chmod 755 wifiup.py
sudo chmod 755 wifidown.py
```
You now have all the necessary files to run the BLE server on the RPi.  However, you need to install some python modules and modify/create systemd services.

#### Step 3 - Check for/Install Python modules:
The BLE server python script requires the use of two python modules: **dbus** and **GLib**

> Note: If you installed a new version of python and created an alias (for example: **python**) - replace all instances of **python3** in the commands below with your alias.

1. Check if GLib is installed (*do not forget the single quotes*):
```
python3 -c 'from gi.repository import GLib'
```
If this command returns nothing it means GLib is already installed - go to bullet #2.  
If it returns: *no module...* or *Import Error ...* - you need to install GLib with this command:
```
apt-get install -y python3-gi
```

2. Next, check if dbus is installed (*do not forget the single quotes*):
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
(*make sure you installed pip from step 1.5 above*)
```
python3 -m pip install dbus-python
```

3. Test the installs - these command should return nothing if properly installed:
```
python3 -c 'import dbus'
python3 -c 'from gi.repository import GLib'
```

#### Step 4 - Modify the BlueZ service that came with Raspbian:
The system service for bluetooth needs to be modified to run BLE,  and to stop it from constantly requesting the battery status of the iphone/ipad that will connect to it (*default behavior*).

1. Open the configuration file in your preferred editor - here we use nano:
```
sudo nano /lib/systemd/system/bluetooth.service
```
2. Find the line that starts with **ExecStart** and add the following at the end of the line - on the same line, leaving a space before the two hyphens:
```
  --experimental -P battery
```
> the line should read something like: 
>ExecStart=/usr/lib/bluetooth/bluetoothd --experimental -P battery
3. Save the file (for nano: Ctrl o + return) and exit (for nano: Ctrl x)
4. Reboot the Raspberry Pi for changes to take effect:
``` 
sudo reboot
```

#### step 5 - Verify that wpa_supplicant.conf exists
If your pi has ever connected to wifi, you should have a file named **wpa_supplicant.conf**.  If not, we need to create it.  Run this command to check if you have this file on your Raspberry Pi:
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
This creates a [Systemd service](https://man7.org/linux/man-pages/man1/systemd.1.html) that will automatically starts when your RPi boots up. This is assumed to be the desired behavior for a RPi in headless mode.  (If your RPi is connected to a terminal and keyboard - you don't need to set the wifi using an iphone app and bluetooth...)

1. Find the path to your python interpreter:
    - If you are using the Python Interpreter that came with the OS:
    ```
    command -v python3
    ```
        this should return something like: 
        /usr/bin/python3.7
    - If you installed a new Python version and created an alias called **python**
    ```
    command -v  python
    ```
        this should return something like: 
        alias python='/usr/local/bin/python3.9'
> In any case, note the full path starting with / , and replace it below where it says /full/path/to/python
    
2. Create the btwifiset.service file and open it in an editor:
```
sudo  touch /etc/systemd/system/btwifiset.service
sudo nano /etc/systemd/system/btwifiset.service
```
3. copy the below and insert in the editor:
> Note: replace the text: **/full/path/to/python3** below, by the correct path to the python3 interpreter you plan to use. *(For example: /usr/bin/python3.9)*
```
[Unit]
Description=Set Wi-Fi over Bluetooth service
After=multi-user.target

[Service]
Type=simple
User=pi
Restart=always
ExecStart=/full/path/to/python3 /home/pi/btwifiset/btwifi.py

[Install]
WantedBy=multi-user.target

```
4. Save the file and exit the editor
5. Run the following commands:
```
sudo systemctl daemon-reload
sudo systemctl enable btwifiset.service
sudo systemctl start btwifiset.service
```
6. At this point, the bluetooth BLE service is running automatically upon boot of the RPi. 
    - If you want to stop it : 
	```
    sudo systemctl stop btwifiset.service</span>
    ```
    - If you want to start it again  : 
	```
    sudo systemctl restart btwifiset.service</span>
    ```

> You are ready to use the ios app ***BTBerryWifi*** with the raspberry pi.  Enjoy!

>Note- the ios app is called ***BTBerryWifi*** in the Apple App Store.   Best to search for its name exactly, since I messed up the keywords - but a search for "Raspberry pi wifi bluetooth" should work also. 



= = = =  End of manual install instructions. = = = = 