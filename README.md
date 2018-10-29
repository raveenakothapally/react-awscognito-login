#### Context
Has a ton of server + client implementation for Wejo test using following technologies:
1. Node JS
2. Express JS
3. Socket IO
4. React
5. Redux
6. Amazon AWS Cognito

###### Other notable achievements
I built a socket io based client to server communication system using a middleware architecture.
This can be used to authenticate user requests for every socket io call using Cognito for reference.

##### Installation

###### Prerequisites
1. node version > 10.1.x
2. Create secret.json in the root folder of this application with following data
```
{
  "amazon_aws_cognito": {
    "region": "",
    "UserPoolId": "",
    "ClientId": ""
  }
}
```
Make sure to update the above configuration with your AWS Cognito account settings.


```
npm i
```

##### Steps to run
```
npm start
```
Then navigate to:
> http://localhost:3000

We can easily run this on https with a few line change in bin/www.
