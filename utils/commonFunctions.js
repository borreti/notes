import * as dynamoDbLib from '../utils/dynamodblib';

/**
 * Get an note from the database using his id
 * @param {*} nid the note id to make the query
 */

export async function queryNote(nid){
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

    const result = await dynamoDbLib.call("query", note_params);
    return result;
}

/**
 * Parse the json comming from the event
 * @param {*} event aws event
 */

export function basicRoutine(event){
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

/**
 * Could realize an insert or an update in the database. If the given noteID doesnt exist, an insert will
 * be realized, else if the noteID exist, the data will be updated
 * @param {*} nid the noteID
 * @param {*} usrid the userID
 * @param {*} title title of the note
 * @param {*} note_body the body of the note
 */
export async function put(nid, usrid, title, note_body){
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