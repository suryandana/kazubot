const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
// const { fishData, bugData, gachaData } = require('./data.json');
const client = new Discord.Client();


client.once('ready', () => {
    client.user.setActivity("with myself")
    console.log("KazuBot at your service!")
	//client.channels.get("564701552414031882").send("KazuBot at your service!")
})

// client.on('presenceUpdate', (oldMember, newMember) => {
//     //console.log(newMember.displayName + " went from " + oldMember.presence.status + " to " + newMember.presence.status)
//     newMember.send("**" + newMember.displayName + "** went from _" + oldMember.presence.status + "_ to _" + newMember.presence.status + "_")
// })

client.on('message', receivedMessage => {
    //console.log(receivedMessage.content)
    if(receivedMessage.content.startsWith(`${prefix}`)){
        processCommand(receivedMessage)
    }
})

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments) // There may not be any arguments

    // if (primaryCommand == "hello") {
    //     receivedMessage.channel.send("Hello, world!")
    // } else if (primaryCommand == "help") {
    //     receivedMessage.channel.send("No, I wont!")
    // } else if (primaryCommand == "bye") {
    //     receivedMessage.channel.send("Bye!")

    if (primaryCommand == "dice") {
        dice(receivedMessage, arguments)
    } else if (primaryCommand == "card") {
        card(receivedMessage, arguments)
    } else if (primaryCommand == "yn") {
        yn(receivedMessage, arguments)
    } else if (primaryCommand == "fish") {
        fish(receivedMessage, arguments)
	} else if (primaryCommand == "bug") {
		bug(receivedMessage, arguments)
	} else if (primaryCommand == "gacha") {
		gacha(receivedMessage, arguments)
	} else if (primaryCommand == "test") {
		test(receivedMessage, arguments)
    } else {
        //receivedMessage.channel.send(fullCommand)
        receivedMessage.channel.send(`I haven't implement \`${prefix}${primaryCommand} ${arguments}\`.`)
    }
}

function test(receivedMessage, arguments){
    //let embed = new Discord.RichEmbed().setImage("https://www.smogon.com/dex/media/sprites/xy/eevee.gif")
    //receivedMessage.channel.send({files: ["https://www.smogon.com/dex/media/sprites/xy/eevee.gif"]})
    //receivedMessage.channel.send({file: "https://www.smogon.com/dex/media/sprites/xy/eevee.gif"})
    //receivedMessage.channel.send(embed)
}

function gacha(receivedMessage, arguments){
	let gacha = Math.ceil(Math.random() * 16)
	receivedMessage.channel.send("You insert a coin to a gachapon machine. The Machine has dispensed a capsule!")
	if(gacha < 2){
		receivedMessage.channel.send("You open it and received an apology letter \"Maaf, Anda kurang beruntung!\"")
	} else if(gacha < 4){
		receivedMessage.channel.send("You open it and received an apology letter \"Maaf, coba lagi, semoga beruntung!\"")
	} else if(gacha < 6){
		receivedMessage.channel.send("You open it and received an apology letter \"Maaf, zonk! Isinya kosong!\"")
	} else if(gacha < 8){
		receivedMessage.channel.send("You open it and received an apology letter \"Maaf\"")
	} else if(gacha = 9){
		receivedMessage.channel.send("You open it and received an instant noodle")
	} else if(gacha = 10){
		receivedMessage.channel.send("You open it and received an instant coffee")
	} else if(gacha = 11){
		receivedMessage.channel.send("You open it and received a sachet of creamer")
	} else if(gacha = 12){
		receivedMessage.channel.send("You open it and received a bar of chocolate")
	} else if(gacha = 13){
		receivedMessage.channel.send("You open it and received a mini wolf doll")
	} else if(gacha = 14){
		receivedMessage.channel.send("You open it and received a mini bear doll")
	} else if(gacha = 15){
		receivedMessage.channel.send("So heavy. As you open it, a light beam shines! You received a bar of plastic covered with shiny paper")
	} else if(gacha = 16){
		receivedMessage.channel.send("So heavy. As you open it, a light beam shines! You received a bar of gold")
	}
	
}

function jackpot(receivedMessage, arguments){
	
}

