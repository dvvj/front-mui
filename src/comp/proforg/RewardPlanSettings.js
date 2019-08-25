import React, { Component } from 'react';
import { forwardRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Container from '@material-ui/core/Container';
import DataSrc from '../DataSrc';
import SnackbarUtil from '../shared/SnackbarUtil';
import TransferList from '../shared/TransferList';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import Refresh from '@material-ui/icons/Refresh';
import ViewColumn from '@material-ui/icons/ViewColumn';

import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles, styled } from '@material-ui/core/styles';
import RewardPlanSettingContent from './RewardPlanSettingContent';

const tableIcons = {
  SettingsEthernetIcon: forwardRef((props, ref) => <SettingsEthernetIcon {...props} ref={ref} />),
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  Refresh: forwardRef((props, ref) => <Refresh {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


function DraggableComponent(props) {
  return (
    <Draggable cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const StyledGrid = styled(Grid)(
  {
    flexGrow: 1
  }
);

class RewardPlanSettings extends Component {
  constructor(props) {
    super(props);

    this.sbarRef = React.createRef();
    this.tabRef = React.createRef();
  }

  state = {
    open: false,
    proforgId: null,
    rewardPlanEntries: []
  }

  handleOpen = (toOpen, proforgId) => {
    this.setState({ open: toOpen, proforgId });
  }

  close = () => this.handleOpen(false, null);

  // setErrorText = (name, errorText) => {
  //   let errorTexts = this.state.errorTexts;
  //   errorTexts[name] = errorText;
  //   this.setState({ errorTexts });
  // }

  onRowDelete = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 600);
    })

  render() {
    return (
      <div>
        <SnackbarUtil ref={this.sbarRef} />
        <Dialog
          fullWidth={true}
          maxWidth={'lg'}
          PaperComponent={DraggableComponent}
          open={this.state.open}
          onClose={this.close}
          aria-labelledby="form-dialog-title">
          <DialogTitle
            style={{ cursor: 'move' }} 
            id="form-dialog-title">设置【】奖励套餐</DialogTitle>
          <DialogContent>
            <RewardPlanSettingContent />
            {/* <StyledGrid containter>
              <Grid item xs={6}>
                <TransferList />
              </Grid>
              <Grid item xs={3}>
                <MaterialTable
                  icons={tableIcons}
                  tableRef={this.tabRef}
                  title="奖励配置列表（按产品）"
                  columns={[
                    { title: '产品列表', field: 'productList' },
                    { title: '奖励百分比', field: 'reward' }
                  ]}
                  data={this.state.rewardPlanEntries}
                  editable={{
                    onRowDelete: this.onRowDelete
                  }}
                />
              </Grid>
            </StyledGrid> */}

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
            <Button onClick={this.close} color="primary">取消</Button>
            <Button onClick={this.setPass} color="primary">设置密码</Button>
          </DialogActions>
        </Dialog>
      </div>
    );  
  }
};

export default RewardPlanSettings;