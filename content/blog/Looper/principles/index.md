---
title: How to use the Looper to make music
date: "2022-03-06T10:00:00.000Z"
description: Basic principles of how the looper works.
mainTag: User-Guide
---
#### About
This guide explains the basic principles of how the Looper works to record and play music.  It covers what the looper does, how to record loops of various length, how to overdub, how to delete and un-delete tracks.

#### Basic principles
The Looper records music, and plays it back continuously  - as a loop. Connect an instrument to the looper (such as a guitar or a microphone). Hit a foot switch to start recording while you play a short music segment. Hit the foot switch again to stop recording. At this moment, the Looper starts to play the  recorded segment over and over again, until you stop it. It is possible to keep recording new music segments over the previous ones - while the Looper is "looping" - this is called overdubbing.  With enough practice, you can be the whole band!.

##### Definitions:

The music segment you record in one pass (between Start and Stop presses of the foot switch) is called a ***track***.

You can record multiple ***tracks*** which are usually identified as track 1, track 2 etc.

The ***loop*** contains all the tracks mixed together (like with a mixer - but done in software). The ***loop*** plays over and over until stopped. 

The first ***track*** recorded is  called the ***base track*** or the ***base loop*** (interchangeably).  

The ***length*** of the ***base loop** is equal to the duration (in seconds) between time where the "start recording" foot switch was pressed and the time the "stop recording" foot switch was pressed to create the first ***track***.
> This base loop length influences the length of all  tracks that will be recorded after discussed later in this article.

#### Overdubbing

It is possible to record a new track on top of the first track - thus combining song parts (or different instruments if you change between loops).  This is called ***overdubbing***.  

1. You start the looper playing the loop (which is the first track in this case): you are hearing what you have previously recorded. 
2. While the loop is playing, you can play your instrument - and you will hear what you are playing mixed in with the previously recorded loop.   So you can practice a few times (as it loops) to get it "just right".
3. When you are ready, you hit the record foot switch and now everything you play while hearing the first loop playing , is recorded in a separate second track.
4. When you stop recording, the loop now has two tracks stored in the looper, and you will hear these two tracks mixed together into the loop.  You can now go back up to step 1, to record a third loop, and so on - until you have built a song!

- It is not necessary to start recording at the beginning of the loop.
- It is not necessary to record until the end of the loop.  
- you can hit record anywhere while the loop is playing, and hit stop recording anywhere before or until the end of the loop.  
- The software keeps track of where you recorded the actual music in the new track and makes sure it plays at the correct time against the rest of the loop.

Once you stop recording the overdub, the looper goes back in to Play mode, finishes the loop (if you did not go to the end while recording) - and when it goes back to the beginning of the loop, it plays all recorded tracks (including the new one) - mixing them as they play.  

##### Base Loop
The Base Loop is simply the first loop you record. It provides the base for all the loops you will overdub over it.  It has a time length (which looper code counts in terms of the number of digital samples) - which is used to align every loop with each other.  If a overdubbed segment is shorter than the base loop (because you hit record after the beggining and/or stop before the end of the base loop), the segment is padded with zeroes before and after the recorded potion, so that the overdub loop is equal to the original Base Loop in length.

##### Overdubing longer segments
If you want to record an overdubbed segment that is longer than the base loop, the looper will keep recording the segment, and simply start playing the base loop (and any previously overdubbed loops) again while you continue playing.  When you finally hit stop recording, the Looper code takes this recorded segment and alignes it with a loop that is exactly twice the length of the base loop: in fact, if you keep playing past the third repetition, this new loop will be three times the length of the base loop - and so on.
>This means that while you are recording a segment, if you go past the length of the base loop, and the base loop starts playing again, you will not hear the begining of you current segment again. Your current segment will form one long loop, while the Base Loop and any previously recorded overdubbed loops will keep looping being what you play.

##### Storage of loops, deleting and un-deleting
Each recording, whether the Base Loop, or a number of later overdubs, are stored in the Looper as a separate file - which we call a ***track*** for the purpose of editing.  When the Looper is playing, it loads these individual tracks in memory and mixes them  together to render the total song loop you hear.  

Because each loop/track is separate - it is possible to delete tracks from the song.  A button is provided to delete the latest recorded track.  When a track is deleted in the looper, it is not removed yet. It is simply "marked" deleted.  This means that the track can be un-deleted, with the press of a button.

The delete button  always delete the last track recorded.  The un-delete button always re-instates the last deleted track.  It is therefore possible to re-recorda track in the middle of the pack, while keeping the tracks that follow.  For example:

1. You record a base loop - this is track 1.
2. You then overdub 3 times over this, creating track 2,3 and 4, to complete your song.  You now have 4 tracks in your song recorded in the looper.
3. You decide that you do not like track 2 - there are small mistakes - but you like track 3 and 4.
4. You hit the delete button three times:  this deletes track 4, then track 3, and finally track 2.  
5. When hit Play, you now only hear you base loop (track 1 playing).
6. You record track 2 again - this time perfectly with no mistakes.  The fact that you re-recorded track 2 means that the old track 2 is now gone from the looper.  (But track 3 and 4 marked as deleted are still there)
7. You click the undelete button twice: this undeletes track 3, and then track 4.  You looper now has the 4 tracks of you song: the orginal Base Loop (track 1) and the orginal takes of track 3 and 4, as well as the better take of the re-record track 2. Whenyou hit play, you hear the 4 tracks looping together.


