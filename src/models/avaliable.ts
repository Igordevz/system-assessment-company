import { Schema, model } from "mongoose";

 export interface Iavaliable extends Document {
   company: [
      history: [],
      range: [],
      pergunta: string,
   ],
   nameWork: string,
 }

 export const NewSchema = new Schema<Iavaliable>({
    company: {type: []},
    nameWork: {type: String}
 })

 export const Model = model<Iavaliable>("chart", NewSchema)