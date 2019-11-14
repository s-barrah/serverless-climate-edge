# Serverless Climate Edge
Lambda endpoints for Farm Station sensors

## Installation

You will need the following packages installed locally,

- AWS CLI
- Node JS (8 or higher)
- Yarn

## Local Development

Before starting local development you will need to run a couple of commands in separate bash windows,

```bash
yarn global add serverless
yarn install
serverless dynamodb install
```

This will install DynamoDB locally.

Note: If you're running `aws` for the first time, run `aws configure` once to avoid errors.

You will need to setup environment variables, to do this copy the `.env.dist.json` to `.env.json`.


You can start the local DynamoDB, migrate tables and simulate lambda and API endpoints locally using 
the following command.

```bash
serverless offline start
```
Open a browser and go to the url [http://localhost:8004/shell](http://localhost:8004/shell) to access the web shell for dynamodb local.

See more information on [DynamoDB Local](https://www.npmjs.com/package/serverless-dynamodb-local) advanced options and configuration.

#### Endpoints

`GET application status -`
[http://localhost:3010/status](http://localhost:3010/status)

`POST - Station data-`
[http://localhost:3010/data/{stationId?}](http://localhost:3010/data)

`GET - Station data-`
[http://localhost:3010/data/{stationId}](http://localhost:3010/data/{stationId})

`GET - Station chart data-`
[http://localhost:3010/chart/{stationId}](http://localhost:3010/chart/{stationId})

`POST - upload files -`
[http://localhost:3010/upload](http://localhost:3010/upload)

`GET - Age data`
[http://localhost:3010/ages](http://localhost:3010/ages)

`GET - Children data`
[http://localhost:3010/children](http://localhost:3010/children)

`GET - Plots data`
[http://localhost:3010/plots](http://localhost:3010/plots)

`GET - Users data`
[http://localhost:3010/users](http://localhost:3010/users)

`GET - Varieties data`
[http://localhost:3010/varieties](http://localhost:3010/varieties)


## Testing

Tests are located in the `tests` folder an can be invoked by running `yarn unit-test` and `yarn feature-test`. These 
tests will invoke the defined  actions in a wrapper, where the response can then be tested.


