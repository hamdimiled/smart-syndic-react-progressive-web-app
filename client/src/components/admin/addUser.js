import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { InputLabel } from 'material-ui/Input';
import {InputAdornment} from 'material-ui/Input';
import IconButton from 'material-ui/IconButton';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';


import Dialog from 'material-ui/Dialog';
import {DialogActions,DialogContent,DialogContentText,DialogTitle} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';


import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';

import { gql, graphql } from 'react-apollo';



const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
  },
});


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AddUser extends React.Component {

  state = {
    firstName: "",
    lastName: "",
    email:"",
    telephone: null,
    password: "",
    showPassword: false,
    open: false,

  };

  handleChange1 = event => {
    this.setState({ firstName: event.target.value });
  };
  handleChange2 = event => {
    this.setState({ lastName: event.target.value });
  };
  handleChange3 = event => {
    this.setState({ email: event.target.value });
  };
  handleChange4 = event => {
    this.setState({ telephone: event.target.value });
  };

  //password
  handleChange = event => {
    this.setState({ password: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };
  //password


  handleSave = () => {
    const { firstName, lastName, email, telephone ,password} = this.state;
    this.props.userMutation({
      variables: { firstName, lastName, email, telephone ,password}
    }).then(res => {
      this.setState({
        firstName: '',
        lastName: '',
        email:'',
        telephone:'',
        password:''
        
      });})
    this.handleClickOpen()

    
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  render() {
    const { classes } = this.props;

    return (
      <Paper>
        <br />
        <div className={classes.container}>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">FirstName</InputLabel>
            <Input
              label="Name"
              value={this.state.firstName}
              onChange={this.handleChange1}
              className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">LastName</InputLabel>
            <Input
              value={this.state.lastName}
              onChange={this.handleChange2} className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">Email</InputLabel>
            <Input
              type="email"
              value={this.state.email}
              type="mail"
              onChange={this.handleChange3}
              className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
          </FormControl>

          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="name-simple">Telephone</InputLabel>
            <Input
            type="number"
              value={this.state.telephone}
              onChange={this.handleChange4}
              className={classes.input}
              inputProps={{
                'aria-label': 'Description',
              }}
            />
          </FormControl>

           <FormControl className={classes.formControl}>
          <InputLabel htmlFor="adornment-password">Password</InputLabel>
          <Input
            id="adornment-password"
            type={this.state.showPassword ? 'text' : 'password'}
            value={this.state.password}
            onChange={this.handleChange}
            className={classes.input}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                  onMouseDown={this.handleMouseDownPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>


        


        </div>
        <Button variant="raised" size="large" color="primary" className={classes.button} onClick={this.handleSave}
        >
          Add User
        </Button>
        
      
      </Paper>

    );
  }
}

AddUser.propTypes = {
  classes: PropTypes.object.isRequired,
};




export const Usermutation = gql`
mutation Usermutation ($firstName: String!, $lastName: String!,$email:String,$telephone:Int!, $password:String!){
  useradd(firstName: $firstName,lastName: $lastName,email:$email,telephone:$telephone,password:$password) {
          
          firstName
          lastName
          email
          telephone
          password   
     }
   }
   `;

export default graphql(Usermutation,{ name: 'userMutation' })
  (withStyles(styles)(AddUser));





