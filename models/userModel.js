const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A User must have a name'],
    trim: true,
    maxlength: [80, 'Name should be less than 80 chars long']
  },
  email: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'A User must have a password']
  },
  partnerEmail: {
    type: String,
    required: [true, 'A User must have an email'],
    unique: true,
    trim: true
  },
  phone: {
    type: String
  },
  devicetoken: {
    type: String
  },
  deviceType: {
    type: String , 
    enum: [1,2] // 1..for android , 2 for ios
  },
  dob: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: { type: Date },  
  isDeleted: {  type: Boolean, default:false }, 
  isBreaked: { type: Boolean, default:false },  
  isHeart: { type: Number }, 
  isKiss: { type: Number },
  status: {
    type: Number , enum: [0,1,2],
    default: 2
  }, //0 not in pair, 1 user is in pair, 2 user is waiting for conformation from his partner

});
    
const Tour = mongoose.model('User', userSchema);

module.exports = Tour;