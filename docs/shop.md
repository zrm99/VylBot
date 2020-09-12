###### Shop system

This document will explain the shop system for you.
*Note: This document is not final, many changes will ocure and your setup may become old and wont work anymore.*

## Shop structure

The shop itself is simple.

[
    {"name": "Pointup", "cost": 100, "action": "point_up", "action_parameter": 1},
    {"name": "Gucci rank","cost": 1000, "action": "give_rank", "action_parameter": "Gucci"}
]

This is an example on how your shop could look like.

A new "shelf" is declared by *{}*, in this "shelf" you can declare the Item for this shelf. The First Variable is the *name*,
this declares the name for the item. Next up you need to declare the cost of the item in points. The next Vaariable is the most importend as it declares the action that will be executed when the item is bought, we will come to this later. The "action_parameter" will give the value for the action.

## Actions

The *action* parameter is the most importend one as it tells the shop what to do when the item is bought.
So lets take a look at what actions are valid:

-give_rank
    This will give the user a rank declared by the value. For example:
    "action": "give_rank", "action_parameter": "Muted"
    This would give the buyer the Role Muted, if the user already has the role it will do *nothing*
-point_up
    This will give the user the specifed amount of points. Example:
    "action": "point_up", "action_parameter": 1
    This would give the user, when bought, one point.
-give_item
    This will give the specified item. Example:
    "action": "give_item", "action_parameter": "Gucci banana"
    This would give the buyer the item, Gucci banana.
-send_message
    This will send a message to the channel the item was bought in. Example:
    "action": "send_message", "action_parameter": "Test Message"
    This would send the message: Test Message, in an embed. If you want to have a title for the embed have another parameter called "title" and have the value be the title.

## Optional parameters

If you want to spruce your shop up a bit, you can by adding additonal parameters. If you decide to use extra parameters make sure you use them right.

-description
    This will add a description to the item. Just make sure its not too long and use *\n* to add a linebreak. Example:
    "description": "Buy this item to mute yourself."
    This would show in the item description.
-max_buys
    This will declare the maximum amount of times that you can buy this item.
    "max_buys": 1
    This would limit the amount of times this item can be bought to 1(per user)
-delay
    This will delay the action by the specified amount. *Note: You should not use this*
    "delay": 5000
    This would execute the action 5 seconds later.

#### Inventory structure

If you, for whatever reason, wanted to edit the inventory for players, you will need to know how it works.
So... Every inventory is in the *inventory* file, these files have the discord ID of the user as it's file name.

Example inventory:

[
    {"name": "Gucci banana","uses": 1}
]

The first parameter is used for the name and for indexing. The next parameter is used for uses, once the *uses* parameter has reached zero, it will not show up anymore but it will still exists in the file.

Parameter:

Soon...

#### Item structure

This will show you how to make an item.

Example item.json:

This will be a short and simple example for the item.json file

[
    {"name":"Gucci banana","uses":1,"action":"point_up","action_parameter":100}
]

The First Parameter is the name, this is used for indexing and for the name. The next parameter declares how often the item can used. The next parameter declares the action and the next parameter declares the action input.

## Parameters

-uses
    This will determine the amount of times this item can be used.
-action
    This will determine what will hapen when the item is used.
-action_parameter
    This is the input for the action.
## Actions

-point_up
    This will add a certain amount of points to the user.
-give_role
    This will give a role to the user.
-send_message
    This will send a message, in the channel the shop command has been executed.