function dice(receivedMessage, arguments){
    let x = arguments[0]
    let results = []
    let total = 0
    let times

    if(x == null){
        x = 1;
        times = "once"
    } else if(x == 1){
        times = "once"
    } else if(x == 2){
        times = "twice"
    } else if(x <= 16){
        times = x + " times"
    } else {
        receivedMessage.channel.send("The six-sided dice will be rolled 16 times instead of " + x + " times")
        x = 16;
        times = x + " times"
    }

    for(var i = 0; i < x; i++){
        random = Math.ceil(Math.random() * 6)
        results.push(random)
        total += random
    }

    receivedMessage.channel.send("You roll six-sided dice(s) " + times + " and the result is " + results.join(", ") + " (total = " + total + ")")
}

function card(receivedMessage, arguments){
    let random = Math.ceil(Math.random() * 13)
        let symbol = Math.ceil(Math.random() * 4)
        if(random == 1){
            random = "A"
        } else if (random == 11){
            random = "J"
        } else if (random == 12){
            random = "Q"
        } else if (random == 13){
            random = "K"
        }
        if(symbol == 1){
            symbol = "♠"
        } else if (symbol == 2){
            symbol = "♥"
        } else if (symbol == 3){
            symbol = "♣"
        } else if (symbol == 4){
            symbol = "♦"
        }
        receivedMessage.channel.send("You draw a playing card and the result is " + random + symbol)
}

function fish(receivedMessage, arguments){
    let location = Math.ceil(Math.random() * 6)
    let author = "<@" + receivedMessage.author.id + ">"
    let fishName
    if(location == 1){
        location = "lake"
        fishName = Math.ceil(Math.random() * 3)
        if(fishName == 1){
            fishName = "parrot fish"
        } else if(fishName == 2){
            fishName = "tilapia fish"
        } else if(fishName == 3){
            fishName = "cat fish"
        }
    } else if(location == 2){
        location = "wetland"
        fishName = Math.ceil(Math.random() * 4)
        if(fishName == 1){
            fishName = "snakehead fish"
        } else if(fishName == 2){
            fishName = "tilepia fish"
        } else if(fishName == 3){
            fishName = "cat fish"
        } else if(fishName == 4){
            fishName = "eel"
        }
    } else if(location == 3){
        location = "swamp"
        fishName = Math.ceil(Math.random() * 3)
        if(fishName == 1){
            fishName = "snakehead fish"
        } else if(fishName == 2){
            fishName = "cat fish"
        } else if(fishName == 3){
            fishName = "eel"
        }
    } else if(location == 4){
        location = "river"
        fishName = Math.ceil(Math.random() * 3)
        if(fishName == 1){
            fishName = "parrot fish"
        } else if(fishName == 2){
            fishName = "arowana"
        } else if(fishName == 3){
            fishName = "betok"
        }
    } else if(location == 5){
        location = "sea"
        fishName = Math.ceil(Math.random() * 6)
        if(fishName == 1){
            fishName = "tuna"
        } else if(fishName == 2){
            fishName = "snapper"
        } else if(fishName == 3){
            fishName = "mackerel"
        } else if(fishName == 4){
            fishName = "sardine"
        } else if(fishName == 5){
            fishName = "skipjack"
        } else if(fishName == 6){
            fishName = "anchovy"
        }
    } else if(location == 6){
        location = "pond of a cave"
        fishName = Math.ceil(Math.random() * 2)
        if(fishName == 1){
            fishName = "dragon"
        } else if(fishName == 2){
            fishName = "rainbow fish"
        }
    }
    let caught = Math.ceil(Math.random() * 2)
    receivedMessage.channel.send(author + " threw a bait in a " + location + " and wait some seconds, then something ate your bait!")
    if(caught == 1){
        receivedMessage.channel.send(author + " pull your fishing rod and successfully caught a " + fishName + "!")
    } else if (caught == 2){
        receivedMessage.channel.send(author + " pull your fishing rod, but failed to hook it, the " + fishName + " swam free, it failed to caught!")
    }
    
}

function yn(receivedMessage, arguments){
    let random = Math.ceil(Math.random() * 2);
    if(random == 1){
        random = "Yes"
    } else if(random == 2){
        random = "No"
    }
    receivedMessage.channel.send(arguments.join(" ") + " --- _Answer_: **" + random + "**")
}

client.login(token);