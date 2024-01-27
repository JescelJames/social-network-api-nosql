const { Schema, model } = require('mongoose');


const thoughtSchema = new Schema(
  {
    thoughtText: { type: String },
    createdAt: { type: Date, default: Date.now },
    username: [{ }]
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;