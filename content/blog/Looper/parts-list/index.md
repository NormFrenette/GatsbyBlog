---
title: Parts List for Raspberry Pi Looper
date: "2021-12-26T10:00:00.000Z"
description: List of parts needed to build the Looper
mainTag: Electronics
---

This document the various parts required to build the Raspberry Pi Looper.  

#### Raspberry Pi

I recommend the raspberry pi (RPi) version 3B+ or 4.  The RPi must have wifi and bluetooth (if you want to use the ios app - which is recomended).

Can you use a pi zero W?  Simply put - I am not sure.  If you have one lying around - please try it and let me know how it works.  
>The original pi zeroW had only one core.  The python program is written to use multi-cores as much as possible but the code will run on one core - meaning it will not crash.  The problem is that the audio sampling and playback could be affected by file operations (like saving to SSD card) - and may create studdering in playback.  At some point I intend to test this - and when I do I will update this.

What about the pi zero 2 W? I have not obtained one yet - but I think it should work just fine as it has 4 cores.  So go for it!

#### USB Sound Card:

Since we are trying to keep costs down - I recommend the following: Sabrent Audio Stereo Sound Adapter. It is less then $10 on Amazon and works fine.

![Sabrent usb sound card](./usb-soundcard.png)

Is OK to use the raspberry Pi headphones?  I'll be honest, I did not have success with that option.  the output was noisy (buzzy) - and not good quality.

However, if you do not intend to plug in an instrument in the looper - you do not need a mic input like the sound card above.  You could go with just a sound card that has a headphone and/or speaker output - even maybe something from the Hi-Fi Berry line.  But in this case you will need a microphone that plugs into one of the usb ports.

#### Electronics

##### Through Hole BreadBoard
I strongly recommend getting the breadbaord shown on the left - which is made for raspberry pi prototyping. 
I got mine at [Amazon](https://www.amazon.ca/gp/product/B07MCX54ZD/), but you can get them in many places, just search for :Breadboard PCB Shield Board Kit for Raspberry Pi.  The key is that it comes with a connector that fits the raspberry pi pins, and labels that match the BCM naming.

![Breadboard](./breadboard.png)

You can use a more traditional breadboard like the one on the left. That it what I used for my first prototype (pics to come).  but in that case you need to get female to male raspberry pi connectors like these - and it's a bit more messy when you try to fit this into a case... 

![rapsberry pi conector wires](./rpi-wires.png)

>Note: You do not need the wires if you order the item on the left in the above picture (PCB Shield Board Kit for Raspberry Pi)

##### Light Emitting Diodes(LED)

##### Standard LED:

You will need one red LED and one green LED.
Additionally - for the buffer option:  buy an extra blue LED.

![standard LED](./standardLED.png)

>note: the short leg of the diode, which is connected to the larger piece of metal (you can see inside the plastic) is the negative lead: connect it to GND (ground) in the [schematics](/Looper/Electronics-circuit-schematics/)

##### 7-segment LED

You need one  *common cathode* 7-segment LED. *(You only need one - even though I show 2 here for display)*

![7 segment LED](./segmentcc.png)

> The common cathode is important! It means the center pins are grounded.  If you got the other type  you would have to change the cuiruit schematics and the python code to turn on the segments.  I strongly recommend to get the common cathode - unless of course you have no problem modifying the schematics and the code.

##### Resistors

| Value (ohms) | Basic Looper Qty | Looper+Buffer Qty |
| ------------ | ---------------- | ----------------- |
|         220  |         2        |           x       |
|         330  |         2        |           x       |
|         10K  |         2        |           x       |

##### Capacitors

Capacitors are only needed for the Looper + Buffer option




