import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  penaltyEndDate: Date
});

const Member = mongoose.model('Member', memberSchema);

export default Member;