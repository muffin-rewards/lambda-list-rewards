const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()
const TableName = process.env.DDB_TABLE

exports.handler = (event, _, callback) => {
  return Promise.resolve(event.body)
    .then(JSON.parse)
    .then(({ promoter }) => {
      return typeof promoter === 'string'
        ? promoter
        : Promise.reject({
          status: 422,
          message: 'UnprocessableEntity'
        })
    })
    .then(promoter => ddb.getItem({ TableName, Key: { promoter: { S: promoter } } }))
    .then(result => console.log('result', result))
    .then(res => callback(null, {
      statusCode: 200,
      body: JSON.stringify(res)
    }))
    .catch((error) => {
      console.log('error', error)

      return error.status && error.message
        ? error
        : { status: 500, message: 'InternalServerError' }
    })
    .then(({ status, message }) => callback(null, {
      statusCode: status,
      body: JSON.stringify({ status, message }),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }))
}
