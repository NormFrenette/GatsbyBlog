---
title: Introduction to Raspberry Pi Looper
date: "2021-12-23T10:00:00.000Z"
description: Introduction and key concepts - before you build the Raspberry Pi Looper
mainTag: How-to-Build-it
---

This project started as a way to build a decent sounding looper pedal for my son and I - We play guitar. The original idea was to build something cheaper than the pedals available on the market.  We also wanted a DIY project.   

Because it is build around a Raspberry Pi - which is essentially a computer, we wanted to tap into its power to handle some things that do not usually come with the lower price point loopers out there (around $100). 

#### This Website is for Newcomers to Raspberry Pi and Electronics!

I created this website so a musician (budding or expert) could build a looper - without ever having seen a Raspberry Pi, the inside of a computer, or done any electronics.  I am documenting everything that way.  People who already know this can skip ahead.

Originally, I am focussed on getting the Raspberry Pi going, and the electronics going.  But eventually, I will post details of the software - so if the musician in question wants to learn to code and modify the code - it can be done.

##### Typical scenario I am hoping to reach:

You are a teenager playing guitar or base or a synth - and you are curious about electronics and coding (Python).  You don't want to spend a lot of money on a looper pedal - but it would be great to have one so you can lay down backing tracks and practice.

Or you are the parent/ grans-parent of this teenager.  

This website will show you what you need to buy, and how to build a looper that sounds good, that works like most small loppers out there.  And then, if you like it - you can even start adding functions to your looper:  The code is free (as in beer) for the Looper, so you can do what you want with it.

In the end, it may not be cheaper than just buying a looper: After all you will need a soldering iron, a voltmeter (not necessary but sure is useful), and a Raspberry Pi.  But, of course, once you get this - you'll be able to create many other things...

I am an electrical engineer, and I use to teach at University level.  I am retired more or less - but it is my hope that I can reach enough people to create a community around this - and have more people contributing ideas, designs etc. 

But for now - we start small: Let's talk about the Looper pedal.

#### Self-Contained Looper pedal

The looper functions as a standard looper with a sound card mic input and a headphone output (can drive computer speakers).  It can also be used with a usb microphone. It has a single stomp switch that allows to record a base loop, and then overdub multiple tracks.  There is also a toggle switch that controls deletion  or un-deletion of tracks - in the process of building a song. A 7-segment LED counter shows the position in the track while it is playing.

If you have never used a simple looper - this  YouTube [video](https://www.youtube.com/watch?v=Gd0NhglZWtw) by JustinGuitar is a good primer.

Everything here is geared towards building a Looper ***pedal*** - that you plug your guitar/base/synth into using a guitar patch chord, and then connect the output to either other pedals or to an amp. However, because it uses a computer (Raspberry Pi) and a usb sound card - it could be used with a microphone.  You could even use a usb microphone.  I am not going to discuss details of this - but I think it will be obvious how to use this looper for that.

#### Includes a separate buffer - why?

##### Impedance mismatch
Sound Cards have low input impedance (2-3K ohms). Passive pickup guitars and bases have high output impedance. Connecting a high impedance output into a low impedance input affects the power transmitted to the input, and does so differently at different frequencies - which affects tone.  

Connecting a guitar directly into a sound card makes its sound thin - and you loose all the nice tone of your guitar.

##### Solution: A buffer

We need to reduce the output impedance of the guitar/base etc.  A buffer does this.

I designed a very simple buffer - based on circuitry found in vintage guitar pedals (well they weren't vintage when I was young...). Very few parts, one transistor, a few resistors and capacitors.  The buffer circuit fits on the same circuit board as the rest of the RAspberry Pi Looper circuits.  

The power supply of the Raspberry Pi is very noisy - so I could not use it to power the buffer without adding complex filtering or reconditioning the power (more $$$).  So I went the simple vintage way: a separate battery dedicated to the buffer only.

##### Buffer is optional

You do not need to use the buffer if you have something else to buffer your guitar before it gets into the looper:
- Mike your amp and feed it to the looper pedal (possibly coming from the mixer...)
- Use a DI box or Apple IRig
- If you already have various guitar pedals - look for one that is not true bypass - like Boss.  It has a buffer even on the clean path. Put it between the guitar and the looper sound card mic input.

If you have none of the above, I strongly suggest that you build the buffer.  

##### Buffer: One more benefit

Since the buffer is essentially a separate pedal integrated in the looper, I decided to provide a buffer output as well as a looper output.  A switch is used to internally switch the buffer output (low impedance) to the input of the looper.  But having the buffer output available coming out of the pedal,  - means that the pedal can be used as a buffer (without powering up the Raspberry Pi).  

In effect, this becomes a D.I. box (like an iRig) - that you could connect to your computer sound card. You then can use all kinds of apps available for these devices to make more music.

#### Extending the functionality with a bluetooth IOS (iphone) app

Basic loopers (i.e inexpensive) have one issue: it is hard to manage  volume when overdubbing.  Another complaint is that the looper contains only one song - and there is no way to store these songs (unless the looper comes with a usb port or bluetooth).

So I decided to build an iphone app that extends the functionality of the looper.  By adding a bluetooth server to the Python code on the raspberry pi, the iPhone app is able to display a mixer interface where each track volume can be controlled in real time in the looper (and stored for re-use).

The app also allows for the saving of tracks into songs by giving them separate song names.   These are stored on the Raspberry Pi, and can be loaded into the looper via the app.  This way it becomes possible to create say a blues song, a folks song or a rock song and bring them back separately for practice or further editing. It is also a great way to show your friends or band mates a new song you created.

> Note: the iphone app is in its final stages of testing - so it is not yet available on the apple App store. I will update this when it is available.

#### What is needed to make the Looper:

To build your Looper, you will need a Raspberry Pi, some electronics parts and switches. You need to solder all this together. You also need the actual program - written in python and bash - so you will need to know/learn how to get a Raspberry Pi up and running and load the software into it.  Don't worry if it's your first time - I have provided detailed instructions here - with a number of automated ways to install this.

The [How-to-Build-it](/Looper/How-to-Build-it-circuit-schematics/) section (menu on left) of this blog lists the parts and the schematic that shows how to physically build the Looper.

The [Software-Installation](/Looper/Software-Installation-Raspberry-Pi-Automated/) section shows how to download the open-source Python code and how to install it on the Raspberry Pi, as well as install various modules needed for sound and bluetooth to work.

Finally - the ios app - when published will have a user guide section.

The [How-to-Use](/Looper/How-to-Use-User-Guide/) section provides a user guide for the Looper pedal.
> When the iphone app is published - a user guide for the iphone app will also be included here. 






