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

let DataSrc = {
  ProfOrg: {
    getAllProducts: {
      columns: [
        { title: 'name', field: 'name' },
        { title: 'shortName', field: 'shortName' },
        { title: 'price0', field: 'price0' }
      ],
      get: query => {
        return doGet(query, '/api/products');
      }
    }
  }
};

export default DataSrc;