import { Message } from 'discord.js';
import User from '../../models/User';

export const registerUser = async (message: Message): Promise<Message> => {
  const userId = message.member?.id;
  const name = message.member?.displayName;

  const users = await User.find({ userId });

  try {
    if (users.length) return message.reply(`You have already registered!`);

    const user = await User.create({
      name,
      userId,
    });

    await user.save();

    return message.reply('Successfully registered!');
  } catch (err) {
    return message.reply('Something wrong happened :(');
  }
};
