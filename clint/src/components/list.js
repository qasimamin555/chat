import React,{useEffect} from 'react';
import Badge from 'react-bootstrap/Badge'
import clsx from 'clsx';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import InputBase from "@material-ui/core/InputBase"
// import DirectionsIcon from "@material-ui/icons/DirectionsIcon"
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import SendIcon from '@material-ui/icons/Send';
import Chip from '@material-ui/core/Chip';
// import MenuIcon from '@material-ui/icons/Menu';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// import NotificationsIcon from '@material-ui/icons/Notifications';
  import { mainListItems, secondaryListItems } from './listItems';
// import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
// import Chart from './chart';
import Deposits from './deposits';
import Orders from './orders';
import Avatar from '@material-ui/core/Avatar'
import Error from "../pages/error"
//  import MenuPopupState from './mobileDrawer'
//import MydModalWithGrid from './mobileDrawer'
    //   ICONS
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
// import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
// import { blue } from '@material-ui/core/colors';
// import { Area } from 'recharts';
import {connect} from 'react-redux'
import { STATES } from 'mongoose';
import {sendingMessage,updateMessage} from "../store/action/action"
import { Redirect } from 'react-router';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';





function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
    
  },avatar:{
    margin: theme.spacing(1), 
  },

  setInput:{
      height:"auto",
      width:'auto',
      textOverflow:'scroll',
      fontSize:22,
      color:'black',
       },
  mobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0',
    ...theme.mixins.toolbar,
    backgroundColor:'#60b877',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  MobiledrawerPaperClose:{
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(9),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
     
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 500,
    width:280
  },
  height:{
      height:500
  },MobilefixedHeightPaper:{
      height:540,
      width:280
  },
}));




        //  THE FUNCTION IS STARTING FROM BELOW



 function Dashboard(props) {

 
    // fetch('http://localhost:3004/')
    // .then(res=>res.json())
    // .then(result=>console.log(result))
    // .catch(err => console.log(err))
  //   var socket;
  // useEffect(() => {
  //     socket = io();
  //      console.log('io connection')
  // },[]);

           const classes = useStyles();

   
  const [setScreen,makeSetSreen]=React.useState(false)
  const [open, setOpen] = React.useState(false);
  const [chat,setChat]=React.useState([]);
  const [message,setMessage]=React.useState("")
  const [errorMessage,setErrorMessage]=React.useState("")
  const [arr,setArr] =React.useState(["Qasim","Ameen","Text is the exact, original words written by an author. Text is also a specific work as written by the original author. Text is also commonly used to refer to a text message or to send a text message. Text has several other senses as a noun.","ali ali dam ali ali ali"])

   
  const messagesEndRef = React.useRef(null);
     useEffect(()=>{
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
     },[props.messageArray])



     const sendMessage =async ()=>{
         if(message === ""){
           setErrorMessage("Enter message please")
         }
         else{
            
          await props.sendingMessage(props.mergeUId,props.currentUid,message,props.socket)
            
           setMessage("");
         }
     }


   return(
     <>
          {/* For MOBILE USERS */}
         <div className={classes.mobile}>
         <CssBaseline />
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.MobiledrawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon} >
        <IconButton onClick={()=>makeSetSreen(true)}>
          <WhatsAppIcon style={{fontSize:35,color:'white'}} />
        </IconButton>
      </div>
      <Divider />
      <List> {mainListItems} </List>
      <Divider />
      <List> {secondaryListItems} </List>
    </Drawer> 
     
                 
         {/* <<<<<<CHAT SCREEN>>>>>>   */}


{  props.chat_screen ?   <main className={classes.content}>
      {/* <div className={classes.appBarSpacer} /> */}

         
      <div style={{position:'fixed',overflow:'scroll',backgroundColor:"lightgray",height:"100px",width:"100%"}}>
      <Box style={{display:"inline-flex",justifyContent:'space-between',marginLeft:10,height:'40px'}}>
              <Avatar alt={props.friend_name} src="/static/images/avatar/1.jpg" /> 
              <h4 style={{marginLeft:10}}>{props.friend_name}</h4>
                    
                   <br/>
                  
        </Box>
        </div>
         
           <br /><br /><br /><br /><br />
         <hr  style={{width:200,height:2,backgroundColor:'green'}} />
      

        <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={1}>
       
        <div style={{overflowWrap:'break-word',wordWrap:" break-word",height:"100%",width:'300px',overflowY:'scroll',overflowX:'hidden',display:'inline-block'}}>
              
           { props.messageArray.map((value,index)=>{
          
           return<div style={{width:"auto"}} >{value.sender === props.currentUid?
             
            <Badge key={index} style={{fontSize:19,float:"right",whiteSpace: "initial"}} pill variant="success">
                 {value.message}
                        </Badge>:
     <Badge style={{fontSize:19,float:"left",whiteSpace: "initial"}} pill variant="secondary">
          {value.message}
                  </Badge>
                 
          }
          
     <br /><br />
               <div ref={messagesEndRef} />

    </div>
    })}   
        
        {
          errorMessage ?
          <div>
         <Error>{errorMessage}</Error>
               </div>
          :null
        } 
       
       </div>
         
         <hr style={{height:2,width:200,backgroundColor:'green'}} />
         <br />
      
            <Box style={{display:"inline-flex",outline:'2px solid green',position:'absolute',bottom:2,backgroundColor:'lightgray'}}>   
            <InputBase 
                className={classes.setInput}
               value={message}
               placeholder="enter message .."
                onChange={(e)=>setMessage(e.target.value)}
      />   
      
        
        {/* <IconButton style={{outline:'none'}} color="primary" aria-label="search"  onClick={()=>alert('photo is working')}>
            <PhotoLibraryOutlinedIcon style={{fontSize:22}} />
        
      </IconButton>  */}
       <IconButton onClick={()=>sendMessage()} 
          style={{outline:'none'}} color="primary" aria-label="search" >
        
           <SendIcon /> 
         </IconButton>     

     
         </Box>
       
         
        </Grid>
        
      </Container>
    </main>:
<div>
          {/* <<<<<<WELCOME Screen>>>>>>> */}


        
        <div className={classes.avatar}>
            <Avatar src="" style={{height:50,width:50,textAlign:'center'}} />
            <br />
             <h3 onClick={()=>alert('genius Qasim')} style={{textAlign:'center',overflow:'scroll',color:'red', textTransform: 'uppercase'}}>Welcome <i>{props.currentName}</i></h3>
                
           
        </div>
        <hr />
       <div style={{
           backgroundColor:'lightgray',
           justifyContent:'center',
           height:'100%',
           width:'auto',

           
       }}>
           <QuestionAnswerIcon style={{
               fontSize:286,
               color:'gray',
           }} />
           <p style={{textAlign:'center',color:'gray'}}>select a chat to read message</p>
            
       </div>
        </div>
    
}

         </div>
       
     </>
   )
 } 

 
const mapStateToprops =(state)=>({

    currentName:state.app.name,
    currentUid:state.app.uid,
    chat_screen:state.app.chat_screen,

    fuid:state.app.fuid,
    friend_name:state.app.friend_name,
    mergeUId:state.app.mergeUId,
    
    messageArray:state.app.messageArray,
    tryError:state.app.tryError,

    updateAgain:state.app.updateAgain,
    exampleArray:state.app.exampleArray,

    socket:state.app.socket,

})

const mapDispatchToProps = (dispatch) => ({
  sendingMessage:(merge,uid,message,socket)=>dispatch(sendingMessage(merge,uid,message,socket)),
  updateMessage:(uid)=>dispatch(updateMessage(uid))
})


export default connect(mapStateToprops,mapDispatchToProps)(Dashboard)