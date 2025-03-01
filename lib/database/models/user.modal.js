import { model, models, Schema } from "mongoose";


const UserSchema = new Schema({
  clerId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username:{type: String, required: true, unique: true},
  photo:{type: String, required: true},
  firstName:{type: String},
  lastName:{type: String},
  planId:{type: String, default:1},
  creditBalane:{type: Number,default:10},

},{timestamps: true});

const User = models?.User || model('User', UserSchema);

export default User;