---
title: Parts List for Raspberry Pi Looper
date: "2021-12-26T10:00:00.000Z"
description: List of parts needed to build the Looper
mainTag: How-to-Build-it
---

This document the various parts required to build the Raspberry Pi Looper.  

#### Raspberry Pi

I recommend the raspberry pi (RPi) version 3B+ or 4.  The RPi must have wifi and bluetooth (if you want to use the ios app - which is recommended).

Can you use a pi zero W?  Simply put - I am not sure.  If you have one lying around - please try it and let me know how it works.  
>The original pi zeroW had only one core.  The python program is written to use multi-cores as much as possible but the code will run on one core - meaning it will not crash.  The problem is that the audio sampling and playback could be affected by file operations (like saving to SSD card) - and may create stuttering in playback.  At some point I intend to test this - and when I do I will update this.

What about the pi zero 2 W? I have not obtained one yet - but I think it should work just fine as it has 4 cores.  So go for it!

#### Power Supply for Raspberry pi:

I strongly recommend that you purchase a dedicated 5V 2.5 amp power supply that fits your raspberry pi.  Make sure it matches the connector on your selected RPi: the RPI 3B+ uses micro-usb plug whereas the RPi4 uses a usb-c connector.

I got the power supply for my RPI 3B+ at [Canakit](https://www.canakit.com/raspberry-pi-adapter-power-supply-2-5a.html).

For my RPI4 - I used a 4 port usb power supply with a usb-a to usb-c cable that I had lying around to charge my motorcycle helmet communicators.  It works fine.  I bet an ipad or tablet charger would work fine as well - just make sure you can put out 2.5 Amps for a RPI 3b+ or 3 Amps for a RPi 4 (as recommended on their website).

#### USB Sound Card:

Since we are trying to keep costs down - I recommend the following: Sabrent Audio Stereo Sound Adapter. It is less then $10 on Amazon and works fine.

![Sabrent usb sound card](./usb-soundcard.png)

Is it OK to use the RPi headphones?  I'll be honest, I did not have success with that option.  The output was noisy (buzzy) - and not good quality.

However, if you do not intend to plug in an instrument in the looper - you do not need a mic input like the sound card above.  You could go with just a sound card that has a headphone and/or speaker output - even maybe something from the Hi-Fi Berry line.  But in this case you will need a microphone that plugs into one of the usb ports.

#### Electronics

##### PCB / Proto Board

You need to decide what substrate you will use to assemble the electronics.  
From hardest (left) to easiest (right).
![Breadboard](./breadboard.png)

###### Single sided Pad Board:

Many a DIY guitar pedal was built on these.  I like the single sided because it allows to make connections with the bare wire of resistors, capacitors on the side that has no solder.  This solution however must use Raspberry Pi connecting wires like these - to connect the GPIO pins from the RPi 40-pin connector to the pad board.  

![Raspberry Pi connector wires](./rpi-wires.png)

The result works fine - but there's a lot of wires to contend with when fitting it in a box...  I would recommend the pad board if you are only building the Looper WITHOUT the Buffer option.

![Pad Board assembly](./assypadboard.png)

###### RPi Proto Hat

These are very useful because they come with a solderable 40 pin connector (so you don't need the wires above).  They also breakout the GPIO pins, 3.3V and GND for easy connections, and provide a prototyping area with 5-hole strips for interconnects.  

I got mine at [Amazon](https://www.amazon.ca/gp/product/B07MCX54ZD/), but you can get them in many places, just search for "Breadboard PCB Shield Board Kit for Raspberry Pi".  The key is that it comes with a connector that fits the RPi pins, and labels that match the BCM naming.

It does get a bit difficult to route and solder all the wires from the 7-segment LED to the GPIO pins, but I did complicate my life by using 16-gauge wire I had left over - instead of getting 18 or 20 gauge which would have worked just as well...

The only problem I have with these is they do not provide a ground plane - which help with audio noise.  But I found it works fine (as long as you're not trying to play "Live at the Olympia").

The finished result is cleaner and easier to assemble - shown here mounted to the Raspberry Pi (which is underneath). - Ignore the surrounding switches for now.

![RPi Proto Board assembly](./assyrpiproto.png)

###### Looper+ Buffer PCB:

I designed a PCB and had it manufactured in small quantities.  This is the easiest for assembly since all you need to do is drop the components in and solder.  There is also some stress relief provided on the edge of the board to connect the wires going to control switches.  

The biggest advantage is that I was able to clearly separate the buffer circuit from the RPi circuits - and provide two separate ground planes: This has improved audio noise reduction - which is now on par with my other guitar pedals.  

I plan to set up a facebook page or something similar for those who would like to get this PCB from me (for a small fee).  In the meantime - leave a comment below if you are interested and we'll connect somehow.

Here's the assembled view - mounted on the RPI:

![PCB assembly](./assypcb.png)

##### Light Emitting Diodes(LED)

##### Standard LED:

You will need one red LED and one green LED.
Additionally - for the buffer option:  buy an extra blue LED.

![standard LED](./standardLED.png)

>note: the short leg of the diode, which is connected to the larger piece of metal (you can see inside the plastic) is the negative lead: connect it to GND (ground) in the [schematics](/Looper/How-to-Build-it-circuit-schematics/)

##### 7-segment LED

You need one  *common cathode* 7-segment LED. *(You only need one - even though I show 2 here for display)*

![7 segment LED](./segmentcc.png)

> The common cathode is important! It means the center pins are grounded.  If you get the other type  you would have to change the circuit schematics and the python code to turn on the segments.  I strongly recommend to get the common cathode - unless of course you have no problem modifying the schematics and the code.

##### Resistors

- Column "(no buffer) Looper indicates the quantities required when optional buffer is not built.
- Column Looper+Buffer indicates the total quantities required when optional buffer is included in the build.

| Value (ohms) | (no buffer)Looper Qty | Looper+Buffer Qty |
|:------------:|:----------------:|:-----------------:|
|         270  |         2        |           2       |
|         330  |         1        |           1       |
|         1K   |         x        |           1       |
|         10K  |         2        |           4       |
|         18K  |         x        |           1       |
|        470K  |         x        |           1       |


> The 270 ohms resistor are used for the red and  green LEDs. They basically control the brightness. You can use 330 ohms or even 390 ohms if you want them less bright.  

> Similarly the 330 ohms resistor controls the brightness of the 7-segment LED display.  In my latest implementation, I have used a 390 ohm instead - because I like the display which shows the track count to be a little less bright.  If you play in a very sunny room - you might want to stick with the 330.

##### Capacitors
 
Capacitors are only needed for the Looper + Buffer option

- 10 microFarad electrolytic - qty: 1
- 22 microFarad electrolytic - qty: 1
- 0.1 microFarad (100 nano) - qty: 1   / *use ceramic or tantalum or orange drop etc. (not electrolytic)*

> The actual value 22 microFarad is not very important and does not affect the tonal response very much.  I have successfully used 33 microFarad (because I ran out of 22) - and the circuit works just fine.  

##### Transistor

The circuit requires one **NPN BC549 transistor**. If you don't already have transistors - buy that one.  

Alternate transistor choice:  the BC550 is more or less a direct replacement.  

I use this transistor because it is a low noise transistor - which is useful in audio circuits.  If you don't already have transistor lying around - I suggest you get this one.

There are many vintage circuit that use the 2n2222 or even 2n3904 as well. I have not tested these - but if you have one of those instead, try them to see how they sound.  The circuit is the same. 

>Warning the BCxxx transistor series uses Collector (pin 1), Base (pin 2), Emitter (pin 3), whereas the 2N series uses the reverse (1-2-3: E-B-C).  Make sure you download the datasheet of the transistor you select to identify the pinout correctly.

##### Switches:

3 switches are used with the buffer option.  Only the 2 switches on the left are needed if you are building the Looper without the Buffer Option:

![Switches](./switches.png)

###### Play/Rec/Stop Momentary foot stomp switch

The switch used to control the Play, Record and Stop of the Looper is a momentary push button foot-pedal stomp switch.  It is important that you purchase a Push-type switch (it does not click) , which means that it is On while the button is pressed, and remains on as long as the button is pressed.

Search for ***Momentary*** Stomp Foot Switch like this one found at [Amazon](https://www.amazon.ca/gp/product/B077P1BFX9/)

Do not get the  click-on click-off toggle stomp switch found on many guitar pedals.  It will not work with this switch.  

###### Run/Edit (bypass) - Mode switch

You need at least a **DPDT On-Off Latching Foot (Stomp) switch**. This is the type of switch that clicks on and clicks off. There are 6 connectors underneath the switch. When in edit node - the guitar in is pass straight trough to looper output jack (True bypass).   

This is an example of the DPDT switch needed:[Amazon: DPDT switch](https://www.amazon.ca/Support-Latching-Switch-Guitar-Button/dp/B076VCQPL8/).  But in fact, this is not the type I used: I used the 3PDT because I have those.

> The switch shown in the picture above is a 3PDT switch (with 9 terminals underneath).  I have these, because they are often used in true-bypass guitar pedals.  Although this design does not need the 9 terminals of a 3PDT switch - I  only use the outer columns of terminals - leaving the middle column unused. So, if you have those, use them - and if you think you might do other projects where a true bypass is needed - buy a set of 3PDT switches instead of the required DPDT (6 terminal) switch (price is the same more or less).  Just make sure it is the ***latching*** type (not the momentary type).

###### Buffer On-Off Toggle switch:

You only need this switch if you are building the Looper with Buffer Option.  

This switch has 9 terminals underneath - but uses a toggle lever instead of a foot stomp switch.  The lever is recommended because you can see the position of the lever (On-Off). Although the circuit also has a blue LED when the buffer is on - if the battery is dead, your LED will not light, but the position of the toggle lever indicates it *should* be on.
>Note that if you have a few 3pdt foot stomp switches lying around and you don;t feel like buying the toggle switch - go ahead and use the foot stomp switch - it will work.  Just make sure it is a latching switch - not a momentary switch.

#### Jacks and miscellaneous

Jacks are needed to connect instruments into the Looper and carry the sound out to amplifier.  

![Jacks](./jacks.png)

###### 1/4 inch Audio (guitar) Jacks (female):

These are 1/4 inch female (guitar) jacks.  You need 3 for the Looper_Buffer option (but only 2 if not building the buffer option).

###### 3.5 mm (male) Jacks:

Internally to the pedal, we need to convert the 1/4 inch input and output jacks to 3.5 mm male jacks that fit the usb sound card (described above).  

I have found that the cheapest approach is to buy one male-to male cable like [this one on amazon](https://www.amazon.ca/gp/product/B071V7VW96/).  Cut the wire in half, strip the leads and solder them to the jacks/switches as per schematic.  
> You could also buy/use purpose-built 3.5mm built jacks - but I have found them for difficult to obtain at a reasonable price.

>IMPORTANT: Do NOT buy stereo 3.5mm male jacks.  They do not fit correctly in the sound card input.  The sound card I have recommended accepts only mono mic input.  (Of course, if you bought something different, it might work...)

##### 9V Battery Connector

This is only needed if the buffer option is built.

You need something to get the 9 V battery connected to the buffer circuit.  I find that these battery connectors are the simplest - but you may want to purchase a more complex product that comes with the battery holder as well.

![Battery connector](./batteryconn.png)


#### Case:

You will need a case for your looper.  I intend to build a case that can be 3-D printed.  When I do, I will post the step file so you can print yourself a case as well.  

In the meantime - the only requirement is that the case cannot be made entirely of metal - because we need the wifi and bluetooth signals to get to the raspberry pi.

I have found that an older iphone box (model 8 or before) is a very good prototype enclosure - because it is solid enough to be "stomped" upon as any guitar pedal, and yet, made of cardboard so wifi/bluetooth gets through.  Here is a pic of what I did:

![Looper case iphone box](./iphonebox.png)




