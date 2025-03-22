---
title: IOS and Android app BtBerryWifi
date: "2025-03-21T15:00:00.121Z"
description: The Android App is now available.
mainTag: iOS-Android-App
appearOrder: 900
---

#### About  

I wrote an app that let's you connect to a Raspberry Pi via bluetooth, and setup/connect to a wifi network.

This is used when:
- your Raspberry Pi is not connected to a wifi network,
- you want to connect it to a new network, not yet set up in your Pi,
- and you have no way get into the Raspberry Pi.  

For example, 
it is a headless Raspberry Pi enclosed in a box, you can't reach the connectors, or you do not have a monitor/keyboard/mouse.

I wrote this because it happened to me. I always use SSH and/or VSCode on my Mac (via wifi) to write code on the Raspberry Pi. 
I went somewhere for two weeks, and I brought the looper to work on it.  I got there, 
and realized the Pi was not connected to the wifi network there. Duh!  

I had to take the Pi out of its box, 
and beg and borrow monitor and keyboard, just so I set the wifi (using Terminal and wpa_cli).  

Never again I said - so i wrote this app.

All the documentation has been moved to the (Apps Website)[https://bluepieapps.com/].

>***IMPORTANT:*** For the apps to work you must install some python code (a file called btwifiset.py) on your Raspberry Pi before you run the Apps on your iOS or Android device - and before you are not connected to any wifi. The code is Free (as in beer) - and open source.

> It's a bit tricky to install all the correct python dependencies for bluetooth to work correctly, so I provide a bash script that does all the work automatically.  Read the [automatic installation](https://bluepieapps.com/Set-wifi-via-bluetooth/Installation-RaspberryPi-automatic/#sectionTop) docs for details on where to get the files.

The BTBerryWifi App for iOS is on the  <a href="https://apps.apple.com/us/app/btberrywifi/id1596978011" target="_blank">Apple App Store</a>, and for Android is on the   <a href="https://play.google.com/store/apps/details?id=com.bluepieapps.btberrywifi" target="_blank">Google Play Store</a>.<br>
You can also find it by typing: BtBerryWifi , in your store search bar.




