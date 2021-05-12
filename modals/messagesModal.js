const mongoose = require('mongoose');
const schema = mongoose.Schema;

  const Message = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
       messageData:[] ,
          //sender:String,
        //  merge:String,
        // messages:[],
       
      //sender_id:String
  })


  const message_schema=mongoose.model('messages', Message);
  module.exports=message_schema