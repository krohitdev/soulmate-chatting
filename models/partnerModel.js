const mongoose = require('mongoose');
const { Schema } = mongoose;

const partnerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    trim: true
  },
  phone: {
    type: String
  },
  invitedStatus: {
    type: Number,
    enum: [0,1,2], // Invitation pending , rejected , accepted
    default: 0
  },
  invitedByUser:{
    type: Schema.Types.ObjectId,
    ref: 'User'

  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: { type: Date },  
  isDeleted: {  type: Boolean, default:false }

});
    
const Partner = mongoose.model('Partner', partnerSchema);

module.exports = Partner;