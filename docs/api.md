# Types

## eventData
see [event type](https://github.com/LightningWB/the-travelers-plus/blob/main/src/event%20types.ts#L136)

## eventRoom
see [room type](https://github.com/LightningWB/the-travelers-plus/blob/main/src/event%20types.ts#L50)

## storage
```ts
type storage = {
	[key: string]: number
}
```
item keys are the item id and the number is their count in the storage.

# Events in `travelers` namespace

## addCraftableItem
* id `string`
* level `number`

Adds an item to be unlocked at a given level.

## addEvent
* type `string`
* eventData `eventData`

Registers an event of a given type.

## addEventTile
* x `number`
* y `number`
* char `string`
* id? `string`
* type? `string`

Places a tile that contains an event of a given id and type.

## addGameItem
* id `string`
* item

Adds an item of a given id to the game.

## addGameItems
* data `{[key: string]: item}`

Adds items to the game.

## addItem
* id `string`
* amount `number`
* storage

Adds a certain amount of items from a storage.

## calcPlayerEvent
* player

Fired when a player needs an event screen rendered.

## calcWeight
* player

Fired when a player needs its weight recalculated.

## eventLog
* message `string`
* player

Sends an event log to a player.

## eventLogUnsafe
* message `string`
* player

Sends an event log that isn't xss safe to a player.

## generateLoot
* room `eventRoom`
* items `storage`

Fired when an event needs loot to be generated.

## getItem
* id `string`
* ptr `object`

Returns an item of a given id through ptr by applying item properties to prt.

## getMovementSpeed
* player
* out `int`

Gets a player's base movement speed. 1 by default.

## getTime
* out `int`

Gets the current game time.

## givePlayerItem
* id `string`
* amount `number`
* player

Gives a certain amount of items of a given id to a player.

## levelUpPlayer
* player

Fired when a player is supposed to level up.

## movePlayer
* player

Fired when a player is supposed to move.

## movePlayerToEvent
* player
* type `"city" | "house"`

Fired when a player is supposed to get transferred into an event.
Will generate a new event if type is provided.

## removeItem
* id `string`
* amount `number`
* storage

Removes a certain amount of items from a storage.

## renderCrafting
* player

Renders a player's crafting items.

## renderItems
* player
* addToQueue `boolean`

Renders a player's items. If addToQueue is false, then it won't send to the client.

## setTime
* out `int`

Sets the current game time.

## stopPlayerMovement
* player

Fired when a player is supposed to stop moving.

## takePlayerItem
* id `string`
* amount `number`
* player

Takes a certain amount of items of a given id from a player.

## unlockCraftingForPlayer
* player
* learningItem `string`

Adds an item to a player's bp list.