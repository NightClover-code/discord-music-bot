import { Message, MessageEmbed } from 'discord.js';

export const serverNameEmbed = (message: Message): Promise<Message> => {
  const embed = new MessageEmbed()
    .setColor(message.member?.displayColor!)
    .setTitle('Server name')
    .setDescription(message.guild?.name);

  return message.reply(embed);
};

export const serverMembersEmbed = (message: Message): Promise<Message> => {
  const members = message.guild?.members.cache
    .map(member => member.user.username)
    .map(member => `- ${member}`);

  const embed = new MessageEmbed()
    .setColor(message.member?.displayColor!)
    .setTitle('Server members')
    .setDescription(members);

  return message.reply(embed);
};
