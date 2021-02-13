namespace twitter_demo_1 {
//Module that reads keys from .env file
const dotenv = require('dotenv');

//Node Twitter library
const Twitter = require('twitter');

//Copy variables in file into environment variables
dotenv.config();

//Set up the Twitter client with the credentials
let client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_KEY_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_TOKEN_SECRET
});

//Downloads and outputs tweet text
async function searchTweets(keyword: string){
    try{
        //Set up parameters for the search
        let searchParams = {
            q: keyword,
            count: 10,
            lang: "en"
        };

        //Wait for search to execute asynchronously
        let result = await client.get('search/tweets', searchParams);
        //console.log(JSON.stringify(result));

        //Output the result
        result.statuses.forEach((tweet)=>{
            console.log("Tweet id: " + tweet.id + ". Tweet text: " + tweet.text);
        });
    }
    catch(error){
        console.log(JSON.stringify(error));
    }
};

//Call function to search for tweets with specified subject
searchTweets("Middlesex University");

}