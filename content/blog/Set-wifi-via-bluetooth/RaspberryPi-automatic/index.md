---
title: Automated Install of Bluetooth Code on RPi
date: "2021-12-05T23:46:37.121Z"
description: Download and run one bash file to automatically  install python files & configure RPi for BLE.
mainTag: Installation
appearOrder: 115
---
#### Current Version: Beta - April 22, 2022
In the early days of deploying this software, I am making changes often based on early adopters comments and experiences.  Check here often to see if I have posted a new version - identified by the ***date***.
> To check current version date on your Raspberry Pi:  Open btwifiset.log file in the btwifiset directory and look for the line that starts with ******* Starting BTwifiSet - version date: ...

#### About
Automated install on your Raspberry Pi of a bluetooth BLE Server written in Python .  BLE advertises a custom service that communicates with the IOS app to remotely set the wifi on a headless raspberry pi.

#### Requirements
*Python3: version 3.7 or later **must** be installed on the Raspberry Pi or the install script will exit.*

#### Automated Install - How To: 

Notes:
> The bash script, which you download below, installs all the necessary dependencies for the bluetooth BLE Python code.  The python file (btwifiset.py) is installed in the sub-directory created at: /usr/local/btwifiset.  Log entries are written to syslog.  It is possible to write log entries to a file that you choose instead.  To do so, see the manual instructions. You can run the automatic install first and then  you can edit the service file that is created, which is located at: /etc/systemd/system/btwifiset.service.  The manual instructions explain the various options switches to add to the command line.


On your Raspberry Pi: Open a terminal window and Run the following commands at the prompt:

1. Make sure your Raspberry Pi is up to date - type:
```
sudo apt-get update
sudo apt-get full-upgrade
sudo reboot
```

2. Navigate to your home directory - type:  
```
cd ~
```
3. Download and run the script - type:
```
curl  https://raw.githubusercontent.com/nksan/Rpi-SetWiFi-viaBluetooth/main/btwifisetInstall.sh | bash
```

That's it. 

***The code is open source under the standard MIT license.***

#### What the Install script does:

- Checks the python version and allows for selection if more than one Python3 interpreter is installed .
- Creates the directory: **btwifiset** under /usr/local, and downloads the  python file btwifiset.py there.
- Install dbus and GLib (pyCairo) python modules only if they are not already installed.
- Modifies the existing bluetoothd.service system file to run the bluetooth BLE service created Python.
- Creates a new systemd service file: btwifiset.service and starts it (+ auto-start on boot).

The script provides written feedback on install progress in the terminal.  Upon completion, you are ready to use the ios app ***BTBerryWifi*** with the raspberry pi.  Enjoy!

>Note- the ios app is called ***BTBerryWifi*** in the Apple App Store.   Best to search for its name exactly, since I messed up the keywords - but a search for "Raspberry pi wifi bluetooth" should work also.  




