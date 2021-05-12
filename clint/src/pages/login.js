import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {loginUser} from '../store/action/action'
import { useScrollTrigger } from '@material-ui/core';
import Error from './error'
import { STATES } from 'mongoose';
import { useHistory } from "react-router-dom";


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

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function SignInSide(props) {
    let history = useHistory()



  const classes = useStyles();
  
  const [data,setData]=React.useState({
      email:"",
      password:'',
      message:'',
  }) 
    const updating = (e) => {
         setData({
             ...data,
             [e.target.name]:e.target.value
         })


         
    }
     const submitting =()=>{


        const emailPattern = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        if(!emailPattern.test(data.email)){
             setError('Invalid Email Address'); return;
        }
        
        if(data.email === ''){
             setError('Enter Email');
            return;
        }
        if(data.password === ''){
             setError('Enter Password');
            return;
        }
        if(data.password.length <= 8){
          setError('your password must be at least 8 charctor');
         return;
        }
        else{
          setError('you did it successfully')
          
        const user = {
        
          email: data.email,
          password: data.password
        
        }
          props.loginUser(user,history)
          // .then(()=>{
          //   props.history.push('/login')
          // })
          
        } 

     }
     const setError = (bug) =>{
        setData({
          ...data,
          message:bug
        })
      }
  


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
            <h2>Welcome to the React-Chat-App</h2>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        
          <form className={classes.form} noValidate>
            <TextField 
             onChange={updating}
            //  value={message}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField 
            // value={message}
             onChange={updating}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              
            />
           {data.message === ""?null: <Error>
             {data.message}
         </Error>
}
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              onClick={submitting}
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Link variant="body2" 
                   style={{cursor:'pointer'}}
                onClick={()=>props.history.push('/')}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}


const mapStateToProps =(state)=>({
  currentName:state.app.name,
  currentUid:state.app.uid
})


const mapDispatchToProps = (dispatch)=> ({
    loginUser:(user,history)=> dispatch(loginUser(user,history))
})

export default connect(mapStateToProps,mapDispatchToProps)(SignInSide) 