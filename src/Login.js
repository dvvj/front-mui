import React, { Component } from "react";
import Actions from './Actions';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';
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

const StyledTF = styled(TextField)(
  {
    marginLeft: 1,
    marginRight: 1,
    width: 200,
  }
);


class Login extends Component {
    // const classes = useStyles();

    state = {
        user: 'abc@de.com',
        pass: '123'
    };

    changeHandler = event => {
        console.log('in changeHandler: ', event.target.name, event.target.value);
        this.setState({ ...this.state, [event.target.name]: event.target.value });
      };

    handleLogin = e => {
        e.preventDefault();
        let userpass = {
            user: this.state.user,
            pass: this.state.pass
        };
        Actions.doLogin(userpass);

        sessionStorage.setItem('uid', this.state.user);
        let uid = sessionStorage.getItem('uid');
        console.log('getItem from session', uid);
        
        console.log('in handleLogin');
        //this.props.history.push('/orgs');
        history.push('/orgs');
        //return <Redirect to='/tmplist' />
    }
    render () {
      return (
        <Container>
            <form onSubmit={this.handleLogin}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
                <StyledTF
                    name='user'
                    value={this.state.user}
                    label="Type your email"
                    type="email"
                    onChange={this.changeHandler}
                    margin="normal"
                />
            </div>
            <div>
                <StyledTF
                    name='pass'
                    value={this.state.pass}
                    label="Type your password"
                    // className={this.classes.textField}
                    onChange={this.changeHandler}
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
    }
};

export default withRouter(Login);