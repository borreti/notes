import AWS from 'aws-sdk';

/**
 * Runs a dynamoDb operation
 * @export
 * @param {*} action
 * @param {*} params
 * @return {*}
 */
export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}