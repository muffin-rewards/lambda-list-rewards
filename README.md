# AWS Lambda: List Rewards

Lists DynamoDB rewards.

## Enviroment variables

* `DDB_TABLE` that the rewards are stored in.

## Responses

### 500, 404, 422
```
{
  "status": Number,
  "message": String
}
```
### 200
```
{
  "status": Number,
  "content": {
    "promoter": String,
    "title": String,
    "description": String,
    "location": Number[]
  }
}
```

## Deployment
Deploy with `npm run deploy:{env}`.
