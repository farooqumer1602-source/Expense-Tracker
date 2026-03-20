const Transaction = require('../model/Transactionmodel');

const getalldata = async (req,res)=>{
   try{
     const data = await Transaction.find({CreatedBy: req.user._id})
     res.json(data);
   }catch(err){
    console.log(err);
     res.json({message:message.err})
   }
};

const createdata = async (req,res)=>{
    const {title , amount , type , category , date} = req.body;
    try{
        if(!title || !amount || !type || !category || !date){
        return res.status(400).json({message:"please fill all fields"})
    }
    const data = await Transaction.create({
        title, amount , type , category , date, CreatedBy: req.user._id,
    })
    res.json(data)
    }catch(err){
        console.log(err);
     res.json({message:'Server error'})
    }
}

const deletedate = async (req,res)=>{
    try{
        const data = await Transaction.findById(req.params.id)
       if(!data){
        return res.json({message:"Not found"})
       } 
        if(data.CreatedBy.toString() !== req.user._id.toString()){
        return res.status(404).json({message:"Not authorized"})}
       await data.deleteOne();
       res.json(data)
    }catch(err){
          console.log(err);
     res.json({message:'Server error'})
    }
};

const updatedata = async (req,res)=>{
    const {title , amount , type , category , date} = req.body;
    try{
        const update = await Transaction.findByIdAndUpdate(req.params.id,  {title , amount , type , category , date} , {new:true} )
        if(!update){
            return res.json({message:"Not found"})
        }
        res.json(update)
    }catch(err){
            console.log(err);
     res.json({message:'Server error'})
    }
}

module.exports = {getalldata,createdata,deletedate,updatedata}