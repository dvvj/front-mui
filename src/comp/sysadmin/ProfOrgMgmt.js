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

import DataSrc from '../DataSrc';
import { fontSize } from '@material-ui/system';

const tableIcons = {
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

class ProfOrgMgmt extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  };

  state = {
    page: -1,
    proforgs: [],
    totalCount: -1
  }

  async componentDidMount() {
    const { page, proforgs, totalCount } = await DataSrc.SysAdmin.getAllProfOrgs();
    console.log('proforgs:', proforgs);
    this.setState({ page, proforgs, totalCount });
  }

  onRowAdd = newOrgData =>
    new Promise(resolve => {
      // let uid = sessionStorage.getItem('uid');
      // console.log('uid from session', uid);
      let proforg = newOrgData;

      DataSrc.SysAdmin.newProfOrg(
        proforg, newOrgResp => {
          resolve();
          console.log('new ProfOrg id: ', newOrgResp);
          const proforgs = this.state.proforgs;
          proforgs.push(newOrgData);
          this.setState({proforgs});
        }
      )
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
        <MaterialTable
          icons={tableIcons}
          tableRef={this.tableRef}
          title="医药公司列表"
          columns={[
            { title: '公司ID', field: 'uid' },
            { title: '公司名', field: 'name' },
            { title: '基本信息', field: 'info' },
            { title: '联系电话', field: 'phone' }
          ]}
          data={this.state.proforgs}
          // detailPanel={prodData => {
          //   return (
          //     <ProdImages
          //       imgUrl={prodData.assetItems.length == 0 ? '#' : `/product/${prodData.product.id}/${prodData.assetItems[0].url}`}
          //       prodName={prodData.product.name} />

          //   )
          // }}
          editable={{
            onRowAdd: this.onRowAdd,
            onRowUpdate: this.onRowUpdate,
            onRowDelete: this.onRowDelete
          }}

        />
      </Container>
  );
  }
};

export default ProfOrgMgmt;
