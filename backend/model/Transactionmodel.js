const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
},
amount:{
    type:Number,
     required:true,
},
type:{
    type:String,
     required:true,
},
category:{
    type:String,
    required:true,
},
date:{
    type:Date,
    default:Date.now,
},
 CreatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usser',
        required:true
    },
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;