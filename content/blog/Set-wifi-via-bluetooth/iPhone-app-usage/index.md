---
title: BTBerryWifi Iphone app - User guide with screen shots
date: "2022-5-02T15:00:00.121Z"
description: How to use the iphone app to set wifi of headless Raspberry Pi over Bluetooth.
mainTag: iPhone App
---

#### About  

The iphone app **BluetoothBerryWifi** allows you to select a wifi network (SSID)  for your [Headless](/Raspberry-Pi/Principles-What-is-Headless/) Raspberry Pi.  
The typical use cases are:
1. You have a headless Raspberry Pi working at home - and you take it to a friends house or a public place and you need to connect it to the wifi network there.  
2. You have one or more headless Raspberry Pi at home (for example: home automation or home theater), and you change your home network (new router).  
You do not have the ability to connect a monitor/mouse/keyboard to edit the wpa_supplicant.conf file to add the new network. Instead you can use this iPhone App.

#### Requirements - what you need:
1. A Raspberry Pi with integrated wifi and bluetooth
2. Installed Python Bluetooth Program on the Raspberry Pi.  You can use the simple [automated](/Set-wifi-via-bluetooth/Installation-RaspberryPi-automatic/) installation procedure, or you can install the code and it's dependencies [manually](/Set-wifi-via-bluetooth/Installation-RaspberryPi-manual/).
>This code must be installed on the Raspberry Pi before you attempt to connect to it with the iphone app.  This code "speaks" via bluetooth to the iphone app and manages the process of connecting the Raspberry Pi to the wifi network you select using the iphone app.

#### Basic Principles: **Everything happens on the pi**

The **BluetoothBerryWifi** iphone App provides a window to your Raspberry Pi. It displays the wifi networks (SSID) that the Raspberry Pi sees - not those that the iphone sees.
>Older Raspberry Pi have weaker wifi chips than the newest iphone.  So it is quite possible that your iphone will see more (faint) networks then the Raspberry Pi can see. Once you are in the app - you will only see those wifi networks that the Raspberry Pi is able to connect to.
Once you select a network - all the iphone does is send this selection to the Raspberry Pi.  It is the python code on the RAspberry Pi that will handle the connection to the requested wifi network.
The iphone app however, is aware if the Raspberry Pi has previously connected to the selected network. If it has not, it will ask for a password before sending the request over to the Raspberry Pi.  
>Note that passwords are not encrypted before being sent to the Raspberry Pi. Since it is bluetooth, an eavesdropper would have to be standing very close to you with a bluetooth traffic sniffer to get the password - which you probably were just given by your friend anyway...)

#### User Guide - with screenshots:

1. Start or reboot your Raspberry pi.  The python code has a default timeout of 15 minutes after reboot. You must connect with the iphone app during this time window.
>The timeout duration can be adjusted using the configuration file that came with the python code - on the Raspberry Pi.
2. Launch the **BluetoothBerryWifi** app 
3. 



