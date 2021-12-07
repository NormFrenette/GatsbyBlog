---
title: Install Bluetooth Code on RPi - Automated
date: "2021-12-06T23:46:37.121Z"
description: Instructions on how to automatically install files /configure RPi for BLE server.
---

#### About
Automated install on your Raspberry Pi of a bluetooth BLE Server written in Python .  BLE advertises a custom service that communicates with the IOS app to remotely set the wifi on a headless raspberry pi.

#### Requirements
*Python3: version 3.7 or later **must** be instaled on the Raspberry Pi or the install script will exit.*

#### Automated Install - How To: 
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
wget  https://www.normfrenette.com/btwifiset.sh | sudo bash
```

That's it. 

***The code is open source under the standard MIT license.***

#### What the Install scirpt does:

- Checks the python version and allows for selection if more than one Python3 interpreter is installed .
- Creates the directory: **btwifiset** under your home directory, and downloads the BLE server python files there.
- Install dbus and GLib (pyCairo) python modules only if they are not already insalled.
- Modifies the exisitng bluetoothd.service system file to run the bluetooth BLE service created Python.
- Creates a new systemd service file: btwifiset.service and starts it (+ auto-start on boot).

The script provides written feedback on install progress in the terminal.  Upon completion, you are ready to use the ios app ***SetWifiViaBT*** with the raspberry pi.  Enjoy!

*Note- the ios app is not yet published on the App Store - but it is coming soon!*




