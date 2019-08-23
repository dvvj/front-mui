import React from 'react';
import { resolve } from 'url';

// let doGet = (query, url) => {
//   console.log('query:', query);
//   return new Promise((resolve, reject) => {
//     fetch(url)
//       .then(response => response.json())
//       .then(result => {
//         console.log('result:', result);
//         resolve({
//           products: result,
//           page: 0,
//           totalCount: result.length,
//         })
//       });
//   })
// };
let doGet = (url, cb) => {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(response => response.json())
      .then(result => {
        console.log('result:', result);
        let res = cb(result);
        resolve(res)
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

let doPostNoCb = (data, url) => {
  return doPost(data, url, x => x);
};

const withPageAndCount = (entityName, entities) => {
  let res = {
    page: 0,
    totalCount: entities.length
  };
  res[entityName] = entities;
  return res;
};

let DataSrc = {
  ProfOrg: {

    getAllProducts: req => {
      //return doGet(query, '/api/productsWithAssets');
      return doPost(
        req, '/api/productsWithAssets',
        prods => withPageAndCount('products', prods)
      );
    },
    newProduct: (data, cb) => {
      return doPost(data, '/api/newProduct', cb);
    }
  },
  SysAdmin: {
    getAllProfOrgs: () => {
      return doGet(
        '/api/proforgs',
        proforgs => withPageAndCount('proforgs', proforgs)
      );
    }
  }
};

export default DataSrc;