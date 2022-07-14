import { ObjectId } from 'mongoose';

export interface Playlist {
  user: ObjectId;
  name: string;
  songs: string[];
}

export interface User {
  userId: string;
  name: string;
  playlists: Playlist[];
}
