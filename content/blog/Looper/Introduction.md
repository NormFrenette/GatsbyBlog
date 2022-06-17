---
title: Introduction to Raspberry Pi Looper
date: "2021-12-23T10:00:00.000Z"
description: Introduction and key concepts - before you build the Raspberry Pi Looper
mainTag: How-to-Build-it
---

I started the Looper project as a way to build a decent sounding Looper pedal for my son and I  - we both play guitar. 

The original idea was to build something cheaper than the Looper pedals available on the market.  We also wanted it to be a DIY project.   

Because it uses a Raspberry Pi - a computer - we could tap into its power to handle some things that do not usually come with the lower price point Loopers out there (around $100). 

#### A Website for Newcomers to Raspberry Pi and Electronics!

I created this website so a musician (budding or expert) could build the Looper pedal - without ever having seen a Raspberry Pi, the inside of a computer, or done any electronics.  I am documenting everything with this in mind.  

This website shows  what you need to buy, and how to build the Looper Pedal.  And then, if you like it - you can even start adding functions to your Looper:  The Looper Pedal's Python code is free (as in beer), so you can modify it.

I will keep posting here over time - adding more documentation to the software.  But I started with the electronics, and the Raspberry Pi basics - to get you going. 
>You don't have to understand software code in order to build the Looper. But if you want, using this website, you can learn.

##### Who I am hoping to reach:

You are a teenager playing guitar or base or a synth - and you are curious about electronics and coding (Python).  You don't want to spend a lot of money on a Looper pedal - but it would be great to have one so you can lay down backing tracks and practice.

Or you are the parents/grand-parents of this teenager.  Maybe, you want to buy all the needed pieces on line, and give that teenager 
a ready-to-build kit - and all the instructions are here.  

Hey! You don't have to be a teenager:  You can be a person with more years under your belt - looking to get into a new hobby.  May be your're not even the musician - but you know one...

###### What I hope may result from this:

When I was 10 or 11, my dad bought me a generic Heathkit board - you could build like 40 projects with it.  I built an AM transistor radio - and got in trouble for running up a tree with a 100 foot antenna wire.  But it worked!!! I was hooked. What was nice with Heathkit, was the manual. It actually explained how transistors, resistors, capacitors and inductors worked. It explained how and why the circuit worked.

Unsurprisingly, I became an electrical engineer, got a Ph.D., taught at a University - before going into Industry.  I am more or less retired now. I am taking the time to document how the Looper works, and why. I hope to provide those who build the Looper starting without much knowledge, an opportunity to learn while having fun building it and using it.  Just like Heathkit did for me...

In the end, it may not be cheaper than just buying a Looper: After all you will need a soldering iron, a voltmeter (not necessary but sure is useful), and a Raspberry Pi.  But, of course, once you get this - you'll be able to create many other things...

But for now - Let's talk about the Looper pedal.

#### Self-Contained Looper pedal

The Looper functions as most smaller looper pedals in the market. It has a single stomp switch that allows to record a base loop, and then overdub multiple tracks.  There is also another stomp switch for True Bypass, and it controls deletion  or un-deletion of tracks - in the process of building a song. A 7-segment LED counter shows where you are in the track while it is playing.

