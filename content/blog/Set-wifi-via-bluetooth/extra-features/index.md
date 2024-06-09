---
title: BTBerryWifi iOs App - Extra Features for Supporters
date: "2024-06-01T15:00:00.121Z"
description: Supporters have access to encryption for network/passwords, ip and mac addreses and other info.
mainTag: Supporter
appearOrder: 101
---

#### About  

Supporters of this work (via in-app purchases) get access to extra features:
- Network SSID and Password between phone and RPi (secure authentication).  
- "Lock the RPi": so only users with the password (encrypted) can use the BtBerryWifi app to connect to the RPi.
- Extra RPi info: 
    - RPi wifi IP address (encrypted).
    - Mac Addresses of adapters (ethernet, wifi, bluetooth) - (encrypted).
    - Signal strength (dbM) and channel/frequency of available wifi networks (useful for interference analysis) - (encrypted).
    - Other information (user defined) you need to display on the iOS device - (clear text).  

#### Encryption 

##### Why use encryption

The free version of the app exchanges data with the Raspberry Pi without any data encryption, (other than Bluetooth pairing encryption which may or may not occur on all devices).  This means that passive eavesdropping or man-in-the-middle attacks can intercept the network SSID and password sent from th iOS device to the Raspberry Pi.

By turning on encryption, a password set on the RPi, and then manually entered on the iOS device is used to create an encryption key.  This key is used to encrypt/decrypt all data related to the connection (network SSIDs, passwords, IP addresses, Mac Addresses). Eavesdroppers and man-in-the-middle attacks see only encoded data (gibberish to them).

If you are only using the iOS app in an area where you know your bluetooth transmissions cannot be intercepted, encryption is not necessary.  (Bluetooth 5.0 is quoted to reach up to 400m indoors - but this depends on both your IOS device and raspberry Pi). On the other hand, anytime you use the iOS App BTBerryWifi in a public space, you run the risk of the password being intercepted.

##### Why locking the Raspberry Pi

The password created on the RPi is also used to lock the RPi:  this means that only users who know the password and have entered it in their iOS device can connect to the Raspberry Pi.

In practice, anybody can download the iOS App BTBerryWifi, turn it on, and see if there are any Raspberry Pi with the btwifiset.py code installed, in the vicinity.  They can then connect to the Raspberry Pi, receive the list of Networks available, and connect to any of those.

This means that if the Raspberry Pi Appliance is in a public place (such a the guitar looper I am building), a user with the free iOS app can change the wifi (such as connecting to their own iphone hotspot for example).  This may or may not be a problem for you depending on how well your pi is secured (ssh) or what code you are running on it.

By Locking the Pi - the user must have the password to stay connected and move on past the connection screen.  If the *Lock the RPi* feature is turned on, and the user does not have the password, the iOS app immediately disconnects from the RPi and requests that the password be entered.

Number of connections:  IOS and Raspberry Pi limit the number of simultaneous bluetooth connections.  In theory, if the RPi is not locked, enough users of the free app could connect that future connections would fail. This means that you might not be able to connect to your own RPi (an unlikely scenario but nevertheless possible).

Encryption can be turn on or off using the Lock Tab on the ios screen - after establishing a bluetooth connection with the Raspberry Pi.

<!--- 
to turn a title that would normally be marked by a number of # such as ##### title
use this form instead where x in <hx represents the number of # I would have used
note: no spaces in the id, use - instead (also use all lower case)
-->
<h5 id="password-management">Password management</h5>

When you first installed the Python code on the RPi, a password was automatically created. It is the host name of your Raspberry Pi (which you normally create when creating the SD card/OS install). (note: unless you created a different password when installing btwifiset.py)

The password on the RPi is stored in a simple (text) file named: Crypto, found in the /usr/local/btwifiset directory along side the btwifiset.py code.
>Please do not change the name of this file, or encryption will not work.
A small python utility (btpassword.py) can be launched to view or change the password. In terminal do this:
```
cd /usr/local/btwifiset
sudo ./btpassword.py
```
The password is easy to find/see since it is assumed that users who can already ssh in the RPi or have physical access via monitor/keyboard have the rights to see or change the password for the iOS app BTBerryWifi

The password on the iOS device must be entered manually. Once entered, it is checked against the password on the RPi using encryption, and if successful, the password is stored in your Apple Keychain: you do not need to enter it again. The keyChain will remember each different password for each RPi that has the btwifiset.py code installed.

##### Extra Information

Supporters have access to extra information about the RPI and the wifi connection. The information is displayed on the Info Tab on the iOS device screen, after establishing a bluetooth connection with the RPi.

##### IP Address

If the RPi is connected to a wifi network, both the IP4 and IP6 local wifi network addresses is displayed. This can be useful if you need to use the IP address to ssh into the Raspberry Pi after setting up a new wifi connection.
>Note: this is the ip address on your local area network - not the internet connection IP address that is exposed through the network - if the network has a connection (WAN) to the internet.
If encryption is turned on, these are encrypted.

##### MAC Address

The mac addresses for the ethernet (eth0), wifi (wlan0) and bluetooth (hci0) adapters of the RPi as displayed.  If encryption is turned on, these are encrypted.

##### Network signal strength/channel

A list of all wifi networks available to the Raspberry Pi are displayed. For each network, the following information is displayed:
- Network SSID name
- Signal strength expressed in dBM (negative number: less negative is stronger)
- the channel and the frequency used by the router/access point for this network. (this is useful when setting up  a router to analyze interference with existing routers/Access Points)
If encryption is turned on, these are encrypted.

##### User defined other information

The iOS screen will display text generated by the Raspberry Pi, at the time when the tab "info" is entered.  This data is most often generated via a bash call (linux command line), but it can be generated by any program you write.  The only limitation is that the resulting information is packaged as a Python String.

You need to edit the btwifiset.py code in one specific location - to define the information you want: 
1. Open the python file btwifiset.py in an editor. The file is located at: /usr/local/btwifiset.  You will need to launch the editor with sudo since the file is owned by root.
2. Locate the method "otherInfo" in the class "WifiUtil"
3. Follow the instructions in the doc strings. 
4. A call to bash is given as an example (replace *"enter bash command here"* by the appropriate call - keeping the double quotes)
```
info = subprocess.run("enter bash command here", 
        shell=True,capture_output=True,encoding='utf-8',text=True).stdout
```
This information data is never encrypted between the RPi and the iOS device (to satisfy the USA encryption export regulation exemption that this app uses).




