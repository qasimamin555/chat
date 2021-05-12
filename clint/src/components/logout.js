import React from 'react';
import LockIcon from '@material-ui/icons/Lock';
import {logout_app} from '../store/action/action';

import {connect}  from 'react-redux'; 
 function Logout (props){
     
     const logout =async () =>{
          await props.socket.emit('leave-socket',props.merge_uid);
  
             props.logout_app();   
     }
     return(
         <div>
               <LockIcon onClick={logout} />
         </div>
     )
 }
 const mapStateToProps = (state) =>({
     login_status:state.app.loginStatus,
     socket : state.app .socket,
     merge_uid:state.app.mergeUId
 })
 const mapDispatchToProps = (dispatch) => ({
    logout_app:()=>dispatch(logout_app())
 })
 export default connect(mapStateToProps,mapDispatchToProps)(Logout)