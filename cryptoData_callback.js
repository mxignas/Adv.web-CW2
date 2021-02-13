let AWS = require("aws-sdk");

/* A simple scan only requires the table name */
let params = {
    TableName: "CryptoData"
};

//Create client for accessing DynamoDB
let documentClient = new AWS.DynamoDB.DocumentClient();

/* Returns all data from CryptoTable */
exports.handler = (event, context, callback) => {
    //Scan table to retrieve all data
    documentClient.scan(params, (err, data) => {
        if (err) {
            console.log("\nERROR:\n" + err + "\n");

            //Generate an error without sending back to client.
            callback(err);
        }
        else {
            console.log("\nDATA:\n" + JSON.stringify(data) + "\n");

            //Create object to set status code and hold error
            let response = {
                statusCode: 200,
                body: JSON.stringify(data)

            }
            callback(null, response);
        }
    });
};

