const { Schema, model } = require('mongoose');
const Thought = require('./Thought');

const userSchema = new Schema(
  {
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }]
    
   },
   {
    toJSON: { virtuals: true },
    id: false

   }
);  
userSchema
   .virtual('friendCount')
   .get(function () { 
      return this.friends.length;

   });
      

const User = model('user', userSchema);

module.exports = User;


