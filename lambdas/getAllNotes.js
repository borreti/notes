import * as dynamoDbLib from '../utils/dynamodblib';
import {success, failure} from '../utils/responselib';

/**
 * Entry point
 * @param {*} event aws event
 * @param {*} context aws context
 * @return {*} http response
 */

export async function handler(event, context){
    const params = {
        TableName: "notes-database",
        IndexName: 'note-index',
        ProjectionExpression: "title",
        ExpressionAttributeNames: {
            "#notedesc": "note_desc"
        },
        ExpressionAttributeValues: {
            ":desc": "NOTE"
        },
        KeyConditionExpression: "#notedesc = :desc"
    }

    const result = await dynamoDbLib.call("query", params);
    // console.log("RESULT: ", result);
    if(result.Items.length > 0){
        return success(result.Items);
    }
    else{
        return failure(404, {"msg": "There is no item on dynamodb"})
    }
}