exports.handler = async (event, context) => {
    //Output the event that triggered this function
    console.log("\nEVENT:\n" + JSON.stringify(event) + "\n");

    //Output the context
    console.log("\nCONTEXT:\n" + JSON.stringify(context) + "\n");

    //Build response to send back to user
    const response = {
        statusCode: 200,
        body: 'CSD 3205: Hello ' + event.Name + ' from Lambda!'
    };
    return response;
};

