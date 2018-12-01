const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()
const TableName = process.env.DDB_TABLE

exports.handler = (event, _, callback) => {
  return Promise.resolve(event.body)
    .then(JSON.parse)
    .then(({ promoter }) => {
      return typeof promoter === 'string'
        ? promoter
        : Promise.reject({ status: 422, message: 'UnprocessableEntity' })
    })
    .then(promoter => ddb.getItem({ TableName, Key: { promoter: { S: promoter } } }))
    .then(result => console.log('result', result))
    .catch((error) => {
      console.log('error', error)

      return {
        status: error.status || 500,
        body: {
          status: error.status || 500,
          error: error.message || 'InternalServerError'
        }
      }
    })
    .then(({ status, body }) => callback(null, {
      statusCode: status,
      body: JSON.stringify(body),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }))
}
