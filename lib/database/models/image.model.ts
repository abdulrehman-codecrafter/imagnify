import { models } from "mongoose";
import { model, Schema } from "mongoose";

const ImageSchema = new Schema({
  title: { type: String, required: true },
  transformationType:{type: String, required: true},
  publiId:{type: String, required: true},
  secureUrl:{type: String, required: true},
  width:{type: Number},
  height:{type: Number},
  config:{type: Object},
  tranformationUrl:{type: String},
  aspectRatio:{type: String},
  color:{type: String},
  prompt:{type: String},
  author:{type: Schema.Types.ObjectId, ref: 'User'},
},{timestamps: true});    

const Image =models?.Image || model('Image', ImageSchema);
export default Image; 