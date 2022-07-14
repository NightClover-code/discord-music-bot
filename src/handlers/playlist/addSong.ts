import { Message } from 'discord.js';
import Playlist from '../../models/Playlist';
import User from '../../models/User';

export const addSong = async (
  message: Message,
  args: string[]
): Promise<Message> => {
  const name = args[1];
  const userId = message.member?.id;

  const user = await User.findOne({ userId });
  const [playlist] = await Playlist.find({ name });

  try {
    if (args.length < 3)
      return message.reply('Please enter songs separated by a comma!');

    if (!user)
      return message.reply(`Playlist are only available for registered users!`);

    if (!playlist)
      return message.reply(`We couldn't find the playlist ${name}!`);

    if (!user._id.equals(playlist.user as any))
      return message.reply(
        `This playlist is not yours! You can only listen to it.`
      );

    const songs: string[] = args
      .filter((el, i) => i > 1)
      .join(' ')
      .split(',')
      .map(el => el.trim())
      .filter(el => el.length > 0);

    const filteredSongs = songs.filter((el, i) => songs.indexOf(el) === i);

    playlist.songs.push(...filteredSongs);

    await playlist.save();
    await user.save();

    return message.reply(`Successfully added songs to ${name}!`);
  } catch (err) {
    return message.reply('Something wrong happened :(');
  }
};
