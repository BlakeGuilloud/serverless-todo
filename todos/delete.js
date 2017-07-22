'use strict';

const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  dynamoDb.delete(params, (error) => {
    if (error) {
      console.error(error);

      callback(new Error('Couldn\'t remove the todo item.'));

      return;
    }

    const response = {
      statusCode: 204,
      body: JSON.stringify({}),
    };

    callback(null, response);
  });
};
