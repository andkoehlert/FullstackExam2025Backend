process.env.NODE_ENV = 'test';

import {test} from '@playwright/test';

import health from './health.test';
import userTestCollection from './user.test';
import dotenvFlow from 'dotenv-flow';
import {connect, disconnect} from "../src/repositroy/database"
import {userModel} from "../src/models/userModel"
import {ProductModel} from "../src/models/productModel"
dotenvFlow.config();

function setup() {
  //beforeEach clear test database
  test.beforeEach(async () => {
   
    try {
      await connect();
      await userModel.deleteMany({});
      await ProductModel.deleteMany({});

    }
    finally {
      await disconnect();
    }
  })


  //afterAll clear the test database
  test.afterAll(async () => {
   
    try {
      await connect();
      await userModel.deleteMany({})
      await ProductModel.deleteMany({})

    }
    finally {
      await disconnect();
    }
  })
}

setup();

test.describe(health);
test.describe(userTestCollection);
