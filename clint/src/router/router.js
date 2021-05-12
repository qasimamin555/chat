import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
  } from "react-router-dom";
import Main from '../pages/main'
import SignInSide from '../pages/login'
import SignUp from '../pages/signup'

import Practice from '../components/practice'
import {connect} from 'react-redux'


   class Path extends React.Component{
    //    constructor(){
    //        super()
    //        this.state={
    //         logInStatus:false
    //        }
    //    }
       render(){
           console.log("login_status",this.props.loginStatus)
           return(
               <Router>
                   <Route exact path ="/" component={SignUp} />
                     <Route socket="qasim ameen" path= '/chat'> 
                       {this.props.loginStatus ?
                          <Main />:
                         <Redirect to ="/login" />                         }
                      </Route>
              
                   <Route exact path ="/login" component={SignInSide} />
             
               </Router>
           )
       }
   }
   const mapStateToProps =(state)=>({
       loginStatus:state.app.loginStatus
   })
   export default connect(mapStateToProps,null) (Path)