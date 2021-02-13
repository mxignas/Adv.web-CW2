import { NomicHistorical } from './fixer_types'
namespace PutDemo {

    //Time library that we will use to increment dates.
    const moment = require('moment');

    //Axios will handle HTTP requests to web service
    const axios = require('axios');

    //Reads keys from .env file
    const dotenv = require('dotenv');

    //Copy variables in file into environment variables
    dotenv.config();

    let AWS = require("aws-sdk");

    AWS.config.update({
        region: "us-east-1",
        endpoint: "https://dynamodb.us-east-1.amazonaws.com"
    });

    //Create new DocumentClient
    let documentClient = new AWS.DynamoDB.DocumentClient();

    //Class that wraps nomics web service
    export class Fixer {
        //Base URL of nomics API
        baseURL: string = 'https://api.nomics.com/v1';

        //Returns a Promise that will get the exchange rates for the specified date
        getHistoricalRates(startDate: string, endDate: string): Promise<object> {
            //Build URL for API call
            let url: string = this.baseURL + "/currencies/sparkline?key=";
            url += process.env.NOMICS_API_KEY + "&ids=XRP,BTC&start=";
            url += startDate + "&end=" + endDate;

            //Output URL and return Promise
            console.log("Building nomics Promise with URL: " + url);
            return axios.get(url);
        }
    }


    //Array to hold promises
    let promiseArray: Array<Promise<object>> = [];
    let resArray:Array<object> = [];
    let promiseIndex = 0;    

    //Gets the historical data for a range of dates.
    async function getHistoricalData(startDate2: string, endDate2: string, numDays: number) {

        //Create moment date, which will enable us to add days easily.
        let startDate = moment(startDate2);
        let endDate = moment(endDate2);

        //Create instance of nomics class
        let fixerIo: Fixer = new Fixer();
        
        //Work forward from start date
        for (let i: number = 0; i < numDays; ++i) {
            //Add axios promise to array
            promiseArray.push(fixerIo.getHistoricalRates(startDate.format("YYYY-MM-DD") + "T00%3A00%3A00Z", endDate.format("YYYY-MM-DD") + "T00%3A00%3A00Z"));

            //Increase the number of days
            startDate.add(1, 'days');
            endDate.add(1, 'days');
        }

        //Wait for all promises to execute
        try {
            let resultArray: Array<object> = await Promise.all(promiseArray);

            //Output the data
            resultArray.forEach((result) => {
                //console.log(result);
                //data contains the body of the web service response
                let data: NomicHistorical[] = result['data'];
                console.log(data);

                for(let dt of data) {
                //Table name and data for table
                let params = {
                    TableName: "CryptoCurr",
                    Item: 
                        {
                        'PriceTimeStamp': moment(dt.timestamps).unix(),
                            'Currency': dt.currency,
                            'Price': parseFloat(dt.prices)
                        }
                    
                };
                    //Store data in DynamoDB and handle errors
                    documentClient.put(params, (err, data) => {
                        if (err) {
                            console.error("Unable to add item", params.Item.Currency);
                            console.error("Error JSON:", JSON.stringify(err));
                        }
                        else {
                            console.log("Currency added to table:", params.Item.Currency);
                        }
                    })
                }
        });
        }
        catch (error) {
            console.log("Error: " + JSON.stringify(error));
        }
    }

    //Call function to get historical data
    
    getHistoricalData("2017-04-14", "2017-04-14", 5);

}