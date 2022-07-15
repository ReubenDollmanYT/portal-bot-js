const Discord = require('discord.js');
const logChannelId = "931866921266216984";
const {token} = require('./config.json');
const client = new Discord.Client({presence: {status: "online", activities: [{name: "8 Servers | And the portal", type: "WATCHING"}]}, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"]});
const channels = ["931294899083571220", "934753827956068382", "934748269991587901", "829961182752407592", "945072754879782932", "954178381421875260", "935365644004765696", "993979205622697994"]
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (message.type != "DEFAULT" && message.type != "REPLY")  return;
  const hasInvite = /discord\.?gg ?\/ ?[A-Za-z0-9]+/.test(message.content);
  if (channels.indexOf(message.channel.id) != -1 || message.channel.id == "950815112015519764") {
   var banned = false;
for(var channelId of channels) { // Go over every channel, if any return true, stop going over channels
  if (channelId != message.channel.id) {
    const channel = client.channels.cache.get(channelId);
    if(channel != null) { // if channel exists
  
            if((await channel.guild.bans.fetch(message.author.id).catch(()=>{})) != null) { // return true if has ban, else false
        banned = true;
        break;
      }
    }
  }
}
    if(banned) {
        message.delete().then(() =>  message.channel.send("You are banned from a server in the portal this message will not be sent"))
        return
      // banned from one of the servers, do something here
    } //Start of auto reply list
      if (message.content.trim().toLowerCase().includes("how to invite the bot")) 
        message.channel.send("This bot is invite only apply for acess with the form that is linked to the add bot button")
	  if (message.content.trim().toLowerCase().includes("what is this")) 
        message.channel.send("I am Portal Bot, any message sent in this servers portal channel will be sent to other servers. :warning: **There is an automod so certain messages may not send.** - This is a automated message")
      if (message.content.trim().toLowerCase().includes("bjcfos")) 
        message.channel.send("Bless You")
      if (message.content.trim().toLowerCase().includes("bean")) 
        message.react('<a:bean:965154603555487806>')
      if (message.content.trim().toLowerCase().includes("reuben")) 
        message.react('<:reuben:965155501698592859>')
      if (message.content.trim().toLowerCase().includes("strife")) 
        message.react('<:strife:965155450590986300>')
      if (message.content.trim().toLowerCase().includes("book")) 
        message.react('<a:book:965156926939865100>')
 // end of autoreply list
    for (const channelId of channels){
      if (channelId == message.channel.id) continue;

      const channel = client.channels.cache.get(channelId);
      if(channel == null) {
          const logChannel = client.channels.cache.get(logChannelId)
          if(logChannel != null) {
              logChannel.send("Channel "+channelId+" was not found")
          }
          continue;
      }

        if(message.channel.id == "950815112015519764") { //if msg from this channel anounce it
        const embed = new Discord.MessageEmbed()
        .setTitle("Portal Bot Staff Announcement")
        .setDescription(message.content)
        .setColor('#8700ff')
        .setImage('https://i.imgur.com/G5ZNhnf.png')
        .setTimestamp()
        .setFooter({text: `Announcement`});
        await channel.send({embeds: [embed]}).catch(()=>{
          const logChannel = client.channels.cache.get(logChannelId)
          if(logChannel != null) {
              logChannel.send("Failed to send message to "+channelId)
          }
        })
      } else if (message.channel.id == "931866740613341244") { //if msg from this channel ignore it
          return
      }  else if (message.member.id == "781305692371157034") { //if user = Reuben use this embed
        const embed = new Discord.MessageEmbed()
        .setTitle("New Message")
        .setDescription(message.content)
        .setColor('#00FF8E')
        .setImage(message.attachments.first()?.url)
        .setTimestamp()
        .setAuthor({name: "Reuben ⚒ |  Bot Owner" , iconURL: message.author.avatarURL()})
        .setFooter({text: `Message from: ${message.guild.name}`, iconURL: message.guild.iconURL()});
        await channel.send({embeds: [embed]}).catch(()=>{
          const logChannel = client.channels.cache.get(logChannelId)
          if(logChannel != null) {
              logChannel.send("Failed to send message to "+channelId)
          }
})
      }else if (message.member.id == "957289026195435520") { //if user = strife use this embed
        const embed = new Discord.MessageEmbed()
        .setTitle("New Message")
        .setDescription(message.content)
        .setColor('#3ADBFF')
        .setImage(message.attachments.first()?.url)
        .setTimestamp()
        .setAuthor({name: "Strife ☠" , iconURL: message.author.avatarURL()})
        .setFooter({text: `Message from: ${message.guild.name}`, iconURL: message.guild.iconURL()});
        await channel.send({embeds: [embed]}).catch(()=>{
          const logChannel = client.channels.cache.get(logChannelId)
          if(logChannel != null) {
              logChannel.send("Failed to send message to "+channelId)
          }
})
      }else if(hasInvite) {
        message.delete().then(() =>  message.channel.send("You tried to send a invite this is not allowed and the message will not be sent"))
      } else{
        const embed = new Discord.MessageEmbed() //Start sending the embed
        .setTitle("New Message")
        .setDescription(message.content)
        .setColor(message.member.displayHexColor)
       //.setColor('#5865f2')
        .setImage(message.attachments.first()?.url)
        .setTimestamp()
        .setAuthor({name: message.member.displayName , iconURL: message.author.avatarURL()})
        .setFooter({text: `Message from: ${message.guild.name}`, iconURL: message.guild.iconURL()});
        await channel.send({embeds: [embed]}).catch(()=>{
          const logChannel = client.channels.cache.get(logChannelId)
          if(logChannel != null) {
              logChannel.send("Failed to send message to "+channelId)
          }
})
          }
      }
    }
});
client.login(token);