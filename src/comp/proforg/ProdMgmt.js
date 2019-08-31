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
import ProdImages from './ProdImages';
import ProdImageSmall from './ProdImageSmall';
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

class ProdMgmt extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
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
    let t = await DataSrc.ProfOrg.getAllProductsByOrg({
      proforgId: this.getProfOrgId()
    });
    console.log('products t:', t);
    const { page, products, totalCount } = t;
    this.setState({ page, products, totalCount });
  }

  onRowAdd = newProdData =>
    new Promise(resolve => {
      let uid = this.getProfOrgId(); //
      console.log('getItem from session', uid);
      let prod = {
        id: null,
        ...newProdData.product,
        detailedInfo: '',
        keywords: '',
        categories: '',
        producerId: uid
      };
      DataSrc.ProfOrg.newProduct(
        prod, newProd => {
          resolve();
          console.log('newProd: ', newProd);
          const products = this.state.products;
          products.push({
            product: newProd,
            assetItems: []
          })
          this.setState({products});
        }
      )
      // fetch(() => {
      //   resolve();
      //   const data = {...this.state.data};
      //   data.products.push(newData);
      //   this.setState({ ...this.state, data });
      // }, 600);
    })

  onRowUpdate = (newData, oldData) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        // const data = {...this.state.data};
        // const oldDataIdx = data.products.indexOf(oldData);
        // console.log(`oldData(idx:${oldDataIdx}), newData: `, oldData, newData);
        // data.products[oldDataIdx] = newData;
        // this.setState({ ...this.state, data });
        // console.log('after update: ', this.state.data);
      }, 600);
    })

  onRowDelete = oldData =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        // const data = {...this.state.data};
        // const oldDataIdx = data.products.indexOf(oldData);
        // data.products.splice(data.products[oldDataIdx], 1);
        // this.setState({ ...this.state, data });
      }, 600);
    })

  onRefresh = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve();
        // const data = {...this.state.data};
        // this.setState({ ...this.state, data });
      }, 600);
    })

  render() {
    //const state = this.state;
    return (

      <Container>
        <MaterialTable
          icons={tableIcons}
          tableRef={this.tableRef}
          title="产品列表"
          columns={[
            { title: '产品名', field: 'product.name' },
            { title: '简称', field: 'product.shortName' },
            { title: '基准价格', field: 'product.price0', type: 'numeric' },
            {
              title: '预览图',
              field: 'imgUrl',
              render: prodData => 
                <ProdImageSmall
                  productId={prodData.product.id}
                  imageUrlBase='/product'
                  imgUrl0={prodData.assetItems.length == 0 ? '' : `/${prodData.product.id}/${prodData.assetItems[0].url}`}
                  prodName={prodData.product.name} />
            }
          ]}
          data={this.state.products}
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
          // actions={[
          //   {
          //     icon: Refresh,
          //     tooltip: 'Refresh Data',
          //     isFreeAction: true,
          //     onClick: this.onRefresh
          //   }
          // ]}
        />
      </Container>
  );
  }
};

export default ProdMgmt;