If you have never used a simple looper - this  YouTube [video](https://www.youtube.com/watch?v=Gd0NhglZWtw) by JustinGuitar is a good primer.

Everything here is geared towards building a Looper ***Pedal***: You plug your guitar/base/synth into it using a guitar patch chord, and then connect the output to either other pedals or to an amp.   

>However, because it uses a computer (Raspberry Pi) and a usb sound card - it could be used with a microphone or other musical outputs.  You could even use a usb microphone.  You don't even need to put it into a pedal enclosure, or buy solid stomp foot switches. It's up to you what you make of it and how you use it.  I am not going to discuss details here - but I think it will be obvious from the instructions how to use this Looper for that as well.

#### The Looper includes a separate buffer circuit - why?

##### Impedance mismatch
Computer Sound Cards have low input impedance (2-3K ohms). Passive pickup guitars and bases have high output impedance (500 Mega Ohms +). Connecting a high impedance output into a low impedance input affects the power transmitted to the input (looses power), and does so differently at different frequencies - which affects tone.  

Basically, connecting a guitar directly into a sound card makes its sound thin - and you loose all the nice tone of your guitar. Because of this - you need to match the output and input impedances.  To do this - Apple will sell you an iRig for $100, or you could buy a D.I ( direct input) box for even more money!    

##### Solution: A buffer

We need to reduce the output impedance of the guitar/base before feeding it to the sound card.  A buffer does this. It accepts a high impedance as input (i.e the output of your guitar) - and puts out a low impedance signal that works well with the sound card.

I designed a very simple buffer - based on circuitry found in vintage guitar pedals (well, they weren't vintage when I was young...). The buffer circuit fits on the same circuit board as the rest of the Raspberry Pi Looper circuits.  

The power supply of the Raspberry Pi is electrically noisy - and this gets pickup by the buffer - resulting in buzzing /hums etc. I could not use it to power the buffer without adding complex filtering or reconditioning the power (more $$$).  So I went the simple vintage way: a separate 9V battery dedicated to the buffer only. 

##### Buffer is optional

You do not need to build the buffer circuit if you have something else to buffer your guitar before it gets into the Looper:
- Put a microphone in front of your amp and feed it to the Looper pedal (possibly coming from a mixer...)
- Some newer amps have a line/headphone out - you can feed to the sound card
- Use a DI box or Apple IRig type of device
- If you already have various guitar pedals - look for one that is not true bypass - like Boss.  It has a buffer even on the clean path (pedal not engaged). Put it between the guitar and the Looper.

If you have none of the above, I strongly suggest that you build the buffer.  It's very few parts, and inexpensive.

##### Buffer: One more benefit

Since the buffer is essentially a separate pedal integrated in the Looper, there is a buffer output as well as a Looper output (see [this picture](/Looper/How-to-Use-User-Guide/)).  Having the buffer output available coming out of the pedal, means that the pedal can be used as a buffer (without powering up the Raspberry Pi).  

Effectively, the buffer part of your Looper becomes a D.I. box (like an iRig) - that you could connect to laptop or desktop sound card (Mac or PC). You then can use all of the apps available for these devices to make more music.

#### Extending the functionality with a bluetooth IOS (iphone) app

Basic Loopers (i.e inexpensive) have one issue: it is hard to manage  volume when overdubbing.  

Another complaint is that the Looper contains only one song - the one you are currently recording with the looper. There is no way to store these songs unless the Looper comes with a usb port (more $$$).

I am building an iphone app that will extends the functionality of the Looper.  By adding a bluetooth server to the Python code on the Raspberry Pi,The iPhone app can connect to the Looper pedal over bluetooth.   The app then displays a mixer interface where each track volume can be controlled in real time in the Looper.

With the app, you can also save recorded tracks into songs by giving them separate song names.   These songs are stored on the Looper's Raspberry Pi SD card. From the iPhone app, you can select which song should be loaded in the Looper.  This way it becomes possible to create say a blues song, a folks song or a rock song and bring them back separately for practice or further editing. It is also a great way to show your friends or band mates a new song you created.

> Note: the iphone app is in its final stages of testing - so it is not yet available on the apple App store. I will update this when it is available.

#### What is needed to make the Looper:

To build your Looper, you will need a Raspberry Pi, some electronics parts and switches. You need to solder all this together. You also need the actual program - written in python and bash - so you will need to know/learn how to get a Raspberry Pi up and running and load the software into it.  Don't worry if it's your first time - I have provided detailed instructions here - with a number of automated ways to install this.  

>You do not need to know Python or any programming to load the Looper code unto the Raspberry Pi.

The [How-to-Build-it](/Looper/How-to-Build-it-circuit-schematics/) section (menu on left) of this blog lists the parts, the schematics, and how to physically build the Looper pedal.

The [Software-Installation](/Looper/Software-Installation-Raspberry-Pi-Automated/) section shows how to download the open-source Python code and how to install it on the Raspberry Pi, as well as install various modules needed for sound and bluetooth to work.  

The [How-to-Use](/Looper/How-to-Use-User-Guide/) section provides a user guide for the Looper pedal.
> When the iphone app is published - a user guide for the iphone app will also be included here. 

If you have never used a Raspberry Pi before - look under the [Raspberry Pi](/Raspberry-Pi/Installation-RPi-OS-Lite-Headless/) section for tips on installation and basic principles.  






