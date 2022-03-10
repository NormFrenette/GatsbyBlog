---
title: How to use the Looper to make music
date: "2022-03-06T10:00:00.000Z"
description: Basic principles of how the looper works.
mainTag: How-To-Use
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

> It is not necessary to start recording at the beginning of the loop.  
> It is not necessary to record until the end of the loop.  
> You can hit record anywhere while the loop is playing, and hit stop recording anywhere before or until the end of the loop.  
> The software keeps track of where you recorded the actual music in the new track and makes sure it plays at the correct time against the rest of the loop.

Once you stop recording the overdub, the looper goes back in to Play mode, finishes the loop (if you did not go to the end while recording) - and when it goes back to the beginning of the loop, it plays all recorded tracks (including the new one) - mixing them as they play.  

#### Overdubbing and Accuracy 

##### Base Loop:

The Base loop refers to the first track you record in the loop.  It is an important concept because its length defines the *** base length*** of the loop.  

When you record a second track it has to be equal or less than the base length to make sure that the two tracks are synchronized when playing - and loop back to the beginning at the same time.

##### How to hit exactly the start and end of the loop to record an extra track (overdub)

The usual process for overdubbing is to let the loop play once, and hit "start record" when the loop goes back to the beginning - then play the music being recorded in the next track (while hearing the previous tracks) and hit "stop record" at the end of the loop.  At this point, the loop goes back to the beginning and all the previous tracks plus the newest track are played.

The problem is that it is very difficult to precisely hit the foot switch at the beginning of the loop and to stop it at the end of the loop.  To help with accuracy, the software creates "cheater zones" before and after the loop. The cheater zone is approximately 1 second long.
- If you hit "start record" anywhere in the cheater zone at the end of the loop - i.e. 1 second or less before the end of the loop, the software will wait until the loop restart before it starts recording what you are playing: this means that the recording will grab the audio you were playing exactly at the beginning of the loop
- if you hit "stop record" anywhere in the cheater zone at the beginning of the loop i.e. up to 1 second after the loop as "looped back" to the beginning, the software will discard anything that occurred after the end of the loop, making sure that your recording ends exactly when the loop ended.  

Therefore the process to record a new track that aligns perfectly with the existing loop (one or more tracks) is:
1. Start the looper playing.  It starts at the beginning of the loop.  You can play along on your instrument.
2. One second or less before the end of the loop - just before it loops back to the beginning, hit "start record".  
>You should playing or about to play - make sure your play timing right so you hit the beginning when it loops back, don't worry about what you are playing exactly at the moment when you hit the switch - it won't be recorded.
3. As soon as the loop restarts, everything you are playing is recorded.
4. Play to the end of the loop.
5. Right after the loops restarts at the beginning, hit "stop record" - within 1 second of the start of the loop. 
>The recording ends exactly at the end of the loop. Anything you might have played from time after the loop restarted (looped) and the time you hit the "stop record" is ignored.

##### But how to record a short music segment just at the end of the loop?

The "cheater zone" is only activated when the "start record" is hit within 1 second of the end of the loop.  If you want to record a short track that covers the end of the loop, make sure you hit "start record" more than 1 second before the end of the loop.  Everything you play is recorded all the way to the end of the track.

You can still use the exit cheater zone (hit "stop recording within 1 second of the loop restarting) - to make sure that your recording ends exactly at the end of the loop.

##### But how to record a short music segment just at the beginning of the loop?

Use the start cheater zone by hitting within one second of the end of the loop and play.  The recording will start exactly at the beginning.  Play the short segment, and make sure you hit stop record at least one second after the loop start point (after the loop has looped).  

##### Visual aid on loop position

Sometimes the music phrases are repetitive and it is not easy to know where the beginning and end of the loop are.  The Looper is equipped with a 7-segment diode that counts down from 9 (at the beginning) to 0 (at the end) while the loop is playing. As the count down nears 0 - you can get ready to hit "start record" - within one second of the end of the loop.

#### Extending overdub past the base loop length

Sometimes you might make a short backing track first - which becomes the base loop and the base length.  Then your next track might want to record over multiple repeats of the loop.  

For example, some people will record a drum-type pattern for one bar, (tapping on the guitar string, or even plugging in a drum machine/pads in the looper input). Then a music is recorded in a second track - say, 4 bars long.  

The Looper handles this case by simply extending the track being recorded by one base length - every time the base loop "re-loops" back to the begging.  In the example above, while the second track is recorded, the Looper will have extended the recording 3 times. This results in a track 2 that is 4 times the original base length of the loop.

Internally, the Looper will now consider track 1 as the new base length of the loop.  This means that it will play the entirety of track 2 (4 bars in our example) before looping again.  Meanwhile it will play the original track 1 as many times as needed (4 times in our example) to fill the length of the new base length (= length of track 2).

At this point, you will notice the countdown indicator counts more slowly: Whereas when you only had track 1 - it was counting from 9 to 0 during 1 bar, it now counts from 9 to zero over the entire length of the new track 2 (4 bars in our example).

At this point, you could want to record a third track that is even longer than the second track.  When you past the point in time where the track 2 loops back to its beginning, if you keep recording, the Looper will extend the track 3 by an entire base length - which means you get to record for 8 bars (or 12, 16, 20 if you keep going).   
- If you stop recording at bar 6 in our example - that is the middle of the second looping of track 2, the new base length of the loop will still be 8 bars.  
- The math of this is not important, but what it means to your ears is that your new loop base length is 8 bars:
    - track 1 (your beat track in our example) plays 8 times
    - track 2 plays twice
    - track 3 plays once (if you had stop recording at bar 6, then track 3 plays "silence" until the loop restarts at the beginning).

##### Storage of loops, deleting and un-deleting
Each track recorded in the loop is stored in the Looper's memory as separate entities.  When the Looper is playing, it mixes these tracks together to create the total loop you hear.  The Looper also takes care of playing the shorter tracks as many times as needed to match the longer tracks - as explained above.

Because each track is a separate entity - it is possible to delete tracks from the loop.  A foot switch is provided on the looper to delete the last recorded track.  Every time you hit "delete", you remove the last track.  You can actually clear the looper completely by hitting this button as many times as the number of tracks you have recorded.
>When the Looper is not playing the loop - it displays the current track count on the 7 segment display: As you delete tracks, you see the track count decrease.

When a track is deleted in the looper, it is not erased yet. The Looper marks it has "deleted" and will not play it in the loop when you hit "Play".  However, it keeps the recording available and knows its (previous) track number.  This means that it is possible to un-delete tracks.

Hitting the  un-delete foot switch always restores (un-deletes) the last deleted track.  You will see the track count display increasing.

This makes it  possible to re-record a  track in the middle of the set, while keeping the tracks that follow unchanged.  For example:

1. You record track 1 - your base loop.
2. You then overdub 3 times creating track 2,3 and 4.You loop is now playing 4 tracks in parallel.
3. You decide that you do not like track 2 - there are small mistakes - but you like track 3 and 4.
4. You hit the delete button three times:  this deletes track 4, then track 3, and finally track 2. 
5. When you hit "Play", you now only hear track 1 playing.
6. You hit "record' which creates a new track 2 - this time you play it perfectly.  The fact that you recorded a new track 2 means that the previous track 2 that had been marked  "deleted" is now gone from the looper.  (But track 3 and 4 marked "deleted" are still available.)
7. You hit the undelete button twice: this restores track 3, and then track 4 to the loop.  Your loop has again 4 tracks: the original Base Loop (track 1), the new track 2 you have just recorded,  and the original takes of track 3 and 4.  When you hit play, you hear the 4 tracks looping together.


