"use strict";
var albumBucketName = 'greetingsfromtheinternet';
var bucketRegion = 'Oregon';
var IdentityPoolId = 'us-west-2_M5qvpjJ5X';


AWS.config.update({
  region: bucketRegion,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
  })
});

var s3 = new AWS.S3({
  apiVersion: '2006-03-01',
  params: {Bucket: albumBucketName}
});
