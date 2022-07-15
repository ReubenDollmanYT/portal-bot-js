const Discord = require('discord.js');
const {token} = require('./config.json');
const client = new Discord.Client({presence: {status: "online", activities: [{name: "9 Servers | And the portal", type: "WATCHING"}]}, intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_BANS"]});
const channels = ["931294899083571220", "934753827956068382", "936179328826368030", "935365644004765696", "954178381421875260", "939693944651018281", "934748269991587901", "829961182752407592", "945072754879782932", "931866740613341244", "964343973806219284"]
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
    }
      if (message.content.trim().toLowerCase().includes("how to invite the bot")) 
        message.channel.send("This bot is invite only apply for acess with the form that is linked to the add bot button")
	  if (message.content.trim().toLowerCase().includes("what is this")) 
        message.channel.send("I am Portal Bot, any message sent in this servers portal channel will be sent to other servers. :warning: **There is an automod so certain messages may not send.**")
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
      if (message.content.trim().toLowerCase().includes("duckfat")) 
        message.react('<:duckfat:965156953254940712>')
    for (const channelId of channels){
      if (channelId == message.channel.id) continue;

      const channel = client.channels.cache.get(channelId); //maybe not a great idea to not check whether the channel exists...  if (channel == null)

      if(message.channel.id == "950815112015519764") {
        const embed = new Discord.MessageEmbed()
        .setTitle("Portal Bot Staff Announcement")
        .setDescription(message.content)
        .setColor('#8700ff')
        .setImage('https://i.imgur.com/G5ZNhnf.png')
        .setTimestamp()
        .setFooter({text: `Announcement`});
        await channel.send({embeds: [embed]}).catch(()=>{})
      } else if (message.channel.id == "931866740613341244") {
          return
      } else  if (message.content.trim() == "=") { message.react('❎')
 return                                                                                                                     
   }else if(hasInvite) {
        // do something else
        message.delete().then(() =>  message.channel.send("You tried to send a invite this is not allowed and the message will not be sent"))
      } else{
        const embed = new Discord.MessageEmbed()
        .setTitle("New Message")
        .setDescription(message.content)
        .setColor(message.member.displayHexColor)
        .setImage(message.attachments.first()?.url)
        .setTimestamp()
        .setAuthor({name: message.member.displayName , iconURL: message.author.avatarURL()})
        .setFooter({text: `Message from: ${message.guild.name}`, iconURL: message.guild.iconURL()});
        await channel.send({embeds: [embed]}).catch(()=>{})
          }
      }
    }
});
client.login(token);