
  const app_Data = {
          uid:"",
          name:"",
          loginStatus:false,

          my_friends:[] ,
          chat_screen:false,
          fuid:'',
          friend_name:'',
          mergeUId:"",
          tryError:"",

          messageArray:[],
          exampleArray:[],

          socket:null,
       
  }
  export default (state=app_Data,action)=>{
        console.log("in index.js",action)
      switch(action.type){
       case "loginData":
           return({

            ...state,
            loginStatus:true,
            uid:action.payload._id,
            name:action.payload.firstName,
            my_friends:action.friends,
         
           

           })
           case "finduser":
               return({
                   ...state,
                my_friends:action.data,
          
               })

             case "handlePage":
                 return({
                        ...state,
                  friend_name:action.friendName,
                  mergeUId:action.uid,
                  messageArray:action.messages,
                  chat_screen:true,
                 }) 

                
                     case "retrived_messages":
                         return({
                             ...state,
                             messageArray:action.payload
                         })
                         case "updating_array":
                           return({
                             ...state,
                            //  messageArray:action.my_data
                           })

                           case "save-socket":
                             return({
                               ...state,
                               socket:action.payload
                             })

                    case "logout":
                      return({
                        ...state,
                        loginStatus:false
                      })

  
      }
      return state
  }