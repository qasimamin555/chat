
import axios from 'axios' 



const sendingMessage = (merge,uid,message,socket) => {
    return async(dispatch)=>{
     
               console.log(socket);
             if(socket !== undefined){
                 
                   var data ={
                    merge_uid:merge,
                    cuid:uid,
                    message:message,
                             
                   }
                  await socket.emit('message_input',data)
                  await socket.on('output_message',(output)=>{
                      console.log('output',output);
                      dispatch({
                          type:"retrived_messages",
                          payload:output.messageData
                      })
                  })
             }else{
                 console.log('you have no socket connection')
             }
 
    //       var OPTION=axios.post("/sendMessage",{
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         merge_uid:merge,
    //         cuid:uid,
    //         message:message,
             
    //       })
       
    //           console.log(OPTION)
    //        await OPTION.then((messageResult)=>{
    //           if(messageResult.status === 201){
  
    //             console.log("messageResult",messageResult)  
    //     dispatch({ type:"retrived_messages",payload:messageResult.data.data})
    //             reloadChat()     
    // }else{
    //               console.log(messageResult)
    //           }
    //       })
    //        .catch((error)=>{
    //            console.log(error)
    //        })

    }
}


 
const handleChat = (friendName,merge_uid,socket) =>{
    return async (dispatch) => {
                console.log('handle chat is working')
                axios.post('/findChat',{
                    data:merge_uid
                })
                .then((findResult)=>{
                   console.log('in drawer',socket);
                  socket.emit('joinId',merge_uid);
            
                    dispatch({
                        type:'handlePage',
                        messages:findResult.data.data,
                        friendName:friendName,
                        uid:merge_uid,
                    }) 
                    console.log(findResult)
                })
                .catch((error) => {
                    console.log('sender error',error)
                })
                 
                //   console.log("data props",data.uid)
               

    }
}
const takeUid = (cuid,fuid) =>{
      if(cuid > fuid){
             var first = cuid.slice(0,12)
             var sec = fuid.slice(0,12)
             return first + sec
      }else{
        
            var first = cuid.slice(0,12)
            var sec = fuid.slice(0,12)
            return sec + first
     
       
        
      }
}



const signupUser=(user)=>{
    return async (dispatch)=>{      
        try{
                     
            const response = await fetch('/user/signup', {
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                })
            });
            
            const jsonResponse = await response.json();
            return jsonResponse
            
            
           
         }catch(error){
             console.log(error);
         }
         

       


}
    
}


const loginUser = (myData,history)=> {
    
    return (dispatch)=>{

            const OPTION ={
           url:'/login',
           method:'post',
           headers: {
            'Content-Type': 'application/json',
           
        },
        data:myData

        }
           console.log("in login ",OPTION)

          axios(OPTION)
            .then((result)=>{

           console.log("in actionn login >>",result)
            if(result.status === 201){
                   console.log("retirve_result",result)
                  var friend_data ={friendList:result.data.message.friendList}
               dispatch({
                    type:'loginData',payload:result.data.message,
                    friends:friend_data,
               })
               history.push('/chat')
                   
            }
            else{
                console.log('no working')
            }
       })
       .catch((error)=>{
             console.log('error is ',error)
       })

           history.push("/chat")
    
   }
}

const findFriend =(email,current_uid)=>{
    return async(dispatch)=>{
    
         var result =axios.post('/findFriend',{
            headers: {
                'Content-Type': 'application/json',
            },
             email:email,
             my_uid:current_uid
         }) 
              
           await result.then((retrived)=>{

               if(retrived.status===201){
                    console.log('retrived',retrived)
               
                           
                  dispatch({
                   type: "finduser",
                   data :retrived.data,
                //    createdFriend:retrived.data.createdFriend,
                //    createdData:retrived.data.createdData.messageData,
                   
                  })
   
               }
               else{
                   
               }
           })
           .catch((error)=>{
               console.log(' error is >>>',error)
           })
      
 
    }
}
const chat_screen_off = () => {
    return (dispatch) => {
        // dispatch({
        //     type:'off',payload:false
        // })
    }
}
const updateMessage =(uid)=>{
     return(dispatch)=>{
         console.log(uid)
        axios.post("/update",{
            _id:uid
        })
        .then((updateData)=>{
          if(updateData.status === 201){
            var my_data =[]
                my_data=updateData.data.data
                    console.log(my_data)
                  
           dispatch({
               type:'updating_array',my_data:my_data
           })
        }
        })
        .catch((error)=>{
            console.log(error)
        })
     }
}

const setSocket = (socket) => {
    return(dispatch) => {
        dispatch({
            type:"save-socket",payload:socket,
        })
    }
}
const logout_app= () =>{
    return(dispatch) => {
        dispatch({
            type:'logout'
        })
    }
}
  
  export {logout_app,sendingMessage, signupUser,loginUser,findFriend,handleChat,chat_screen_off,updateMessage,setSocket}