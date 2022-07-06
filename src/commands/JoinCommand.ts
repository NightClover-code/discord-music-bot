import { Message } from 'discord.js';
import { CustomClient } from '../Client';
import { possibleArgsEmbed } from '../embeds/messageEmbed';

export class JoinCommand {
  joinHelper = (
    message: Message,
    firstArg: string,
    CMD_NAME: string,
    client: CustomClient
  ): Promise<Message> | null => {
    const channel = message.member?.voice.channel;
    const guildId = message.guild?.id!;

    if (!channel) return message.channel.send('Please join a voice channel.');

    const player = client.manager.create({
      guild: guildId,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    client.musicPlayers.set(guildId, player);
    console.log(client.musicPlayers);

    switch (firstArg) {
      default:
        return possibleArgsEmbed(message, CMD_NAME as command);
    }
  };
}
