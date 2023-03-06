---
title: Looper circuit schematics
date: "2021-12-27T10:00:00.000Z"
description: schematics showing how to wire the GPIO pins and building a buffer for your instrument
mainTag: How-to-Build-it
---

This page shows the circuits that need to be wired to the raspberry pi.  If you have not done so - read the [Basic Concepts](/Looper/How-to-Build-it-Introduction/#sectionTop) which explains how the Raspberry Pi and the optional buffer electronics are used.

Per [Parts List](/Looper/How-to-Build-it-parts-list/#sectionTop) you can [contact me](/contact#sectionTop) to get the Printed Circuit Board (v2) which corresponds to the schematic below labelled Looper PCB V2.

If you are using the RPi HAT Proto board - due to physical constraints, the pin connections between Raspberry Pi GPIO connector and LED/switches are different.  The circuits are the same - only the RPi connections changed.  use the schematics labelled RPi HAT

>If you plan to use RPi HAT Proto Board, refer to the [Assembly Instructions](/Looper/How-to-Build-it-assembly-circuits/#sectionTop) where I provide a grid with the layout and connections to each components - using the RPi HAT connections pins.

#### Schematics for Looper Pedal (with buffer) Option:

For those who already know how to read a schematic and don't need all the details that follows - here it is:

| ![Looper Pedal Schematics V2](./schemLooperV2_u.png) Schematics for Looper PCB V2 |
|:--:| 


| ![Looper Pedal Schematics Rpi HAT](./schemLooperPiHAT_u.png) Schematics for Looper build with Pi HAT |
|:--:| 

| ![Looper Pedal Schematics](./schemBuffer_u.png) Schematics for buffer circuit |
|:--:| 

> If you don't know how much about electronics symbols, and the Raspberry Pi GPIO connector - read on - I go through everything one-by-one in details.
> If you don't want to learn the electronics just yet - and want to simply assemble the circuit to get going with the Looper, go to [Parts List](/Looper/How-to-Build-it-parts-list/#sectionTop) first, to find out what parts to get, then go to [Assembly Instructions](/Looper/How-to-Build-it-assembly-circuits/#sectionTop) to start soldering stuff.

#### Raspberry Pi GPIO

The raspberry pi comes with a 2 x 20 pin strip called the GPIOs - which stands for General Purpose Input Outputs.  The GPIO is how we control the Looper program loaded unto the raspberry pi.

> GPIO pins are what make the Raspberry Pi different and so much more useful than your home computer.  You are basically given pins to which you can connect control things (like a switch) so your (programming) code can detect when the switch is turned on or off - and do stuff based on that. Or you can connect display things like light emitting diodes (LED) to them, and your code can turn them on or off as you want.  If you wanted to do this on your laptop you would need to build some electronics outside of it, and probably write code to talk to this electronics via USB for example.
Note that some of the GPIO pins can do more sophisticated actions, for example, some can transmit data serially , - but the Looper only use them in their most simple application: to read the status of switches and to drive light emitting diodes (LED).  

##### GPIO naming of the pins:

There are different way to name the pins.  The simplest called "Physical Pins numbers" is to count the pins from 1 to 40 on the board connector strip.  This works - but it is not the naming convention used in most software written for the Raspberry Pi - so to keep things coherent with other code out there, I used the "other" naming convention - called BCM .  

The Broadcom chip-specific pin "BCM" naming correspond to the column  "NAME" in the image below.  For example, if the circuit diagram shows that you need to connect to pin BCM20, look for GPIO20 in the Name column, and you will see that  you need to connect a wire the physical pin number #38 on the Raspberry Pi connector.
> Are you frustrated that the schematic uses "BCM20" and the diagram below uses "GPIO20"?  Well, I was too when i got started with this.  I found both on the internet resources available - often used interchangeably.  Personally, I think that naming the pin BCM20 is better, because it makes it 100% clear that we are using BCM naming and not physical pin count.  But you will often find things called GPIO20 - and there will be a note somewhere that the document is using BCM naming...

![GPIO naming chart](./header_pinout.jpg)
 
 <p style="text-align: center;">Source: <a target="_blank" href=https://learn.sparkfun.com/tutorials/raspberry-gpio/gpio-pinout>Raspberry Pi GPIO details</a></p>

 #### Schematic Symbols definition

 The image below defines each symbol used in the schematics on this page: 

 ![Schematics Symbols](./schematicsSymbols2.png)

#### Switches circuits

The looper needs two switches:
- Play/Rec/Stop: a push-on normally-off  SPST momentary foot stomp switch. (SPST: Single Pole Single Throw)
- Run/Edit Mode Stomp switch: a 3PDT (Triple Pole Double Throw) latching foot stomp switch. Edit mode is also True Bypass mode. (those are easy to find - they are often called guitar pedal bypass switches).

The buffer needs one additional switch:
- Buffer ON Switch: a 3PDT latching toggle switch. (You can use a foot stomp switch if you want instead)

 
 > Some definitions:  
 > ***Latching*** means that once pressed the switch stays in that "position" until pressed again - when it goes to the other position.  
 > ***Momentary*** means that the switch makes contact (ON) only has long as it is pressed - and goes back to OFF when released.  
 > ***Single Throw*** means that there are two pins.  When switch is ON, pin 1 connects to pin 2. When OFF, Pin 1 is not connected to anything.  
 > ***Double throw*** means that there are three pins. The switch connects the middle pin to the bottom pin, when it is in one position, and then connects to the top pin when it is in the other position. There is not really a concept of ON or OFF here - more a concept of connect to one side or the other.  
 >***Triple Pole*** means there are three sets (columns) of pins. When the switch is thrown the three sets are actuated together: think of having three single poles switches taped together.   
 > So a ***3PDT*** switch has 3 pins in a column because it is double throw, and 3 columns because it is Double Pole, which makes nine (9) pins.  
 > It is always a good idea before soldering to a multi pin switch like a 3PDT to use your ohmmeter and find out which way the pins connect so you can orient it correctly before soldering to it. 


##### Play/Rec/Stop switch:
Make sure you get a ***Momentary*** guitar pedal type stomp switch - and NOT the latching click-toggle type.  Push means when pressed, on state is held until let go.  You need to be able to hold the push stomp switch down for a few seconds to access some functions - and a click-toggle switch cannot do this.

![Play Rec Stop Switch](./push_stomp.png)

How it works:
- When the switch is off, the corresponding GPIO pin is connected to ground via the 10K ohms resistor.  This means that the python code, when reading this GPIO pin will see 0 Volt - which corresponds to logic 0 (or low).
- When the switch is ON, The GPIO pin is connected directly to VCC - which is the 3.3Volt from the RPi GPIO (physical pin 1). In this case the python code when reading the GPIO pin sees a logic 1 or high.
> The resistor is placed there to limit the current flowing from 3.3V to Ground. the amount of current flowing is given by ohms law: V=RI, so I = Voltage / resistance = 3.3V / 10,000 ohm = 0.33 milliAmperes (the K indicates Kilo which means one thousand so 10K = 1000).  
> If there was no resistor - the resistance value = 0 so the current is 3.3Volt / 0 = infinity! - This is a short circuit that would burn up the Raspberry Pi GPIO - and probably the whole board since there are no breaker of fuses on the RPi board.


##### Mode switch : Run/Edit(bypass)

This switch uses:
- one column to set a GPIO input to low (when the other two columns are in bypass position)
- one column to select the output to come from the RPi sound card or from the input jack (bypass).  
- one column to switch the ground of the output jack to the sound card ground (RPi) or the input jack ground (in bypass mode).  

The Python code checks whether it is in Run Mode (0 volt = logic low) or in edit mode (logic high).  

> ***True Bypass***  means that the input signal is wired directly to the output signal without any electronics involved - meaning the exact sound is passed on without any tonal change. 

> How the switch functions:  When pressed it connects the middle pins to the top pins - leaving the bottom pins disconnected. When pressed again it connects the middle pin to the bottom pins leaving  the top pins disconnected.  Because it is a ***latching*** switch - it stays in its position until pressed again.  The three columns  act together: All connect the middle pins to their top or bottom pin at the same time. However, the three columns are totally isolated from each other: it's like having 3 switches where the actuator (button) operates all three at the same time.

![Mode Switch](./modebypassSw_u.png)

How it works - Because it is triple pole - there are effectively three switches acting together:
- Pole 1 is the column of pins on the right:
    - When the switch is connecting the middle pin to the top pin (which is unused), the middle pin is essentially not connected to anything.   The GPIO pin (BCM 3) is connected to VCC (3.3Volts) via the 10K resistor - which means 3.3 Volts appears on the GPIO pin. The python code will see a logic high (1) on this pin. This corresponds to the Edit(bypass) mode.
    - When the switch is toggled so that the middle pin is connected to the bottom pin - the GPIO pin is connected directly to Ground - which is 0 volts - and the python code sees a logic Low (0) on this pin: this corresponds to the Run Mode.
- Pole 3 is the column on the left:
    - When the switch is connected to the top pin (mode Edit(bypass)) - The pedal input (guitar IN) which is connected to the top pin is fed out the middle pin which is connected to the  to the Looper Out Jack. This is called true bypass: Basically ony wires (and switch pins) connects the guitar In to looper out - the guitar just plays through.
    - When the switch is connecting the middle pin to the bottom pin (this is Run mode), the output of the soundcard headphone signal is connected to the Looper Out jack:  this is the normal operation of the Looper. Whatever is being played inside the looper (Raspberry Pi Python code) - is heard at the output.  
- Pole 2 is the column in the middle.  It plays a similar role to Pole 3 - but it connects the grounds.  
    - When the switch is connected to the top pin (mode Edit(bypass)), the ground (sleeve) of the input Jack (Guitar IN) is connected to the ground (sleeve) of the output jack. 
    - When the switch is connecting the middle pin to the bottom pin (Run mode), the ground (sleeve) of the headphone jack (plugged into the usb sound card) is connected to the ground (sleeve) of the output jack.  This means that the input jack ground does not connect to the output headphone ground.

> Ground loops:  In an earlier design I had the mic input plug ground and the headphone output plug ground connected together as well as to the pedal input and output 1/4" jacks.  This created a ground loop - and picked up a lot of the "dirtiness" of the RPi power supply as well - which got and amplified by the buffer transistor circuit.  The result was an annoying buzzing/whistling sound.  By breaking up the output ground path with the switch - we have the input ground /buffer ground /RPI USB ground on the mic input side, but the output signal has only the headphone jack ground only (not connected to the input ground making a loop).

##### Buffer-ON toggle switch 
Use this switch if including a buffer in the looper.

This uses a 3PDT (3-pole double throw) toggle switch - with a lever (not stomp).
- a 9V battery and a 9V connector with lead wires.
- a 10K resistor and blue LED (acts as indicator that the buffer circuit is On - and using the battery).

![Buffer-On toggle switch](./bufferOn2.png)

How it works:

- Pole 1 is the column on the right and controls power to the buffer.  
    - When the switch is toggled to "buffer ON", the middle pin is connected to the top pin. The battery is connected to the buffer circuit (Switched 9V) which powers the buffer.  Also the 9V voltage flows through the resistor and the light emitting diode (LED) is lit.
    - When the switch has connected the middle pin to the bottom pin which is not connected to anything, the top pin has no power (buffer is off, LED is not lit) - and the battery is not connected to anything - thus it is not loosing charge.
- Pole 2 is the middle column:
    - The middle pin is connected to the input jack (guitar IN). When middle pin connects to the top - Buffer is ON, the guitar In signal is sent out to the input of the buffer (when then does it's "buffer thing" on it), and puts out the impedance corrected signal at buffer Output.
    - When the middle pin connects to the bottom pin, the buffer is off: The buffer input receives nothing. The Guitar In signal is hard wired to the bottom pin of pole 3 (see next).
- Pole 3 is the left column:
    - The middle pin of pole 3 goes to the mic input of the soundcard: this is the signal that the Looper records. When the middle pin is connected to the top pin, buffer is ON, and the buffer output signal is connected to the Looper mic input.  
    - When the middle pin is connected to the bottom pin - the buffer is OFF, and the bottom pin is hard wired to the bottom pin of Pole 2 - which is at the moment connected to Guitar In: Thus the guitar In signal is sent to Looper mic input (i.e. the buffer is no in the circuit). 
    
    So when the buffer switch is ON, the guitar In signal goes through the buffer before being fed to the Looper mic input.  
    When the buffer switch is OFF, the battery circuit is interrupted - so no current flows from the battery.  The guitar IN signal is fed directly to the Looper mic input.


#### LED circuits:
The Looper circuit uses:
- Play: green LED
- Rec: red LED
- Counter/track indicator: 7 segment common cathode LED

The buffer circuit uses the blue LED - which is shown with the Buffer On Switch circuit above.


##### Green and Red LED (Play/Rec)

The Red LED is lit by the Python code when the Looper is recording a track.
The Green LED is lit by the Python Code when the mode Switch is in Edit (Bypass) mode.
> Refer to schematics for GPIO pin connection

![Red and Green LED circuits](./LED_rec_play2.png)

How it works:

- The Python Code has the ability to set GPIO pins as outputs.  This is done for the pin that connect to the resistor of each LED.
- The Python Code then has the ability to set the output of a pin to ***high*** - which is 3.3V, or to ***low*** which is RPi Ground (0V).  Setting the pin to high is like connecting a 3.3V battery to the pin.
- When the pin is low - at 0V, no current flows through the circuit, and the LED is Off.
- When the pin is high - current flows through the Resistor and the LED:
    - Without going into the physics of the LED, it is enough to understand that once an LED starts to conduct current, it will drop approximately 2V across its terminals. (RED: 1.7-2V, GREEN: 2.1-2.2V).
    - This means that we need a minimum of 2 volts, at the GPIO pin to turn on an LED:  we have 3.3V so we are OK. Question: where is the rest of the voltage?  It is "dropped" across the resistor.
    - The voltage on one side of the resistor (GPIO pin) is 3.3V.  The Voltage on the other side of the resistor (entry to LED) is 2V.  So we are dropping 1.3V across the resistor - and using again Ohm's law current (I) = Voltage(V) / Resistance (R). With a resistor of 270 Ohm per our schematic, we see that 4.8 mA (milliAmperes) flows across our resistor.  
    - By increasing the resistance value we lower the current - which makes the LED dimmer.  Conversely, decreasing the resistance increases current making the LED brighter.  

    > I recommend you wire up a diode circuit to test if you like the brightness of the LED.  Also, even though the schematic uses the same resistor (270) for both LED - you can experiment and choose two different resistor to get the brightness you like for each diode.

##### LED 7-Segment
Ensure you use a **"common cathode"** 7-segment LED

![LED circuit and GPIO pin table](./7segment_gpio3.png)

How it works:

- Each segment is a separate diode.  The current enters a given diode at the pin corresponding to the (letter) segment, and flows out pin 3 or 8 (does not matter since 3 and 8 are the common cathode and connected together internally).  
- The cathode is always the "exit"point of the current out an LED (see symbol definition above).  This means that we must set the voltage at the control pins higher then the voltage at pin 3/8.  We do this by connecting the control pins to a GPIO pin, and the pins 3 & 8 connect to ground (0v) through a current limiting resistor - similar to what was explained above for red/green LED. (the resistor limits the current flowing through the LED).  
- It does not matter if the resistor is before or after the diode, but if we put it after - we only need one since all the diode grounds (Cathode) come out of pin 3 and 8 which we tie together.
> Be advised that I am cheating here - and many a purist on the internet will scold me for being so cavalier.  The recommended practice is to put one resistor on each pin and connect 3/8 directly to ground. If you do this, the current to each diode flows through its own (and only one) resistor ensuring that each diode get the same current whether one or more segment are lit - to ensure equal brightness.  
> In my (lazy) case, remember that the current is decided by the resistor - which here is 390 ohm. If we use a voltage drop of 1.7V for the red led segment we find current = (3.3 - 1.7) Volt / 390 ohms = 4.1 mA.  However if two segments on, they have to share this current among them - so if we had two exactly  same segment - they would each get about 2mA.  Then when all 8 segments are on, each diode segment gets about 1/8th of the available current (4.1 mA) so they each get about 0.5 mAmp each.  This matters before less current in an LED means - up to a point - less brightness.  So the purist will argue that with only one resistor on the common ground side (cathode), has the numbers displayed change, the number of segment change and the brightness between say #1 and #8 will not be equal.  They are - technically - right.
> However, in practice - it is not so easy to see the difference.  this is because an LED is not a linear device like a resistor.  Depending where you operate on the diode current vs brightness curve, a small increase/decrease of current does not necessarily means and equal increase/decrease in brightness. You should test it - but for this application using the resistor values I recommended, the change in brightness between displaying number 1 vs number 8 is not that noticeable - or does not affect the purpose for which it is used (counting down position in a track).   
> If you ever build a project where you have multiple 7-segment displays next to each other, then you should use one resistor per input pin.  If you don't (i.e. use just one resistor per 7 segment device)  -  #1 displayed next to a #8 will look different enough to look bad. (But here we only have one - so it does not really matter).


#### Optional Buffer circuit
If you have selected to include the buffer circuit, and the associated Mode Switch (on-off-on DPDT toggle), build the following circuit on the same breadboard as the rest of the switches and LED circuits - making sure that it is separated from the Raspberry pi power and ground (these should **NOT** be connected together on the breadboard).

- Buffer circuit connects to Switched 9V  (power from battery through Buffer On switch) – completely separated from RPi.
- Buffer circuit Ground (GND) is the negative of the battery NOT connected to RPi ground (GNDREF on schematic).

> There are various alternatives for the output jack using 3.5mm plugs that can be used here.  See the discussion in the [parts list](/Looper/How-to-Build-it-parts-list/#sectionTop) document.

![Optional Buffer circuit](./buffer2.png)

A discussion of how it works is too long for this page. I will eventually post something separately.

> The 470K ohm resistor plays a key role to increase the input impedance of the buffer - which we want has high as possible ro match the output impedance of the guitar (It has to be high enough to not reflect too much power, but low enough to provide enough current to the transistor).  
> The higher the resistance, the better the power transfer and the purest the tone (of your guitar).  
> However, if your guitar puts out two much voltage (hot pickups, or you play really hard with a pick) - the higher resistance means more power transferred, and you may overdrive the transistor - creating distortion.  In this case you may want to lower the resistor. Listen for the tone you get to decide what is good for you.  
> If you like the distortion sound (very vintage with one transistor) - you can keep the resistor but turn down the volume for clean parts.  

As always I recommend building the circuit on a bread board and trying it out to see what you get before soldering everything.  But the values that are there should work - if you just want to go ahead.



