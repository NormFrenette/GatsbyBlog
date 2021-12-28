---
title: Introduction to Rapsberry Pi Looper
date: "2021-12-21T10:00:00.000Z"
description: Introduction and key concepts - before you build the Raspberry Pi Looper
mainTag: Basic-Concepts
---

This project started as a way to build a decent sounding looper pedal for my son and I - We play guitar. The original idea was to build something cheaper than the pedals available on the market.  We also wanted a DIY project.   

Because it is build around a Raspberry Pi - which is essentially a computer, we wanted to tap into its power to handle some things that do not usually come with the lower price point loopers out there (around $100). 

Although the project will continue to grow - here's what we have so far:

#### Self-Contained Looper pedal

The looper functions as a standard looper with a sound card mic input and a headphone output (can drive computer speakers).  It can also be used with a usb microphone. It has a single stomp switch that allows to record a base loop, and then overdub multiple tracks.  There is also a toggle switch that controls deletion  or un-deletion of tracks - in the process of building a song. A 7-segment LED counter shows the position in the track while it is playing.

If you have never used a simple looper - this  YouTube [video](https://www.youtube.com/watch?v=Gd0NhglZWtw) by JustinGuitar is a good primer.

#### Includes a separate buffer - why?

##### Impedance mismatch
Sound Cards have low input impedance (2-3K ohms). Passive pickup guitars and bases have high output impedance. Connecting a high impedance output into a low impedance input affects the power transmitted to the input, and does so differently at different frequencies - which affects tone.  

Connecting a guitar directly into a sound card makes its sound thinny - and you loose all the nice tone of your guitar.

##### Solution: A buffer

We need to reduce the impedance of the guitar/base etc.  A buffer does this.

So I designed a very simple buffer - based on circuitry found in vintage guitar pedals (well they weren't vintage when I was young...). Very few parts, one transistors, a few resitors and capacitors.  

The power supply of the Raspberry Pi is very noisy - so I could not use it to power the buffer without constructive complex filtering or reconditioning the power (more $$$).  So I went the simple vintage way: a separate battery dedicated to the buffer only.

##### Buffer is optional

You do not need to use the buffer if you have something else to buffer your guitar before it gets into the looper:
- Mike your amp with a usb microphone (the microphone from the Wii game RockBand works).
- Use a DI box or Apple IRig
- If you already have various guitar pedals - look for one that is not true bypass - like Boss.  It has a buffer even on the clean path. Put it between the guitar and the looper sound card mic input.

If you have none of the above, construct the buffer on the same small pcb board used for the rest of the Raspberry pi GPIO connections.  The buffer is designed to be independant. It has a separate input and output.  So your Looper can be used as a separate buffer.  To use it with the looper. Connect the output of the buffer to the input of the looper sound card.

##### One more benefit

If you build the optional buffer in the looper - you can use it to feed an iphone or computer - like and iRig or DI box.  So you can use all kinds of apps available for these devices to make more music.

#### Extending the functionality with a bluetooth IOS (iphone) app

Basic loopers (i.e inexpensive) have one issue: it is hard to manage  volume when overdubbing.  Another complaint is that the looper contains only one song - and there is no way to store these songs (unless the looper comes with a usb port or bluetooth).

So I decided to build an iphone app that extends the functionality of the looper.  By adding a bluetooth server to the code on the raspberry pi, the app is able to display a mixer interface where each track volume can be controlled in real time in the looper (and stored for re-use).

The app also allows for the saving of tracks into songs by giving them separate song names.   These are stored on the raspberry pi, and can be loaded into the looper portion of the raspberry pi via the app.  This way it becomes possible to create say a blues song, a folks song or a rock song and bring them back separately for practice or further editing. It is also a great way to show your friends or band mates your a new song you created.

> Note: the iphone app is in its final stages of testing - so it is not yet avaiable on the apple App store. I will update this when it is available.

#### What is needed to make the Looper:

To build your Looper, you will need a raspbery pi, some electronics parts and switches. You also need the actual program - written in python and bash.

The electronics section of this blog lists the parts and the schematic that shows how to physically build the Looper.

The Code section shows how to download the open-source code and install it on the rasperry pi.

Finally - the ios app - when published will have a user guide section.






