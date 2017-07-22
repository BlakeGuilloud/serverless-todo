'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const uuid = JSON.stringify((Math.floor(Math.random() * (10000 - 1)) + 10000) * timestamp);
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Couldn\'t create the todo item.'));
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid,
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };

  dynamoDb.put(params, (error) => {
    if (error) {
      console.error(error);

      callback(new Error('Couldn\'t create the todo item.'));

      return;
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };

    callback(null, response);
  });
};
