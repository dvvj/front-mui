import React, { Component } from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  

function ProfOrgSetPass() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        pass1: '',
        pass2: ''
      });

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    const handleSetPass = () => {
      console.log('pass: ', values);
    };

      return (
        <Container>
           {/* className="text-center" */}
            <form onSubmit={handleSetPass}>
              <div>
                  <TextField
                      className={classes.textField}
                      name='pass1'
                      value={values.pass}
                      label="Type your password"
                      // className={this.classes.textField}
                      onChange={handleChange}
                      margin="normal"
                      type="password"
                  />
              </div>
              <div>
                  <TextField
                      className={classes.textField}
                      name='pass2'
                      value={values.pass}
                      label="Re-Type your password"
                      // className={this.classes.textField}
                      onChange={handleChange}
                      margin="normal"
                      type="password"
                  />
              </div>
              <div>
                  <Button type="submit" variant="contained" color="primary">Set password</Button>
              </div>
            </form>
        </Container>
      );

};

export default ProfOrgSetPass;