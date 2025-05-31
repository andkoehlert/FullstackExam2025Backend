process.env.NODE_ENV = 'test';

import {test} from '@playwright/test';

import health from './health.test';
import userTestCollection from './user.test';
import productCreateCollection from './productCreate.test'
import projectCreateCollection from './projectCreate.test'
import employeeCreateCollection from './employee.test'
import taskCreateCollection from './task.test';
import postCreateCollection from './post.test'
import dotenvFlow from 'dotenv-flow';
import {connect, disconnect} from "../src/repositroy/database"
import {employeeModel} from "../src/models/employee"
import {PostModel} from "../src/models/post" 
import {projectModel} from "../src/models/projectModel"
import {userModel} from "../src/models/userModel"
import {ProductModel} from "../src/models/productModel"
import {TaskModel} from "../src/models/task"
dotenvFlow.config();

function setup() {
  //beforeEach clear test database
  test.beforeEach(async () => {
   
    try {
      await connect();
      await userModel.deleteMany({});
      await ProductModel.deleteMany({});
      await projectModel.deleteMany({});
      await employeeModel.deleteMany({});
      await PostModel.deleteMany({});
      await TaskModel.deleteMany({});

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
      await projectModel.deleteMany({});
      await employeeModel.deleteMany({});
      await PostModel.deleteMany({});
      await TaskModel.deleteMany({});

    }
    finally {
      await disconnect();
    }
  })
}

setup();

test.describe(health);
test.describe(userTestCollection);
test.describe(productCreateCollection)
test.describe(projectCreateCollection)
test.describe(employeeCreateCollection)
test.describe(postCreateCollection)
test.describe(taskCreateCollection)



