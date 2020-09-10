const discord = require('discord.js');
const fs = require('fs');
const functions = require('./functions.js')
const config = require('./config.json');

exports.embed = function(channel, title, colour, message) {
	var embed = new discord.MessageEmbed()
		.setTitle(title)
		.setColor(colour)
		.setDescription(message);
		
	channel.send(embed);
}
exports.embedWithFooter = function (channel, title, colour, message, footer) {
	var embed = new discord.MessageEmbed()
		.setTitle(title)
		.setColor(colour)
		.setDescription(message)
		.setFooter(footer)

	channel.send(embed);
}
exports.commandCost = function (command) {
	if(typeof command !== "undefined"){
		for (let index = 0; index < config.commandsWithCost.length; index++) {
			if(config.commandsWithCost[index].name == command) {
				return(parseInt(config.commandsWithCost[index].cost))
			}
		}
		return(0)
	}else{
		return("1");
	}
}
exports.pointManager = function (mode,Points,id,tag) {
	if(mode == "fetch"){
		try {
			var points = JSON.parse(fs.readFileSync('./points.json'))
		} catch (error) {
			return("2")
		}
		for (let index = 0; index < points.length; index++) {
			if(points[index].id == id){
				return(points[index].points)
			}else if(index == points.length - 1){
				return(0)
			}
		}
		return(0)
	}else if(mode == "take"){
		try {
			var points = JSON.parse(fs.readFileSync('./points.json'))
		} catch (error) {
			return("2")
		}
		
		if(points.length == 0){
			if(typeof tag == "string"){
				points.push({
					"tag": tag,
					"id": id,
					"points": 0
				})
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("5")
				}else{
					return("4")
				}
		}
		for (let index = 0;index < points.length; index++) {
			if(points[index].id == id){
				points[index].points = parseInt(parseInt(points[index].points) - parseInt(Points))
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("0")
			}else if(index == points.length - 1){
				if(typeof tag == "string"){
				points.push({
					"tag": tag,
					"id": id,
					"points": 0
				})
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("5")
				}else{
					return("4")
				}
			}
		}
		return("3")
	}else if(mode == "give"){
		try {
			var points = JSON.parse(fs.readFileSync('./points.json'))
		} catch (error) {
			return("2")
		}
		if(points.length == 0){
			if(typeof tag == "string"){
				points.push({
					"tag": tag,
					"id": id,
					"points": Points
				})
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("0")
				}else{
					return("4")
				}
		}
		for (let index = 0; index < points.length; index++) {
			if(points[index].id == id){
				points[index].points = parseInt(parseInt(points[index].points) + parseInt(Points))
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("0")
			}else if(index == points.length - 1){
				if(typeof tag == "string"){
					points.push({
						"tag": tag,
						"id": id,
						"points": Points
					})
					fs.writeFileSync("./points.json", JSON.stringify(points))
					return("0")
					}else{
						return("4")
					}
			}
		}
		return("3")
	}else if(mode == "set"){
		try {
			var points = JSON.parse(fs.readFileSync('./points.json'))
		} catch (error) {
			return("2")
		}
		if(points.length == 0){
			if(typeof tag == "string"){
				points.push({
					"tag": tag,
					"id": id,
					"points": Points
				})
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("0")
				}else{
					return("4")
				}
		}
		for (let index = 0; index < points.length; index++) {
			if(points[index].id == id){
				points[index].points = parseInt(Points)
				fs.writeFileSync("./points.json", JSON.stringify(points))
				return("0")
			}else if(index == points.length - 1){
				if(typeof tag == "string"){
					points.push({
						"tag": tag,
						"id": id,
						"points": Points
					})
					fs.writeFileSync("./points.json", JSON.stringify(points))
					return("0")
					}else{
						return("4")
					}
			}
		}
		return("3")
	}else{
		return("Mode not found")
	}
}
exports.itemManager = function (mode,forceGive,uses,user,item) {
	//the user has to be the id of the user
	if(mode == "fetch"){
		var Return = []
		try {
			Return.push(JSON.stringify(JSON.parse(fs.readFileSync(`./point-system/inventory/${user}.json`))))
		} catch (error) {
			Return.push("undefined")
		}
		let a = JSON.parse(fs.readFileSync(`./point-system/item.json`))
		let loopStop = false
		for (let index = 0; index < a.length; index++) {
			if(loopStop == false){
				if(a[index].name == item){
					let push = a[index]
					Return.push(push)
					loopStop == true;
				}else if (a.length > index) {
					Return.push("undefined");
				}
			}
		}
		return(Return);
	}else if (mode == "give") {
		//NOTE: I wanted to add the option that you could add the to the inventory no matter what
		//but that would be a bad idea since the inventory system  works with for loops so yeah
		let inventory
		//this is in a try so if the read failes meaning the file isn't there so
		//the file can be written in the catch
		try {
			inventory = JSON.parse(fs.readFileSync(`./point-system/inventory/${user}.json`))
			//Read finished and worked
			//for loop to figure out if the user has the item already so it can be added
			var hasItemAlready
			//this var is used later so the code knows if you have the item already
			var userItem
			for (let index = 0; index < inventory.length; index++) {
				if(inventory[index].name == item){
					hasItemAlready = true
					userItem = inventory[index]
				}
				if(index == inventory.length){
					hasItemAlready = false
				}
			}
			if(hasItemAlready){
				let a = JSON.parse(fs.readFileSync(`./point-system/item.json`))
				let loopStop
				let validItem
				for (let index = 0; index < a.length; index++) {
					if(loopStop == false){
						if(a[i].name == item){
							loopStop == true;
							validItem == true;
						}
						if (a.length = index) {
							if (loopStop == false) {
								validItem == false	
							}
						}
					}
				}
				if (validItem == "true"){
					let b = parseInt(userItem.uses) + parseInt(uses)
					userItem.uses = b.toString();
					fs.writeFileSync(`./point-system/inventory${user}.json`,JSON.stringify(inventory))
					return("0");
				}else{
					if (forceGive == "true") {
						let b = parseInt(userItem.uses) + parseInt(uses)
						userItem.uses = b.toString();
						fs.writeFileSync(`./point-system/inventory/${user}.json`,JSON.stringify(inventory))
						return("0");
					}else{
						return("Invalid item");
					}
				}
			}else{
				if (forceGive == "true") {
					inventory.push({
						"name": item,
						"uses": uses
				});
				fs.writeFileSync(`./point-system/inventory/${user}.json`,JSON.stringify(inventory))
				return("0");
				}else{
					let a = JSON.parse(fs.readFileSync(`./point-system/item.json`))
					let loopStop
					let validItem
					for (let index = 0; index < a.length; index++) {
						if(loopStop == false){
							if(a[i].name == item){
								loopStop == true;
								validItem = true;
							}
							if (a.length = index) {
								validItem = false
							}
						}
					}
					if (validItem == "true") {
						//if its a valid item it will write [{"name": "","uses": 123}]
						inventory.push({
							"name": item,
							"uses": uses
						})
						//write the file
						fs.writeFileSync(`./point-system/inventory/${user}.json`,JSON.stringify(inventory))
						//return with an exit code of 0 meaning it proceded sucesfully
						return("0");
					}else{
						return("Invalid item");
					}
				}
			}
		} catch (error) {
			fs.writeFileSync(`./point-system/inventory/${user}.json`,"[]")
			inventory = JSON.parse(fs.readFileSync(`./point-system/inventory/${user}.json`))
			if (forceGive == "true") {
				inventory.push({
					"name": item,
					"uses": uses
			});
			fs.writeFileSync(`./point-system/inventory/${user}.json`,JSON.stringify(inventory))
			return("0");
			}else{
				let a = JSON.parse(fs.readFileSync(`./point-system/item.json`))
				let loopStop
				let validItem
				var usesItem
				for (let index = 0; index < a.length; index++) {
					if(loopStop == false){
						if(a[i].name == item){
							usesItem = JSON.parse(a[i]).uses
							loopStop == true;
						}
						if (a.length = index) {
							validItem = false
						}
					}
				}
				if (validItem == "true") {
					//if its a valid item it will write [{"name": "","uses": 123}]
					inventory.push({
						"name": item,
						"uses": usesItem
					})
					//write the file
					fs.writeFileSync(`./point-system/inventory/${user}.json`,JSON.stringify(inventory))
					//return with an exit code of 0 meaning it proceded sucesfully
					return("0");
				}else{
					return("Invalid item")
				}
			}
		}
	}else if(mode == "take"){
		try {
			var inventory = JSON.parse(fs.readFileSync(`./point-system/inventory/${user}.json`))
		} catch (error) {
			return("Inventory of user not found")
		}
		let valid
		for (let index = 0; index < inventory.length; index++) {
			if (inventory[index].name == item) {
				valid = index
			}
		}
		if (typeof valid == "number") {
			if(!isNaN(uses)){
				if(uses !== 0){
					let a = parseInt(inventory[valid].uses) - parseInt(uses)
					inventory[valid].uses = a.toString();
					fs.writeFileSync(`./point-system/inventory/${user}.json`, JSON.stringify(inventory))
					return("0") 
				}else{
					inventory[valid].uses = 0
					fs.writeFileSync(`./point-system/inventory/${user}.json`, JSON.stringify(inventory))
					return("0")
				}
			}else{
				return("Uses is NaN");
			}
		}else{
			return("Item not valid");
		}
	}else{
		return("Mode not found")
	}
}
exports.pointBanned = function (id) {
	var banned = JSON.parse(fs.readFileSync('./point-system/bannedUsers.json'))
	for (let index = 0; index < banned.length; index++) {
		if (banned[index].id == id) {
			return(banned[index].banned);
		}
	}
	return(false)
}
exports.shop = function(message,prefix,args,calculateCost,item){
	var colourInfo = config.messageColours.info;
	var colourWarn = config.messageColours.warn;
	var colourGold = 0xf9ee11;
	var dbTickets = fs.readFileSync('./point-system/shop.json');
    var tableTickets = JSON.parse(dbTickets);
    var points = JSON.parse(fs.readFileSync('./points.json'))
	var items = JSON.parse(fs.readFileSync('./point-system/item.json'));
	//actions(done)
	//parameters. delay etc.(done)
	//give system(done)
	//being able to have spaces and unlimited name lenght(done)
	//having names not be case sensitvie(done)
	//categories(working on it)
	//pages for the shop(done)

	//page could work like v!shop list <page number> 
	//and if no page number is given it will display an error message
	//pages will be defined in pages.json?
	//it will look inside that and it will search that shop in a folder like shop
	//this folder will contain shops named after the pages like:
	//1, 2, etc. the file name can be anything as long as it named in in pages.js
	//now that i think about it i should stop writing this but also when no page is given it ´
	//should display all pages 
		var authorPoints;
		var cost;
		var itemShop;
		for (let i = 0; i < points.length; i++) {
			if(points[i].tag == message.author.tag){
				authorPoints = points[i];
			}
		}
		for (let i = 0; i < tableTickets.length; i++) {
			if(tableTickets[i].name.toUpperCase() == item.toUpperCase()){
				cost = tableTickets[i].cost;
				itemShop = tableTickets[i]
			}
		}
		
		if(itemShop){
			function shop(args, message, prefix){
				var author = message.author.id
				var parameter = itemShop.action_parameter;
				if(itemShop.action == "give_rank"){
					var member = message.guild.member(message.author);
					var role = message.guild.roles.cache.find(role => role.name == parameter);
					member.roles.add(role).then(() => {
						functions.embed(message.channel, "Success", colourInfo, "You bought `"+ item + "` for:`"+ cost + "` Points\nAnd you got the role `"+ parameter + "`");
					}).catch(err => {
						functions.embed(message.channel, "", colourWarn, "There was an error giving this user the role, do i have permisson? Is the role valid?");
					});
				}else if(itemShop.action == "point_up"){
					authorPoints.points=authorPoints.points+parameter;
					functions.embed(message.channel, "Success", colourInfo, "You bought `"+ item + "` for:`"+ cost + "` Points\nAnd you got `"+ parameter + "` Points!");
				}else if(itemShop.action == "give_item"){
					cost = itemShop.cost;
					item = itemShop.action_parameter
					var itemInventory;
					for (let i = 0; i < items.length; i++) {
						if(items[i].name == item){
							itemInventory = items[i];
						}
					}
					if(itemInventory){
						var authorInventory
						var inventory;
						try {
							var authorInventory = JSON.parse(fs.readFileSync(`./point-system/inventory/${author}.json`));
							for (let i = 0; i < authorInventory.length; i++) {
								if(authorInventory[i].name == parameter){
									inventory = authorInventory[i];
								}
							}
							//if the item was found in the buyers inventory it will add uses
							inventory.uses=inventory.uses + itemInventory.uses;
							fs.writeFileSync(`./point-system/inventory/${author}.json`, JSON.stringify(authorInventory));
							//i hate this
							//ive been stuck for one hour trying to solve a error
							//and the error was....
							//i... I... I WROTE THE WRONG THING
							//i wrote inventory instead of authorInventory
							//i hate this and never want to look at this section ever again
							//~Simyon#2799
							functions.embed(message.channel, "Success", colourInfo, "You bought `"+ item + "` for:`"+ cost + "` Points\nAnd the uses for the item`"+ parameter + "` are now:`\n"+ inventory.uses + "`");
						} catch (error) {
							console.log(error)
							//if the read failes this route will be taken
							//i hate this
							//this took more time then it should lol
							fs.writeFileSync(`./point-system/inventory/${author}.json`,"[]")
							authorInventory = JSON.parse(fs.readFileSync(`./point-system/inventory/${author}.json`));
							authorInventory.push({
								"name": parameter,
								"uses": itemInventory.uses
							});
							functions.embed(message.channel, "Success", colourInfo, "You bought `"+ item + "` for:`"+ cost + "` Points\nAnd you got the item`"+ parameter + "`");
							fs.writeFileSync(`./point-system/inventory/${author}.json`,JSON.stringify(authorInventory));
						}
					}else{
						functions.embed(message.channel,"Error",colourWarn,"Item not found. Please add the item to `items.json` and make sure its spelled right")
					}
				}else if(itemShop.action == "send_message"){
						if(typeof itemShop.title == "string"){
							functions.embed(message.channel,itemShop.title,colourInfo,itemShop.action_parameter)
						}else{
							functions.embed(message.channel,"",colourInfo,itemShop.action_parameter)
						}
				}else{
					functions.embed(message.channel,"Error",colourWarn,"The action is not valid, to see a list of valid actions, look at `shop.md`")
					fs.writeFileSync('./points.json',JSON.stringify(points))
				}
		}
		if(calculateCost == false || typeof calculateCost == "undefined"){
			if(typeof itemShop.max_buys == "number"){
				//gonna hate this
				//yes i hated it
				try {
					uses = JSON.parse(fs.readFileSync(`./point-system/userData/${message.author.id}.json`))
					var buys;
					for (let i = 0; i < uses.length; i++) {
						if(uses[i].name == item){
							buys = uses[i];
						}
					}
					if(buys.buys < itemShop.max_buys){
						buys.buys=buys.buys+1
						fs.writeFileSync(`./point-system/userData/${message.author.id}.json`, JSON.stringify(uses))
						if(typeof itemShop.delay == "number"){
							setTimeout(() => {
								shop(args,message,prefix);
							}, itemShop.delay);
						}else{
						shop(args,message,prefix);
						}
					}else{
						functions.embed(message.channel,"",colourWarn,"You have reached the maximum amount of buys for this item.\nYou bought this item `" + buys.buys +"`times and the maximum is `"+ itemShop.max_buys +"`");
					}
				} catch (error) {
					fs.writeFileSync(`./point-system/userData/${message.author.id}.json`,"[]");
					uses = JSON.parse(fs.readFileSync(`./point-system/userData/${message.author.id}.json`))
					uses.push({
						"name": args[2],
						"buys": 1
					});
					fs.writeFileSync(`./point-system/userData/${message.author.id}.json`,JSON.stringify(uses));
					if(typeof itemShop.delay == "number"){
						setTimeout(() => {
							shop(args,message,prefix);
						}, itemShop.delay);
					}else{
							shop(args,message,prefix);
					}
				}	
				}else{
					if(typeof itemShop.delay == "number"){
						setTimeout(() => {
							shop(args,message,prefix);
						}, itemShop.delay);
					}else{
							shop(args,message,prefix);
					}}
				fs.writeFileSync('./points.json',JSON.stringify(points))
		}else{
		if(authorPoints.points>cost){
			authorPoints.points=authorPoints.points-cost;
			if(typeof itemShop.max_buys == "number"){
			//gonna hate this
			//yes i hated it
			try {
				uses = JSON.parse(fs.readFileSync(`./point-system/userData/${message.author.id}.json`))
				var buys;
				for (let i = 0; i < uses.length; i++) {
					if(uses[i].name == item){
						buys = uses[i];
					}
				}
				if(buys.buys < itemShop.max_buys){
					buys.buys=buys.buys+1
					fs.writeFileSync(`./point-system/userData/${message.author.id}.json`, JSON.stringify(uses))
					if(typeof itemShop.delay == "number"){
						setTimeout(() => {
							shop(args,message,prefix);
						}, itemShop.delay);
					}else{
					shop(args,message,prefix);
					}
				}else{
					functions.embed(message.channel,"",colourWarn,"You have reached the maximum amount of buys for this item.\nYou bought this item `" + buys.buys +"`times and the maximum is `"+ itemShop.max_buys +"`");
				}
			} catch (error) {
				fs.writeFileSync(`./point-system/userData/${message.author.id}.json`,"[]");
				uses = JSON.parse(fs.readFileSync(`./point-system/userData/${message.author.id}.json`))
				uses.push({
					"name": args[2],
					"buys": 1
				});
				fs.writeFileSync(`./point-system/userData/${message.author.id}.json`,JSON.stringify(uses));
				if(typeof itemShop.delay == "number"){
					setTimeout(() => {
						shop(args,message,prefix);
					}, itemShop.delay);
				}else{
						shop(args,message,prefix);
				}
			}	
			}else{
				if(typeof itemShop.delay == "number"){
					setTimeout(() => {
						shop(args,message,prefix);
					}, itemShop.delay);
				}else{
					setTimeout(() => {
						shop(args,message,prefix);
					}, itemShop.delay);
				}
			}
			fs.writeFileSync('./points.json',JSON.stringify(points))
		}else{
			functions.embed(message.channel,"Not enough points",colourWarn,`You dont have enough points to buy this item\nYou have ${authorPoints.points} points\nAnd you need more than ${cost} Points`);
		}
		}
		}else{
			functions.embed(message.channel,"Item not found",colourWarn,"Item not found, do `"+ prefix+"shop list`, to list all items.")
		}
}