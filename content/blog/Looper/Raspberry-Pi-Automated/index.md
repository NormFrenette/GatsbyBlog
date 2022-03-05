---
title: Automated Install Looper Code on RPi via bash file
date: "2022-03-05T10:00:00.000Z"
description: Download a bash file that runs all commands to install files/dependencies needed for the Looper pedal.
mainTag: Software-Installation
---
#### About
 How to get Raspberry Pi ready and download the bash file that runs all commands to install Python code, module dependencies and create data (songs) directories for the Looper.
> **Warning:**  
>The software you are about to install is intended to run on a **dedicated** Raspberry Pi (RPi), inside a Looper Pedal Enclosure.  
>As a result, in some rare cases, this install may **overwrite** some other files, or **break** some other software you have previously installed on the Raspberry Pi (especially if you were using it for audio or video).
> Furthermore, the Looper runs a very tight loop for sampling audio - and if you use the raspberry pi to run other programs in the background, the Looper audio may skip, have unacceptable delays, and otherwise not be very musically usable.

***In short: Please use a dedicated Raspberry Pi with a fresh OS install to enjoy this looper pedal.***

##### Automated Install - How To: 

Copy these commands in a terminal window on the Raspberry Pi (or presumably, ssh into the [Headless](/Raspberry-Pi/Principles-What-is-Headless/) Raspberry Pi):

1. Make sure your Raspberry Pi is up to date - type (in sequence, hit "return" key after each line):
```
sudo apt-get update
sudo apt-get full-upgrade
sudo reboot
```

2. When raspberry pi has rebooted, re-establish terminal window and navigate to your home directory - type:  
```
cd ~
```

3. Download and run the script and run it:

The following command downloads a bash file from my website, and runs it.  It will run all install commands (same command as with the [manual](/Looper/Software-Installation-RaspberryPi-manual/) install instructions) - without further input.
```
curl  https://normfrenette.com/looperinstall.sh | sudo bash
```
4. When the install is complete you will be asked to reboot.  You can do so with the command: 
```
sudo reboot
```

##### What the automated install does:

1. Installs various dependencies for modules GLib, dbus and alsaaudio.  Also installs pip for python3 not already there.
2. Create directory ***loop*** under your home directory, and create sub-directories ***data*** and ***repo*** (these are where the wav file are kept once you start using the looper).
3. Copies the python files needed in the ***loop*** directory
4. Creates two systemd services, one for the bash script that displays "L-O-O-P", and one that starts the Looper service, automatically when the Raspberry Pi - Looper - boots up.