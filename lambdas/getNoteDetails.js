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

    // ToDo: Make this captured with cognito
    const usrid = "robert";

    const params = {
        TableName: "notes-database",
        // IndexName: 'note-index',
        ExpressionAttributeNames: {
            // "#notedesc": "note_desc",
            "#userIdentifier": "userID",
            "#noteIdentifier": "noteID"
        },
        ExpressionAttributeValues: {
            // ":desc": "NOTE",
            ":nid": event.pathParameters.noteid,
            ":uid": usrid
        },
        KeyConditionExpression: "#noteIdentifier = :nid and #userIdentifier = :uid"
        // FilterExpression: "#noteIdentifier = :nid"
    };

    const result = await dynamoDbLib.call("query", params);
    // console.log("RESULT: ", result);
    if(result.Items.length > 0){
        return success(result.Items);
    }
    else{
        return failure(404, {"msg": "The query doesn't found any results. Check the ID that you passed."});
    }
}