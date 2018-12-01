const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()
const TableName = process.env.DDB_TABLE

exports.handler = (event, _, callback) => {
  return Promise.resolve(event.pathParameters)
    .then(({ slug }) => {
      return typeof slug === 'string'
        ? slug
        : Promise.reject({ status: 422, message: 'UnprocessableEntity' })
    })
    .then((promoter) => {
      return ddb.query({
        IndexName: 'promoter-index',
        TableName,
        KeyConditionExpression: 'promoter = :p',
        ExpressionAttributeValues: {
          ':p': { S: promoter }
        }
      }).promise()
    })
    .then((result) => {
      return {
        status: 200,
        body: {
          status: 200,
          content: result.Items.map((item) => {
            return {
              id: item.id.S,
              title: item.title.S,
              description: item.description.S,
              image: item.image.S,
              location: item.location.NS
            }
          })
        }
      }
    })
    .catch((error = {}) => {
      return {
        status: error.status || 500,
        body: {
          status: error.status || 500,
          message: error.message || 'InternalServerError'
        }
      }
    })
    .then(({ status, body }) => callback(null, {
      statusCode: status,
      body: JSON.stringify(body),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }))
}
