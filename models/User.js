import mongoose, { Schema } from 'mongoose';
mongoose.Promise = global.Promise;

const userSchema = Schema({
  user: { type: String, required: true },
  pass: {
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  character: { 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: 'Character'
  },
});

const User = mongoose.model('User', userSchema);

export default User;
