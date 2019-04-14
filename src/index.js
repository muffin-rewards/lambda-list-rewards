const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()
const TableName = process.env.REWARDS_TABLE

exports.handler = (_event, _context, callback) => {
  return ddb.scan({ TableName }).promise()
    .then((result) => {
      return {
        statusCode: 200,
        body: result.Items.map((item) => ({
          details: item.details.S,
          image: item.image.S,
          name: item.name.S,
          promoter: item.promoter.S,
          promoterName: item.promoterName.S,
          shown: item.show.BOOL,
          slug: item.slug.S,
          termsAndConditions: item.termsAndConditions.SS,
        }))
      }
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: error.message || 'InternalServerError'
      }
    })
    .then(({ statusCode, body }) => callback(null, {
      statusCode,
      body: JSON.stringify(body),
      headers: { 'Access-Control-Allow-Origin': '*' }
    }))
}
