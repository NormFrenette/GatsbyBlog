---
title: Install higher Version of Python3
date: "2021-12-04T10:00:00.000Z"
description: How to install a higher version of python3 as an alternate to the system python on the Raspberry Pi
---

These instructions explain how to install an alternate version of python3 - a higher version - on a rasperry pi.  
These instructions do not install python3 in a separate environment - but it is installed in a different location using the laternate flag during the installation process.

Because the python versions provided with the Raspberry OS and apt tend to lag behind the latest version of python - you will download the latest stable version of python from python.org and compile it on the raspberry pi.

The instructions below install version 3.10.1 which is the newest version of python at the time of writing.  

If you would prefer a  version newer than 3.10.1 - follow these steps:
1. Go to the [python download page](https://www.python.org/downloads/) 
2. Click on "download" for the version you want
3. Navigate to the bottom of the page that opens - where the list of files is shown
4. Right-Click on "XZ compressed source tarball" and select Copy Link from the pop-up menu
5. The link you need is now on your clipboard.
6. Follow the instructions below but use the link you have copied instead of the link showed in the instructions: 
(when you get to:  wget https://www.python.org/ftp/python/3.10.1/Python-3.10.1.tar.xz)

### Instructions
Warning - some of these operations take a while.  You might want to get a coffee and a good book...
Open a terminal window on your RPi and type/paste the following commands.  Copy one line at the time and run it (press Return on keyboard).

1. First get the necessary libraries: (this is all one one line). Copy/paste this in your terminal window.
```
sudo apt-get install -y build-essential tk-dev libncurses5-dev libncursesw5-dev libreadline6-dev libdb5.3-dev libgdbm-dev libsqlite3-dev libssl-dev libbz2-dev libexpat1-dev liblzma-dev zlib1g-dev libffi-dev
```
2. Then run the following commands to get the python file and  extract it:
```
cd ~
wget https://www.python.org/ftp/python/3.10.1/Python-3.10.1.tar.xz
tar xf Python-3.10.1.tar.xz
```
3. This has put the files in a directory called Python-3.10.1 under your home directory. Navigate to this directory:
> Note: if you use a newer version - the directory will have the name of the version you downloaded.
```
cd Python-3.10.1
```
4. Run each of these commands, one by one in sequence, to compile it and install this new Python interpreter:
```
./configure --enable-optimizations
make -j 4
sudo make altinstall
```
5. Some clean-up: Go up one level in directory and remove the install files directory (Python-3.10.1) and the tar file
```
cd ..
sudo rm -r Python-3.10.1
rm Python-3.10.1.tar.xz
```
6. This will have installed the python3 Interpreter file: /usr/local/bin/python3.10 which is located in the directory /usr/local/bin/
7. To test the installation you can invoke this command, which returns the python version:
```
/usr/local/bin/python3.9 --version
```

At this point, in order to invoke this python interpreter, you must use the full path (/usr/local/bin/python3.9) to the python interpreter every time you run a python file. 

The RPi is configured out of the box to run the system python installed with the Raspbian OS:
- **python** will run the version 2.X of python on your system
- **python3** will run the version 3.X installed with the OS on your system

If you know that you will only run python with the latest version of python3 you have just installed, 
you can create an alias so that every time you type "python" in the command line it will run the latest version of python at /usr/local/bin/python3.9

##### How to setup an alias:
1. Open the .bashrc file in an editor - and scroll to the alias section (somewhere in the middle of the file normally, after the if statement):
```
cd ~
nano .bashrc
```
2. In the alias section add these two lines:
```
alias python='/usr/local/bin/python3.10'
alias pip='/usr/local/bin/pip3.10'
```
3. Save the file (Ctrl o + Return) and close (Ctrl x) the editor.
4. Then source the file
```
$ . ~/.bashrc
```
5. Check that all went well - this should return the version you installed (3.10.1)
```
python --version
```

>End of instructions

