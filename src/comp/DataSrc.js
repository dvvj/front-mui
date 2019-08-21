import React from 'react';
import { resolve } from 'url';

let doGet = (query, url) => {
  console.log('query:', query);
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log('result:', result);
        resolve({
          products: result,
          page: 0,
          totalCount: result.length,
        })
      });
  })
};

let doPost = (data, url, cb) => {
  console.log('data:', data);
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(result => {
        console.log('result:', result);
        let res = cb(result);
        resolve(res)
      });
  })
};

let DataSrc = {
  ProfOrg: {
    getAllProducts: {
      columns: [
        { title: 'name', field: 'product.name' },
        { title: 'shortName', field: 'product.shortName' },
        { title: 'price0', field: 'product.price0' }
      ],
      get: query => {
        return doGet(query, '/api/productsWithAssets');
      }
    },
    newProduct: (data, cb) => {
      return doPost(data, '/api/newProduct', cb);
    }
  }
};

export default DataSrc;