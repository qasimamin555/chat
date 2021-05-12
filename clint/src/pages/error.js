import React from 'react';
import Alert from '@material-ui/lab/Alert';


const Error = props =><Alert severity="error"> {props.children} </Alert>


export default Error