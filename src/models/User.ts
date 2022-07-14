import mongoose, { Schema } from 'mongoose';
import { User } from '../interfaces';

const UserSchema = new Schema<User>({
  name: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  },
  playlists: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: 'Playlist',
      },
    ],
    required: false,
    default: [],
  },
});

export default mongoose.model('User', UserSchema);
