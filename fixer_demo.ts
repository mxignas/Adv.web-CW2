import {NomicHistorical} from './fixer_types'

//Time library that we will use to increment dates.
const moment = require('moment');

//Axios will handle HTTP requests to web service
const axios = require ('axios');

//Reads keys from .env file
const dotenv = require('dotenv');

//Copy variables in file into environment variables
dotenv.config();



//Class that wraps fixer.io web service
export class Fixer {
    
    //Base URL of fixer.io API
    baseURL: string = 'https://api.nomics.com/v1';

    //Returns a Promise that will get the exchange rates for the specified date
    getHistoricalRates(startDate: string, endDate: string): Promise<object> {
        //Build URL for API call
        let url:string = this.baseURL + "/currencies/sparkline?key=";
        url += process.env.NOMICS_API_KEY + "&ids=BTC,ETH,XRP&start=";
        url += startDate + "&end=" + endDate;

        //Output URL and return Promise
        console.log("Building fixer.io Promise with URL: " + url);
        return axios.get(url);
    }
}


//Gets the historical data for a range of dates.
async function getHistoricalData(startDate2: string, endDate2: string, numDays: number){
    /* You should check that the start date plus the number of days is
    less than the current date*/

    //Create moment date, which will enable us to add days easily.
    let startDate = moment(startDate2);
    let endDate = moment(endDate2);

    //Create instance of Fixer.io class
    let fixerIo: Fixer = new Fixer();

    //Array to hold promises
    let promiseArray: Array<Promise<object>> = [];

    //Work forward from start date
    for(let i: number =0; i<numDays; ++i){
        //Add axios promise to array
        promiseArray.push(fixerIo.getHistoricalRates("2018-04-14T00%3A00%3A00Z", "2018-04-14T00%3A00%3A00Z")); 

        //Increase the number of days
        startDate.add(1, 'days');
        endDate.add(1, 'days');
    }

    //Wait for all promises to execute
    try {
        let resultArray: Array<object> = await Promise.all(promiseArray);

        //Output the data
        resultArray.forEach((result)=>{ 
            //console.log(result);
            //data contains the body of the web service response
            let data: NomicHistorical[] = result['data'];
            console.log(data);

                //Output the result - you should put this data in the database
                for(let dt of data){
                    console.log("currency: " + dt.currency +
                        " timestamps: " + dt.timestamps +
                        " prices: " + dt.prices
                    );
                }
        });
    }
    catch(error){
        console.log("Error: " + JSON.stringify(error));
    }
}

//Call function to get historical data
getHistoricalData("2018-04-14", "2018-04-14", 1);