exports.handler = (event, context) => {

    //Data saved in DynamnoDB
    // {
    //     "PriceTimeStamp": 203,
    //     "Currency": "bitcoin",
    //     "Price" : 4567
    // }

    //Output data to logs
    event.Records.forEach(record =>{
        console.log(JSON.stringify(record.dynamodb.NewImage));
    });
};

