import * as dynamoDbLib from '../utils/dynamodblib';
import {success, failure} from '../utils/responselib';

/**
 * Entry point
 * @param {*} event aws event
 * @param {*} context aws context
 * @return {*} http response
 */

export async function insert(event, context){
    // ToDo: make the user captured from cognito
    const usrid = "robert";
    const _parsed = basicRoutine(event);
    const nid = String(Date.now());

    await put(nid, usrid, _parsed.title, _parsed.note_body);

    return query(nid);
}

export async function update(event, context){
    if (!("pathParameters" in event) || !(event.pathParameters))
        return failure(404, {msg: "There is no path parameters!"});

    if (!(event.pathParameters.noteid))
        return failure(404, {msg: "There is no noteid to make the query!"});

    const title = null;
    const note_body = null;

    if(event.pathParameters.title)
        title = event.pathParameters.title;
    
    if(event.pathParameters.note_body)
        note = event.pathParameters.note_body;

    // ToDo: make the user captured from cognito
    const usrid = "robert";
    const _parsed = basicRoutine(event);

}

function query(nid){
    const result = await dynamoDbLib.call("query", note_params);

    const note_params = {
        TableName: "notes-database",
        ExpressionAttributeNames: {
            "#noteIdentifier": "noteID"
        },
        ExpressionAttributeValues: {
            ":nid": nid
        },
        KeyConditionExpression: "#noteIdentifier = :nid"
    };

    if(result.Items.length > 0){
        return success(result.Items[0]);
    }
    else{
        return failure(404, {"msg": "The insert failed for some reason. Check the fields and try again!"});
    }
}

function basicRoutine(event){
    let _parsed;
    try{
        _parsed = JSON.parse(event.body);
        return _parsed;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

async function put(nid, usrid, title, note_body){
    const params = {
        TableName: "notes-database",
        Item: {
            noteID: nid,
            userID: usrid,
            note_desc: "NOTE",
            title: title,
            note_body: note_body
        }
    };

    await dynamoDbLib.call("put", params);
}