import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import Error from './error'
import {signupUser} from '../store/action/action'
import { Redirect } from 'react-router';


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
  paper: {
    marginTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function SignUp(props) {
  
  const [data,setData]=React.useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    message:''
  })

  const classes = useStyles();

  const updating= (e) => {
    setData({
      ...data,
      [e.target.name]:e.target.value
    })  
  }

  const setError=(bug)=>{
    setData({
      ...data,
      message:bug
    })
  } 
   
  const submitting = (e) => {
    e.preventDefault();
    
 if(data.firstName === ''){
         setError('Enter First Name'); return;
  }
   
   if(data.lastName === ''){
       setError('Enter Last Name');
    return;
}

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

  firstName: data.firstName,
  lastName: data.lastName,
  email: data.email,
  password: data.password

}
  props.signupUser(user)
  .then(()=>{
    props.history.push('/login')
  })
  
} 
  }



 


   

  return (
    <Container component="main" maxWidth="xs">
    
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={updating}
                autoComplete="none"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                
                onChange={updating}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              
                onChange={updating}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                
                onChange={updating}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
            </Grid>
        
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
         {/* {data.firstName.length < 5 ||data.lastName.length < 5 ||
           data.email===''
            ||data.password.length <8
            ?<Button
            disabled
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        : */}
        {data.message === ""?null: <Error>
          {data.message}
         </Error>
}
          <Button
            onClick={submitting}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
    
  


          <Grid container justify="flex-end">
            <Grid item>
              <Link variant="body2" 
                style={{cursor:'pointer'}}
                onClick={()=>props.history.push('/login')}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

 const mapDispatchToProps = (dispatch) => ({
  signupUser:(user,history)=>dispatch(signupUser(user,history))
 }) 

export default connect(null,mapDispatchToProps)(SignUp)