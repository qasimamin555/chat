const  express= require('express')
 const app=express()
const  cors =require ("cors")
const  mongoose =require('mongoose')
const  bodyParser =require ('body-parser')
const {firebase} =require('./firebase/firebase')

const port= process.env.PORT || 3004

const Admin =require('./modals/schema')
const { json } = require('body-parser')
const message_schema =require("./modals/messagesModal");

const http =require('http');
const socketio = require("socket.io");
const server = http.createServer(app);

const io=socketio(server)
require('dotenv').config();

// const loginSchema=require('./modals/loginSchema')

 app.use(cors())
 app.use(function (req,res,next){
    res.header("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    )
    res.header("Access-Control-Allow-Methods",'GET,PUT,PATCH,POST,DELETE,OPTIONS')
    next();
  
  })
//  mongoose.set('useFindAndModify', false);
 app.use(bodyParser.json())
 

mongoose.connect( process.env.MongoDB_URI,{ useNewUrlParser: true,
useUnifiedTopology: true})

mongoose.connection.once('open',()=>{
    console.log('MONOGO DB is working properly')
   // addUser()
})
.on("error",()=>{
    console.log('there is a mongo Db error')
})



if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname+"/clint/build"));
 }
      
       app.get('/',(req,res)=>{
             res.send("Hello QasimAmeen")
         })

       app.get("/",(req,res)=>{
         res.send('working properly')
    
     })
     

      app.post('/user/signup',(req,res)=>{
         
        Admin.findOne({email:req.body.email})
        //   .exec()
        .then(user => {
            // console.log('data is ',user)
           if(user){
               
            return res.status(500).json({
                message: 'Email Already Exists', 
            })
          

            }
            else{

            const myData = new Admin({
            
     //    _id: new mongoose.Types.ObjectId(),

           firstName:req.body.firstName,
           lastName:req.body.lastName,
           email:req.body.email,
           password:req.body.password,
           createdAt: new Date().toISOString()
            
        })
          myData.save().then((result)=>{
           console.log(result)
           res.status(201).json({
               message:'Account Created'
           })
       }).catch((error)=>{
           console.log('some error to fetch',error)
            res.status(500).json({
              error: error
           });
         })
                   
            }
        })
          
           
        
       
     })

     
        app.post('/login',(req,res)=>{
             
            Admin.find({email:req.body.email})
             .then((result)=>{
                
                 if(result.length>0){
                    if(req.body.password === result[0].password){
            
                    res.status(201).json({
                       message:result[0],
                    })
                 }
                     else{
                           res.status(200).json({
                               message: 'Incorrect Password'
                           });
                 }
                    
            }
                       else{
                      res.status(200).json({
                            message:'Please sign up an account first'
              })
          }
             })
             .catch((error)=>{
                       res.status(200).json({
                     error:error
                 })
             })

            })
    
       app.post('/findFriend',async (req,res)=>{
      
                  await Admin.find({email:req.body.email})  
                        .then(async(result) =>{

                                   const data = result[0]
                                       
                                   const makeId=(my_id,friend_id)=>{
                                    if(my_id > friend_id){
                                        var first = my_id.slice(0,12)
                                        var sec =friend_id.toString().slice(0,12)
                                        return first + sec
                                 }else{
                                   
                                    var first = my_id.slice(0,12)
                                     var sec = friend_id.toString().slice(0,12)
                                          return sec + first
                                 }
                              }
                                var mergeId =makeId(req.body.my_uid,result[0]._id)
                                 
                                  
                                        var friendData = {
                                            friend_uid:data._id,
                                            friend_name:data.firstName,
                                            merge:mergeId
                                        } 
                                           await Admin.findByIdAndUpdate(req.body.my_uid, {
                
                                       $addToSet:{
                                           friendList:friendData  
                                   }
                                    //    $pull,$addToSet
           
                                    },{new:true}
                           
                            )
                            .then(async(docs)=>{
                                
                                var create_message = new message_schema({
                                    _id:new mongoose.Types.ObjectId(mergeId),
                                    messageData:[]
                                })
                                await create_message.save()
                                 .then(async(document)=>{
                                     console.log("document",document)
                                           await res.status(201).json({
                                       friendList:docs.friendList
                                   })

                                 })
                                 .catch(()=>{
                                     console.log('error in makeuser')
                                 })


                            
                                     
                               })
                               .catch((err)=>{console.log('err to find',err)})
                            })
          .catch((error)=>{
     
              res.status(200).json({
                  message:error.message
              })
          
            })
       }) 

            //    <<<<<<<<<<  THE END >>>>>>>>>>> 

    // app.post("/load_friends",(req,res)=>{
    //    console.log("working")
    //     // Admin.find({_id:req.body.uid})
    //     //   .then((result)=>{
    //     //       console.log(result[0].friendList)
    //     //          res.status(201).json({
    //     //             friendList:result[0].friendList
    //     //          })
    //     //   })
    // })



            
        io.on('connection',(socket)=>{
            
            console.log('connection has been established by IO');
            socket.on('joinId',(data)=>{

             console.log('id is joing the socket',JSON.stringify(data));
                 socket.join(JSON.stringify(data));
                
            })

            socket.on('leave-socket',async(data)=>{
               await socket.leave(data);
                socket.disconnect();
            })
            socket.on('message_input',(data)=>{
     
                 const submit_data ={
                    sender:data.cuid,
                    message:data.message
                 }
                 console.log("data",data)
           

                 message_schema.findByIdAndUpdate(data.merge_uid,{
                     $push:{
                        messageData:submit_data,
                     }
                     
                 },{new:true},async(err,res)=>{
                      if(err){console.log(err)}
                      else{
                          console.log("result is in json>>",JSON.stringify(res._id));
                       await io.in(JSON.stringify(res._id)).emit("output_message",res);
                    //io.sockets.in(res._id).emit('output_message',res);
                //io.broadcast.to(res._id).emit( 'output_message', res );
                      }
                                         
                       // io.broadcast.to(res._id).emit('output_message',res)
                 })
            })
      
        // const data ={
        //     sender :req.body.cuid,
        //     message :req.body.message,
        // }

        // console.log("your updating data is >>",data)
       
            
            
          
            // message_schema.findByIdAndUpdate(req.body.merge_uid,{
            //       $push:{ 
            //           messageData:data
            //         }    
                    
            //  },{new:true},
            //      (err,response)=>{
            //          if(err){
            //              console.log('this is error',err)
            //          }
            //          else{
            //         message_schema.findById(req.body.merge_uid)
            //           .then((again)=>{
            //               res.status(201).json({
            //                   data:again.messageData
            //               })
            //           })
            //           .catch((errors)=>{console.log(errors)})      
                        
                        
            //          }
            //      }
            //  )
     
    })
        
          
          app.post("/findChat",(req,res)=>{
              message_schema.findById(req.body.data,
                (err,response)=>{
                    if(err){console.log(err)}
                    else{
                        console.log("response to find",response)
                            res.status(201).json({
                                data:response.messageData   
                        })
                    }
                    
                })
          })
          app.post('/update',(req,res)=>{
              message_schema.findById(req.body._id)
              .then((dataas)=>{
                   res.status(201).json({
                       data:dataas.messageData
                   })
              })
              .catch((err)=>{console.log(err)})
          })
 
server.listen(port,()=>{
    console.log(`port is running on ${port}`)
})
