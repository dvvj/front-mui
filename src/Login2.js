import React, { Component } from "react";
import Actions from './Actions';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import history from './history';
import TextField from '@material-ui/core/TextField';
import {
	withRouter, Redirect 
} from 'react-router-dom';
// const LoginFunc = (props) => {
//     const doLogin = (d) => {
//         console.log(d);
//     }
// }

// const StyledTF = styled(TextField)(
//   {
//     marginLeft: 1,
//     marginRight: 1,
//     width: 200,
//   }
// );

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  }));
  

function Login2() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        user: 'abc@de.com',
        pass: '123'
      });
    
    // state = {
    //     user: 'abc@de.com',
    //     pass: '123'
    // };

    // changeHandler = event => {
    //     console.log('in changeHandler: ', event.target.name, event.target.value);
    //     this.setState({ ...this.state, [event.target.name]: event.target.value });
    //   };
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    const handleLogin = e => {
        e.preventDefault();
        let userpass = values;
        Actions.doLogin(userpass);
        history.push('/orgs');
    }

    // handleLogin = e => {
    //     e.preventDefault();
    //     let userpass = {
    //         user: this.state.user,
    //         pass: this.state.pass
    //     };
    //     Actions.doLogin(userpass);
        
    //     console.log('in handleLogin');
    //     //this.props.history.push('/orgs');
    //     history.push('/orgs');
    //     //return <Redirect to='/tmplist' />
    // }

      return (
        <Container>
            <form onSubmit={handleLogin}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
                <TextField
                    name='user'
                    className={classes.textField}
                    value={values.user}
                    label="Type your email"
                    type="email"
                    onChange={handleChange}
                    margin="normal"
                />
            </div>
            <div>
                <TextField
                    className={classes.textField}
                    name='pass'
                    value={values.pass}
                    label="Type your password"
                    // className={this.classes.textField}
                    onChange={handleChange}
                    margin="normal"
                    type="password"
                />
            </div>
            <div className="text-center">
                <Button type="submit" variant="contained" color="primary">Login</Button>
            </div>
            </form>
        </Container>
      );

};

export default withRouter(Login2);