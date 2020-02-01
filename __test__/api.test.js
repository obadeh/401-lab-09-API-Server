'use strict';

const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('Categories >>>> CRUD', () => {
  it('post a new categorie item', () => {
    let testObj = { name: 'test name', display_name: 'test display_name', description: 'test description' };
    return mockRequest.post('/api/v1/categories')
      .send(testObj)
      .then(data => {
        let record = data.body;
        console.log('record : ', record._id);
        Object.keys(testObj).forEach(key => {
          expect(record[key]).toEqual(testObj[key]);
        });
        
      })
  }); 


  it('get a categorie item', () => {
   
  return mockRequest.get('/api/v1/categories')
  .then(response => {
    expect(response.status).toEqual(200)
  })
});

// it('delete a categorie item', () => {
   
//   return mockRequest.delete('/api/v1/categories')
//   .then(response => {
//     console.log('response.body : ', response.body);
//     expect(response.status).toEqual(200)
//   })
// });

})