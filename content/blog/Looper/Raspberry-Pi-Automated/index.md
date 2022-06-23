---
title: Automated Install Looper Code on RPi via bash file
date: "2022-04-05T10:00:00.000Z"
description: Download a bash file that runs all commands to install files/dependencies needed for the Looper pedal.
mainTag: Software-Installation
---

#### Current Version: Beta - June 15, 2022
In the early days of deploying thi software, I am making changes often based on early adopters comments and experiences.  Check here often to see if I have posted a new version - identified by the ***date***.
>Note: I am not changing the version  number of the software while in Beta.  
> To check current version date on your Raspberry Pi:  Open looperLog.log file in the loop directory and look for the line that starts with ********* Starting Looper ** version date ...

#### About
 How to get Raspberry Pi ready and download the bash file that runs all commands to install Python code, module dependencies and create data (songs) directories for the Looper.
> **Warning:**  
>The software you are about to install is intended to run on a **dedicated** Raspberry Pi (RPi), inside a Looper Pedal Enclosure.  
>As a result, this install may **overwrite** or **break** some other audio/video programs/config files  you have previously installed on the Raspberry Pi.
> Furthermore, the Looper runs a very tight loop for sampling audio - and if you use the raspberry pi to run other programs at the same time, the Looper audio may skip, have unacceptable delays, and otherwise not be very musically usable.

***In short: Please use a dedicated Raspberry Pi with a fresh OS install to enjoy this looper pedal.***

##### Automated Install - How To: 

Copy these commands in a terminal window on the Raspberry Pi (or presumably, ssh into the [Headless](/Raspberry-Pi/Principles-What-is-Headless/#sectionTop) Raspberry Pi):

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

The following command downloads a bash file from my website, and runs it.  It will run all install commands (same command as with the [manual](/Looper/Software-Installation-RaspberryPi-manual/#sectionTop) install instructions) - without further input.
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