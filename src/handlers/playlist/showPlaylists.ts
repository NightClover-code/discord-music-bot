import { Message, MessageEmbed } from 'discord.js';
import Playlist from '../../models/Playlist';
import User from '../../models/User';

export const showcasePlaylists = async (message: Message): Promise<Message> => {
  const userId = message.member?.id;

  const user = await User.findOne({ userId });
  const playlists = await Playlist.find({ user });

  const playlistNames = playlists.map(el => el.name);

  try {
    if (!user)
      return message.reply(`Playlist are only available for registered users!`);

    const embed = new MessageEmbed()
      .setColor(message.member?.displayColor!)
      .setTitle(`${user.name}'s playlists`)
      .setDescription(playlistNames);

    return message.reply(embed);
  } catch (err) {
    return message.reply('Something went wrong :(');
  }
};
