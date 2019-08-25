import React, { Component } from 'react';
import { forwardRef } from 'react';

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
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import RewardPlanSettings from './RewardPlanSettings';

import DataSrc from '../DataSrc';
import ProdImages from './ProdImages';
import ProdImageSmall from './ProdImageSmall';
import { fontSize } from '@material-ui/system';

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

class PriceMgmt extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.rewardPlanSettingsRef = React.createRef();
  };

  state = {
    page: -1,
    products: [],
    totalCount: -1
  }

  getProfOrgId = () => {
    //return sessionStorage.getItem('uid');
    return 'o-org'; //todo
  }

  async componentDidMount() {
    let t = await DataSrc.ProfOrg.getRewardPlansAndProducts(
      { proforgId: this.getProfOrgId() },
      { proforgId: this.getProfOrgId() }
    );
    console.log('reward plans t:', t);
    const { page, rewardPlans, totalCount } = t;
    this.setState({ page, rewardPlans, totalCount });
  }

  onRowAdd = newPlanData =>
    new Promise(resolve => {
      // let uid = this.getProfOrgId(); //
      // console.log('getItem from session', uid);
      // let plan = {
      //   id: null,
      //   ...newPlanData,
      //   detailedInfo: '',
      //   keywords: '',
      //   categories: '',
      //   producerId: uid
      // };
      // DataSrc.ProfOrg.newProduct(
      //   prod, newProd => {
      //     resolve();
      //     console.log('newProd: ', newProd);
      //     const products = this.state.products;
      //     products.push({
      //       product: newProd,
      //       assetItems: []
      //     })
      //     this.setState({products});
      //   }
      // )
    })

  onRowUpdate = (newData, oldData) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 600);
    })

  onRowDelete = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, 600);
    })

  onRefresh = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();

      }, 600);
    })

  render() {
    //const state = this.state;
    return (

      <Container>
        <RewardPlanSettings ref={this.rewardPlanSettingsRef} />
        <MaterialTable
          icons={tableIcons}
          tableRef={this.tableRef}
          title="奖励套餐列表"
          columns={[
            { title: '套餐ID', field: 'id' },
            { title: '描述', field: 'info' }
          ]}
          data={this.state.rewardPlans}
          editable={{
            onRowAdd: this.onRowAdd,
            onRowUpdate: this.onRowUpdate,
            onRowDelete: this.onRowDelete
          }}
          actions={[
            row => ({
              icon: SettingsEthernetIcon,
              tooltip: '套餐设置',
              onClick: (event, proforg) => {
                console.log(proforg);
                this.rewardPlanSettingsRef.current.handleOpen(true, proforg.id);
              }
            })
          ]}
        />
      </Container>
  );
  }
};

export default PriceMgmt;
