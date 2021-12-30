---
title: Assembly of Looper Circuit
date: "2021-12-30T10:00:00.000Z"
description: instructions, details and picture of the circuit board assenbly
mainTag: How-to-Build-it
---

This might be a long page - I assemble the circuits and take lots of pictures.  Hope it is useful...

>Note: This shows how to build the Looper+Buffer option.  If you are not building the buffer, refer to the schematics for what you don't need to build (I'll mention it below as I go)

> For the buffer: I am using the option with one female 1/4 inch guitar jack input and a wired 3.5 mm output male output jack.

#### Getting the Parts ready

I recommend getting all the parts laid out, labeled as necessary before starting.  I have a wooden desk that I dedicated to electronics.  If you look carefully, you can see  burnt spots from solder/soldering iron from past projects.  I recommend you don't assemble this on your Louis XIV antique table ... but to each his own.

##### General Parts

![general parts ready](./partsready.png)

- Top left: Raspberri pi 3b+
- Row underneath the Raspberry Pi, left to right:
    - red, green, blue LED
    - 7 segment common cathode LED
    - push-on momentary stomp switch
    - on-off-on DPDT toggle switch
    - underneath the switches: 1/4 inch mono female jack
- Next row underneath:
    - RPi prototyping breadboard hat and its black connector (comes with it)
    - Sabrent usb sound card (green input is mic, pink is headphone)
    - 3.5mm mono male to male wire connector (I will cut this in two and only use one for the buffer output)
    -Below the red breadboard:  9V battery connector with leads.
- Top right:
    - 2 spools of solid copper wire - it's either 18 or 20 gauge.  I use a red and a black because I like to identify red leads that go to VCC (3.3V) and black leads that go to ground. But that is not important.
    - Solder iron.  A while back I invested in a nice one with temperature control, but it's a bit overkill for this project.  A standard solder iron is just fine.  Make sure you get a sponge though.

##### Small Electronics components

I don't know about you - but my small electronics component do not like my table, and at the first opportunity they jump off and go hide under the couch or the bookcase.  So over the years I have learned that if I take 5 minutes to identify them, and tape them to a white sheet of paper - I save a lot of time later.

For this build I also added information for the reistor color code (in case one does falls of the table anyway: I can figure out which is which). For the capacitors, I wrote down the number/letter code. For the transistor, I wrote the location and name of each pin - to match my schematic

![resistors ready](./partsresistors.png)
<p style="text-align:center">Resitors</p>

---

![capacitor ready](./partscapacitors.png)
<p style="text-align:center">Capacitors</p>

---

![transistor ready](./partstransistor.png)
<p style="text-align:center">Transistor</p>

>Note: Since I had one left in my box of parts, I decide to use a transistor socket (shown on left of transistor).  It is not necessary, but it makes it easier to solder, without having to worry about getting the transistors leads to hot (which can damage the transistor).  I did not use one in my first prototype and everything was fine.  You don't have to use one. 

---






