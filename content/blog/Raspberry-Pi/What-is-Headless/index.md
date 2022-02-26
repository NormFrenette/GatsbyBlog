---
title: What is headless mode and why use it?
date: "2022-02-26T10:00:00.000Z"
description: Discussion on why I use Raspberry PI in Headless mode (and what that is).
mainTag: Principles
---
#### About
This article discusses what it means to run a Raspberry Pi in Headless mode, and why you would want to do this.

#### The typical Raspberry Pi Computer - desktop version

The Raspberry Pi is a computer - just like a desktop PC:  
- it has an hdmi port - to connect a monitor
- it has usb ports, to connect a mouse and keyboard, or even a video camera or sound card (all USB).
- It runs Linux as an operating system (Debbian/Raspbian to be precise) - instead of Windows.
- It can run a browser, people install Open Office for productivity etc.  
> Note:  is possible to install different versions of linux or even real-time operating systems - but I'm not covering this here.  

So, it is possible to install a "desktop" version of the operating system, which you get from the [Raspberry Pi Foundation people](https://www.raspberrypi.com/), and use the Raspberry Pi as you would any desktop computer. Not bad for an initial investement of $35-$45!

#### So What is this Headless thing?

Basically, a Headless RAspberry PI is not connected to a monitor, a mouse and a keyboard.  It is - as they say - Headless.

#### Why use a Headless Raspberry Pi?

Well...  I already have a macbook and some older Windows laptops. I even have an old pentium desktop I build. And let's be honest, I am kind of fond of the power of Macbook's applications and Microsoft office - so I'm not keen to move to the linux world for productivity.

The atraction of the Raspberry Pi to me is that I can build "Appliances" as some people call them:  projects, where the Raspberry Pi is in an enclosed box, connected to something that is being controlled by the Raspberry Pi.

The Raspberry Pi also has the GPIO (General Purpose Input Output).  That makes it very useful compared to any old PC desktop:  We can easily connected switches, knobs, LED etc. so whatever "Appliance" we build is easily controlled.

In my case - I wanted to build a guitar Looper pedal. Something that looks like [this](https://www.tcelectronic.com/product.html?modelCode=P0DD4):
![TC Electronics Ditto Looper](./ditto.png)

My version is a bit bigger to fit a raspberry Pi 3b+ inside.  Like most guitar pedals, it has ports to plug in the guitar and the amplifier.  It has buttons and LED.  It has a power connection.  I put the first prototype inside an iphone box:
![Looper inside iphone box](./looper_iphone.png)

What it does not have, is any access to the hdmi port, or the usb ports: So how can I control the Raspberry Pi, write software unto it, without a keybaord, mouse or monitor?

***Time for the headless Raspberry Pi.***  

Basically, the Raspberry Pi, all snug inside it's closed box, can still be used to develop code, run programs, basically capture loops from my guitar - while I control it from another computer:  The Raspberry Pi is now said to be **Headless**.

#### How does it work?

The idea is to use another computer - it this case my macbook pro laptop - to control the Raspberry Pi.  I do not use graphical  windows interface, mouse etc. I use the "terminal" - on the mac  and send commands to the Raspberry Pi.  Whatever command, if it elicits a response from the Raspberry Pi - the response is displayed in the terminal window on the mac.  I use a method called SSH - which creates a secure link to the raspberry pi - allowing for authentification.  

The Macbook and the Raspberry Pi are connected to my home wifi router, and they communicate over wifi.  Although Raspberry Pi can connect the macbook via USB instead of wifi, my Raspberry Pi is inside an enclosure that does not expose the USB port. So,  I use the wifi.

>Note: although I cover how to do this with a macbook here - all of this can be done with a PC using Windows.  You just have to get the correct programs (Putty...) to interface to the Raspberry Pi.  Google can be your friend here...

If you are already familiar with linux - you propably have used the command line to control a linux computer via terminal. This is what we will do here. If you come from the microsoft world - you may be familiar with dos commands - and the cmd window - it's the same primciple - but because the Raspberry Pi runs linux - we have to use linux commands.  

Here's is an example on the mac, where I opened a terminal window, I connected to my Raspberry Pi using SSH, and issued a "ls" command from the macbook (ls: list the files in the current directory):
![Terminal Screen shot](./terminal.png)

#### So how do we do this?

Basically, we install the headless version of the Raspberry Pi Operating system (called OS lite) on the Rspbery Pi SD card, and set it up to speak to the wifi router.  Then we use SSH and some authentication stuff to connect to the Raspberry Pi from the mac.  

I am writing a post that will give detailled step by step instructions on how to do to this.

#### What about programming in the Raspberry Pi?

Afterall, the idea is to have control of the Raspberry Pi from the macbook - to create programs that turn the Pi into the applicance we want (in my case - a looper).  The code has to be developped and run on the Pi.

Fear not - IDE are available that run on the mac but all code written is on the Raspberry Pi, and runs on the Raspberry Pi.  Yet the IDE running on the mac allows for code writing, linting, debugging, just as if we were doing this on the Raspberry Pi - with monitor, keyboard and mouse.

I will write a post soon on how to do this.  Meanwhile, if you are impatient: google it. I use VSCode, Python and bash. It works like a charm.
