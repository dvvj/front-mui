import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';

class SetPassDlg extends Component {
  constructor(props) {
    super(props);
    this.dlgRef = React.createRef();
  }

  state = {
    open: false,
    proforgId: null,
    passwords: {
      pass1: '',
      pass2: ''
    }
  }

  handleOpen = (toOpen, proforgId) => {
    this.setState({ open: toOpen, proforgId });
  }

  close = () => this.handleOpen(false, null);

  handleInputChange = event => {
    console.log('event: ', event);
    let name = event.target.name;
    let passwords = { ...this.state.passwords, [name]: event.target.value };
    console.log('updated passwords: ', passwords);
    this.setState({ passwords });
  };

  render() {
    return (
      <div>
        <Dialog open={this.state.open} onClose={this.close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">设置【{this.state.proforgId}】密码</DialogTitle>
          <DialogContent>
            <Container>
              {/* <form onSubmit={handleSetPass}> */}
              <div>
                  <TextField
                      name='pass1'
                      value={this.state.passwords.pass1}
                      label="Type your password"
                      // className={this.classes.textField}
                      onChange={this.handleInputChange}
                      margin="normal"
                      type="password"
                  />
              </div>
              <div>
                  <TextField
                      name='pass2'
                      value={this.state.passwords.pass2}
                      label="Re-Type your password"
                      // className={this.classes.textField}
                      onChange={this.handleInputChange}
                      margin="normal"
                      type="password"
                  />
              </div>
            </Container>
          </DialogContent>
          {/* <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent> */}
          <DialogActions>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.close} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );  
  }
};

export default SetPassDlg;