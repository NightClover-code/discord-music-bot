import mongoose, { Schema } from 'mongoose';
import { Playlist } from '../interfaces';

const PlaylistSchema = new Schema<Playlist>({
  user: {
    required: false,
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  name: {
    default: '',
    required: true,
    type: String,
  },
  songs: {
    default: [],
    required: true,
    type: [String],
  },
});

export default mongoose.model('Playlist', PlaylistSchema);
