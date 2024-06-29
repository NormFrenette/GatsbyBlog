---
title: Set Raspberry Pi Wifi Network via Bluetooth
date: "2024-05-21T15:00:00.121Z"
description: Set a headless Raspberry Pi's Wifi Network credentials via Phone App over Bluetooth.
mainTag: BTBerryWifi
appearOrder: 100
---

#### About  
Set the wifi on your [Headless](/Raspberry-Pi/Principles-What-is-Headless/#sectionTop) Raspberry Pi via an App on your Phone (or iPad).  Use this when your headless Raspberry Pi needs to connect to a new network. The app connect to the RPi over Bluetooth. You enter the Network Name (SSID) and password in the phone App and the wifi network is updated on the Raspberry Pi.
 
##### The typical use cases
1. You have a headless Raspberry Pi working at home - and you take it to a friends house or a public place where you need to connect it to a yet unknown wifi network available there.  
2. You have one or more headless Raspberry Pi at home (for example: home automation or home theater), and you change your home network SSID and/or password (new router).  
3. You are making a prototype or small product run delivering a Raspberry Pi appliance to friends - and you need a way to have them setup their wifi on the RPi. 

##### The Problem
- You do not have access to a keyboard/mouse/monitor or your RPi is sealed in a box you do not want to open - which means you cannot access your pi physically.
- This means that you cannot directly access the pi. Since your RPi is not connected to wifi, you cannot ssh into it with your PC/Mac to set the network parameters.

#### The solution: BTBerryWifi iOS app + RPi btwifiset.py
The free iOS app BTBerryWifi <a href="https://apps.apple.com/us/app/btberrywifi/id1596978011" target="_blank">(On App Store)</a>connects to a Raspberry Pi via bluetooth and displays available wifi networks within range of the RPi. You select a network, enter the password.  This is sent to the Raspberry Pi which connects to the wifi network. See [User Guide](/Set-wifi-via-bluetooth/iPhone-App-iPhone-app-usage/#sectionTop)

##### Python code needed on the Raspberry Pi

For the app to work, the open source Python code: btwifiset.py  <a href="https://github.com/nksan/Rpi-SetWiFi-viaBluetooth" target="_blank">(on GitHub)</a>, must be installed on the Raspberry Pi. Using the [installer](/Set-wifi-via-bluetooth/Installation-RaspberryPi-automatic/#sectionTop), btwifiset is set up to run automatically when the RPi boots up (for a default time duration of 15 minutes - this can be modified).

So if your headless RPi might need to connect to a new wifi at some point, [install](/Set-wifi-via-bluetooth/Installation-RaspberryPi-automatic/#sectionTop) btwifiset.py on the RPi now. Then, when you need it, you simply turn on(or reboot) the RPi, fire up the iOS BTBerryWifi app or your iPhone or iPad, and set the wifi credentials for your Pi.

Note: You do not need a raspberry Pi per se:  Any linux box meeting the [requirements](#linux) will do.

#### Version 2 improvements

##### Network Manager compatibility
Raspberry Pi Foundation released the latest OS "Bookworm" - and for the first time included Network Manager which is turned on by default. Until then RPi OSes were using wpa_supplicant and the associated wpa_supplicant.conf file to set SSID/Password for wifi (which is what version 1 of btwifiset.py used).

Network Manager uses wpa_supplicant behind the scenes - but blocks direct access to wpa_supplicant by other processes (such as btwifiset.py code). If you installed version 1 on a "Bookworm" RPi, the BTBerryWifi app would still connect to the RPI via bluetooth and display the list of wifi Networks. But once you selected the network and entered the password, the RPi would never connect.

The current Version 2 detects whether your OS is using Network Manager or not - and uses the appropriate means to connect to the selected wifi network. (This means that version 2 will still work on systems that do not have Network Manager installed - such as Raspberry Pi Bullseye OS).

##### Other OS compatibility requirements <a name="linux"></a>
Because Network Manager is now supported, Other OS using it, such as Ubuntu or Armbian should also work. (For example, it was tested on a Banana Pi using Armbian).

The only requirement is that your selected OS names its bluetooth adapter: **hci0** and its wifi adapter: **wlan0**. You can check the wifi adapter name by running:
```
ls /sys/class/ieee80211/*/device/net/
```
And check the bluetooth adapter with:
```
ls /sys/class/bluetooth
```

##### Bug Fixes - Improvements
1. Allows SSID with spaces (previous version would truncate SSID at first "space" character)
2. Fix behavior when two iOS devices are connected to the same Raspberry Pi at the same time (in version 1, Network list was split between both devices in a random manner).  
3. added installation to virtual environment of python modules when not available directly from apt (or version is too old).  In this case the modules dbus & cryptography are installed in venv directory under /usr/local/btwifiset using Python Pip3.

##### iOS app BTBerryWifi 2.0 extra features 

If you find this app has value to you: You can become a **Supporter** of this work using Apple's in-app purchases (a version of  *Buy me a Coffee*).  

Supporters get access to extra features [(details)](/Set-wifi-via-bluetooth/Supporter-extra-features/#sectionTop):
- Network SSID and Password between phone and RPi (secure authentication).  
- "Lock the RPi": so only users with the password (encrypted) can use the BtBerryWifi app to connect to the RPi.
- Extra RPi info: 
    - RPi wifi IP address (encrypted).
    - Mac Addresses of adapters (ethernet, wifi, bluetooth) - (encrypted).
    - Signal strength (dbM) and channel/frequency of available wifi networks (useful for interference analysis) - (encrypted).
    - Other information (user defined) you need to display on the iOS device - (clear text).  