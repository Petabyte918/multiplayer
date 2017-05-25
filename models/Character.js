import mongoose, { Schema } from 'mongoose';
mongoose.Promise = global.Promise;

const characterSchema = Schema({
  name: { type: String, required: true },
  stats: {
    HP: Number, maxHP: Number,
    level: Number, 
    strength: Number,
  },
  // user: { 
  //   type: Schema.Types.ObjectId, 
  //   required: true, 
  //   ref: 'Ingredient'
  // },
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
