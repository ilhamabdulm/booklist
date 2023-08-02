import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
  authors: {
    type: Array,
  },
  averageRating: {
    type: Number,
  },
  id: {
    type: String,
  },
});

export default mongoose.models.Favorite ||
  mongoose.model('Favorite', FavoriteSchema);
