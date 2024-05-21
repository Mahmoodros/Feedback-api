import mongoose, { connect } from "mongoose";
const { Schema, model } = mongoose;
// Define MongoDB schemas
// userdb.js
const userSchema = new Schema({
  username: { type: String },
  squadDetails: [{
    squadName: { type: String, required: true },
    onsiteSquadLead: { type: String, required: true },
    offshoreSquadLead: { type: String, required: true },
    scrumMaster:{type:String,required:true}
  }], 
});
 
export const User = model("User", userSchema); 