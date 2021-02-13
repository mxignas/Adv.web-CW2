var PutDemo;
(function (PutDemo) {
    var AWS = require("aws-sdk");
    //Set the region and endpoint
    // AWS.config.update({
    //     region: "eu-west-1",
    //     endpoint: "https://dynamodb.eu-west-1.amazonaws.com"
    // });
    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });
    //Create date object to get date in UNIX time
    var date = new Date();
    //Create new DocumentClient
    var documentClient = new AWS.DynamoDB.DocumentClient();
    //Table name and data for table
    var params = {
        TableName: "CryptoCurr",
        Item: {
            PriceTimeStamp: date.getTime(),
            Currency: "bitcoin",
            Price: 3795.18
        }
    };
    //Store data in DynamoDB and handle errors
    documentClient.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item", params.Item.Currency);
            console.error("Error JSON:", JSON.stringify(err));
        }
        else {
            console.log("Currency added to table:", params.Item);
        }
    });
})(PutDemo || (PutDemo = {}));
//# sourceMappingURL=put_demo.js.map