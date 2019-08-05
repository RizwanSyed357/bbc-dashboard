import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';

beforeEach(() => {
  fetch.resetMocks()
})

it ('waits for a slow response from users API', async () => {
  const app = shallow(<App/>, { disableLifecycleMethods: true });

  const fetchFiles = jest.fn(() => {
    return new Promise(
      res => res({val: 'return 1'}) 
    )
  });

  const fetchUsers = jest.fn(() => {
    return new Promise(
      res => {
        setInterval(() => res({val: 'return 2'}), 2000 )
      }
    )
  });

  const fetchTypes = jest.fn( () => {
    return new Promise(
      res => res({val: 'return 3'}) 
    )
  });

  const test = await app.instance().fetchEngine(fetchFiles, fetchUsers, fetchTypes )

  expect( test ).toEqual([{val: 'return 1'}, {val: 'return 2'}, {val: 'return 3'}])
});

// it ('makes another request if no data is returned', async () => {
  
//   fetch.mockResponseOnce({statusText: "Internal Server Error"});
//   fetch.mockResponseOnce({statusText: "Internal Server Error"}); // I was trying to find a way to mock the  response object returned by the NPM module
//                                                                  // jest-fetch-mock, but cannot figure out how to create a mock response object with the       
//   const spy = jest.spyOn(App.prototype, 'fetchUsers')            // property 'Symbol(Response internals)]:', and so I cannot mock the statusText or 
//                                                                  // status properties. I could learn this if I had more time to complete the test.   
//   const app = shallow(<App/>);
//   expect(spy).toHaveBeenCalledTimes(2);

// });
