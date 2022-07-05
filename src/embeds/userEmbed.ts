import { Message, MessageEmbed } from 'discord.js';

export const userInfoEmbed = (message: Message): Promise<Message> => {
  const embed = new MessageEmbed()
    .setColor(message.member?.displayColor!)
    .addFields(
      { name: 'Your username', value: message.author.username, inline: true },
      { name: 'Your ID', value: message.author.id, inline: true }
    );

  return message.reply(embed);
};
