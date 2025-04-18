---
title: BTBerryWifi iPhone app - Privacy Policy
date: "2022-05-17T15:00:00.121Z"
description: Privacy Policy for the BTBerryWifi iPhone App.
mainTag: iPhone-App
appearOrder: 901
---

#### Privacy Policy

**The BTBerryWifi app does not collect any user information, and by extension does not share any data with any third parties.**

- The app does not collect your name, email, device information etc. - In fact The app does not even ask for this information anywhere in the app.
- The app does not collect - or have access to any geographical location information, or IP address
- Data you enter in the app to set the wifi on a Raspberry Pi is not stored on your device after the app is shutdown.

##### Data used by the app:  

The data used by the app is limited to wifi SSID (network name) identified by the connected Raspberry Pi and SSID/wifi passwords you may type in the app which are sent to the connected Raspberry Pi over bluetooth.  

Any wifi password stored on your Raspberry Pi - for networks you previously connected - is stored in the Raspberry Pi's *wpa_supplicant.conf* file and is NEVER sent to the iphone app. 

To be clear, the only time the iPhone app is aware of a password or hidden SSID is when you type - once - in the app - in order to communicate it to the RAspberry Pi - via bluetooth. Once you have connected to the network, this password will never be sent to the iphone app by the raspberry pi again. It is also deleted from the iphone app as soon as you connect successfully.

> Passwords you type are only retained long enough to allow you to correct them if you made a mistake and the connection failed.  As soon as you connect, the iphone app deletes the password from memory and it has no way to recover it further.

The data used by the app is only ***live*** while the app is active, and is not stored in any other way: it disappears from your device when you shut down the BTBerryWifi app.  

Behind the scenes, the Apple iPhone app system may generate crash data (should the app crash - I do not expect it to do so!).  This crash data does not contain user information and would only be shared with the developer.


