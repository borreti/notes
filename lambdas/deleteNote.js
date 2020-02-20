import * as dynamoDbLib from '../utils/dynamodblib';
import {success, failure} from '../utils/responselib';

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
    const usrid = "robert";

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
    return success({statusMessage: "The item was deleted successfully!"});
    // if(result.Items.length > 0){
    //     return success(result.Items);
    // }
    // else{
    //     return failure(404, {"msg": "The query doesn't found any results. Check the ID that you passed."});
    // }
}