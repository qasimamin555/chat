import React,{useEffect} from 'react';
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { STATES } from 'mongoose';
import CloseIcon from '@material-ui/icons/Close';
import Avatar from '@material-ui/core/Avatar'
import Input from '@material-ui/core/Input'
import ChatIcon from '@material-ui/icons/Chat';
import { lightGreen } from '@material-ui/core/colors';
import Error from '../pages/error' 
import {findFriend , handleChat , chat_screen_off , setSocket} from '../store/action/action'
import io from 'socket.io-client';


 function MenuPopupState(props) {
   
   React.useEffect(async()=>{
      props.setSocket(io());
      console.log("useEffect is calling");
     
   },[])

    

    const [arr,setArr]=React.useState([
      "qasim","ameen"
    ])
    const [add,setAdd]=React.useState(false)
    const [email,setEmail] = React.useState("")
    const [message ,setMessage] =React.useState('')
     
   
      const setError=(bug)=>{
          setMessage(bug)
      }
      const findUser=()=>{
       
          if(email===""){
             setError('Enter Email')
          }
          const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(email)){
             setError('Invalid Email Address'); return;
        }
        else{ 
           
          props.findFriend(email,props.current_uid)
          // setEmail({
          //   email:''
          // })
        }
         

      }
    
    

  return (
    <PopupState  variant="popover" popupId="demo-popup-menu" >
      {(popupState) => (
        <React.Fragment>

          <ChatIcon {...bindTrigger(popupState)} />
          
          <Menu {...bindMenu(popupState)} style={{height:700,overflow:'hidden'}}>
          
              {/* {props.chat_screen ?
                  popupState.close():
                console.log('its working')  
            } */}
     
          <div style={{display:'inline-block',outline:'none',position:'sticky'}}>
                          <div style={{
                     right:'20px',
                     position:'fixed',
                     textAlign:'left'
            

          }}>
                   <CloseIcon onClick={popupState.close}
                    style={{borderRadius:50,
                   border:'1px solid black',
                   
                     }} />
         
                 </div>
                 <br />
                <hr />
               

                
              <div style={{height:100,width:600}}>
                
                  <h4>Chat users</h4>
                  <span style={{alignItems:'center',textAlign:'center',alignContent:'center',}}>
                  <Input
                   type="search"
                    placeholder="search users" 
                    style={{
                        textAlign:'center',
                        backgroundColor:'lightgray',
                        height:40,
                        width:250,
                        marginLeft:20,
                        borderRadius:5
                    
                    }}
                    />
                    </span>
              </div>
              </div>


              <hr />
              
            
           <MenuItem 
                onClick={()=>setAdd(true)}
                style={{
                height:70,
                background:'lightgray',
                textAlign:'center',
                justifyContent:'center',
                color:'green',
                
            }}>
                <h3>Add user</h3>
                </MenuItem>
                
                <hr />
                { add ?
                 <div>
                   <CloseIcon onClick={()=>setAdd(false)}
                    style={{borderRadius:50,
                   border:'1px solid black',
                    marginLeft:290
                     }} />

                     <br />
                     <br />
                <div style={{
                  height:250,
                
                  textAlign:'center',
                  justifyContent:'center'
                  
                }}>
                  <input 
                  onChange= {(e)=>setEmail(e.target.value)}
                    value={email} 
                  style={{
                   
                     height:40,
                     fontSize:20,
                     outline:'none'
                   }}
                  type ="search"

                  placeholder= "qasim@gmail.com"
                  />
                  <br />
                  {message === ""?null: <Error>
                      {message}
                 </Error>
}
                  <br />
                   <button 
                     style={{
                      height:40,
                      fontSize:17,
                      width:100
                    }}
                    onClick={()=>findUser()}

                   >Add</button>
                </div>

                </div>:
                <div style={{height:250,overflow:'scroll'}}>
             {
               props.my_friends.friendList.map((value,index)=>{
             return <div key={index} style={{overflow:'scroll'}} onClick={popupState.close}>
                    <MenuItem 
             onClick={()=>props.handleChat(value.friend_name,value.merge,props.socket)}
                    >
            <Avatar alt={value.friend_name} src="/static/images/avatar/1.jpg" />
               <span style={{marginLeft:14}}> 
               <h4 style={{ textTransform: 'uppercase'}}
               >{value.friend_name}</h4>
         </span>
            </MenuItem>
              <hr />
                </div>
              
         })
       
  }
  </div>
  }

            
            {/* <MenuItem onClick={popupState.close}>Death</MenuItem> */}
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

  const mapDispatchToProps = (dispatch) => ({
    findFriend:(email,current_uid)=>dispatch(findFriend(email,current_uid)),
    
     handleChat:(friend_name,merge_uid,socket)=>dispatch(handleChat(friend_name,merge_uid,socket)),
    chat_screen_off:()=>dispatch(chat_screen_off()),
  
    setSocket:(socket)=>dispatch(setSocket(socket))
  })

  const mapStateToProps = (state) => ({
    current_uid:state.app.uid,
    my_friends:state.app.my_friends ,
    chat_screen:state.app.chat_screen, 
    socket:state.app.socket,
  })

export default connect (mapStateToProps,mapDispatchToProps)(MenuPopupState)