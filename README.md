# AWS Lambda: List Rewards

Lists DynamoDB rewards.

## Deployment
To deploy for production use `npm run deploy:prod`.

### Enviroment variables
- `REWARDS_TABLE` that the rewards are stored in.

## Responses

### 500
Returns a string in body with error information.

### 200
```
[
  {
    promoter: String,
    promoterName: String,
    reward: String,
    rewardDetails: String,
    rewardImage: String,
    slug: String,
    termsAndConditions: String,
  }
]
```
