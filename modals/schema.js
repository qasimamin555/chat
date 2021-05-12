const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = new schema({
    //   _id: mongoose.Schema.Types.ObjectId,
       firstName: String,
       lastName: String,
    email: { 
        type: String, 
        unique: true,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
      friendList:[],
      createdAt: Date
});

  const Admin= mongoose.model('admin', adminSchema);
    module.exports=Admin




    