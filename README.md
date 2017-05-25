# "MultiPlayer!"

## About
This is an under-development multiplayer game project. I started this on a whim and currently I make no commitment to complete it on my own. Feel free to fork or borrow this, if you'd like to take the project in your own direction.

If you'd like to contribute, I'm open to some ideas. (In fact, if you have some good ideas pertaining to code organization and the like, it is probably best to say something before I head in a different direction :) )

This is my first attempt at this type of project and I realize that I will make many, many, MANY mistakes. I know that others who have gone before me have some valuable insights. 

This *is* just for fun - but I wouldn't mind making it the best for fun project it can be, so please jump in and say something if you feel you have something constructive to contribute.

## Live Broadcasting

From time to time, I'm going to broadcast the development on my (brand spankin' new) [Twitch Channel](http://www.twitch.tv/jamesgmarks) in the hopes that as the game begins to become playable, I'll have a few people hanging around who are interested in testing it with me.



## Concept???
As of the time of this writing, the project is less than 24 hours old, so there isn't much to offer yet... Like I said, I originally had no idea what type of game this would become.

The project began as a completely unformed idea, including only a vague idea that it would be a node based game server which would support multi-player interaction from a web-based client.

### Some Initial Ideas...
As of today, I've begun forming a slightly more tangible idea of what the end result might look like.

#### 1. *General gameplay*
I'm seeing a series of large 2D maps with the ability to port between them. In some ways this will be reminiscent of some old 8 and 16 bit rpg-adventure games, but there will be several elements that do not borrow directly from that genre.

Players will be able to work cooperatively or competitively. (I'm imagining that PvP play would be togglable; either as a personal preference or as a server-instance setting.)

#### 2. *Controls*

Initially, I figured directional controls would be handled by moving using the arrow keys and/or WASD, and various actions would be triggered using the mouse to click. This would also include a hotbar for keyboard based skill triggers.

After thinking on it, I think I'd like to use the mouse for pointing and moving. The left click will be a "hold to move" button, while the right button can be used for interacting with NPCs and other interactable game elements.

I will continue to support wasd, but they'll be used a little differently. Instead of moving north, south, east and west, they can be used for moving forward and backward toward the mouse cursor as well as possibly having an interesting arc-strafe effect. This seems like it has the potential to either be incredibly fun, or incredibly annoying. Time will tell.

For now, I'll be assigning specific skill/spell actions to specific numeric keyboard buttons, but eventually I would like to make it configurable by the player.

#### 3. *Classes* ?
For now, I am not going to make a class based system, though I'm not eliminating the idea. That said, characters will ideally still be customizable. 

After a few levels, most players should find that their character is different enough from other characters to allow for role-based teams. 

For example, one player may have acquired a heal skill and another might have acquired a defensive skill, while still another might have acquired a detection skill (detection is completely off the cuff, but who knows).

#### 4b. *General Enemy Ideas*
The server will spawn creatures/monsters and treasures on the maps - likely the rates and locations will be tweakable using a map setting as well as by spawner sub-programs within the map.

For now I will focus on larger world interactions, so combat will mostly be limited to small creatures and other players.

#### 4b. *Dungeon Monsters*
Eventually, I would like to spawn some boss monsters and "elite" monsters with more complex AI that players are not capable of defeating on their own (making team play necessary to success). However, I expect that since this will require that code be specially written for each of these mobs, it will not be a very widespread thing at first. Perhaps these can begin with "dumb" creature AI, but have much higher stats, just so we have something to look at, and we can add more interesting AI later.

