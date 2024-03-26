// @ts-ignore
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, {
  timestamps: true 
});

const User = mongoose.model('User', UserSchema);

export default User;
