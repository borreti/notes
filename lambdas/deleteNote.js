import * as dynamoDbLib from '../utils/dynamodblib';
import {success, failure} from '../utils/responselib';
const util = require('util')

/**
 * Entry point
 * @param {*} event aws event
 * @param {*} context aws context
 * @return {*} http response
 */

export async function handler(event, context){
    if (!("pathParameters" in event) || !(event.pathParameters))
        return failure(404, {msg: "There is no path parameters!"});

    if (!(event.pathParameters.noteid))
        return failure(404, {msg: "There is no noteid to make the query!"});

    // ToDo: make the user captured from cognito
    const usrid = "robert"

    const params = {
        TableName: "notes-database",
        // ExpressionAttributeNames: {
        //     "#noteIdentifier": "noteID"
        // },
        // ExpressionAttributeValues: {
        //     ":nid": event.pathParameters.noteid
        // },
        Key: {
            noteID: event.pathParameters.noteid,
            userID: usrid
        }
    };

    const result = await dynamoDbLib.call("delete", params);
    return success({item_deleted: "If the item exists, the delete was a success. If not, we will never know, because there is no error message"});
    // if(result.Items.length > 0){
    //     return success(result.Items);
    // }
    // else{
    //     return failure(404, {"msg": "The query doesn't found any results. Check the ID that you passed."});
    // }
}