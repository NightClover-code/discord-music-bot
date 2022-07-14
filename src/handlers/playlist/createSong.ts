import { Message } from 'discord.js';
import Playlist from '../../models/Playlist';
import User from '../../models/User';

export const createSong = async (
  message: Message,
  args: string[]
): Promise<Message> => {
  const name = args[1];
  const userId = message.member?.id;

  const user = await User.findOne({ userId });
  const playlists = await Playlist.find({ name });

  try {
    if (!user)
      return message.reply(`Playlist are only available for registered users!`);

    if (playlists.length)
      return message.reply(`The playlist ${name} already exists!`);

    const playlist = await Playlist.create({
      name,
      user: user._id,
    });

    user.playlists.push(playlist);

    await playlist.save();
    await user.save();

    return message.reply(`Successfully created ${name}!`);
  } catch (err) {
    console.log(err);

    return message.reply('Something wrong happened :(');
  }
};
