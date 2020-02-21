import * as dynamoDbLib from '../utils/dynamodblib';
import {success, failure} from '../utils/responselib';
import {queryNote, basicRoutine, put} from '../utils/commonFunctions';

export async function handler(event, context){
    if (!("pathParameters" in event) || !(event.pathParameters))
        return failure(404, {msg: "There is no path parameters!"});

    if (!(event.pathParameters.noteid))
        return failure(404, {msg: "There is no noteid to make the query!"});

    // ToDo: make the user captured from cognito
    const usrid = "robert";
    const _parsed = basicRoutine(event);

    let title;
    let note_body;
    const nid = event.pathParameters.noteid;


    let noteGetedFromDb = await queryNote(nid);
    noteGetedFromDb = noteGetedFromDb.Items;

    if(noteGetedFromDb.length === 0)
        return success({statusCode: 204, msg: "The update was realized successfully!"});
    else
        noteGetedFromDb = noteGetedFromDb[0];


    if(_parsed != false){
        // if(_parsed.title)
        //     title = event.pathParameters.title;
        // else
        //     title = noteGetedFromDb.title;

        // if(_parsed.note_body)
        //     note_body = event.pathParameters.note_body;
        // else
        //     note_body = noteGetedFromDb
        title = checkParsed(_parsed, "title", noteGetedFromDb.title);
        note_body = checkParsed(_parsed, "note_body", noteGetedFromDb.note_body);
        console.log("title: " + title + "\n" + "noteBody: " + note_body);
        await put(nid, usrid, title, note_body);
    }

    return success({statusCode: 200, msg: "The update was realized successfully!"});
}

function checkParsed(_parsed, property, alternative_value){
    let value;
    if(_parsed[property])
        value = _parsed[property];
    else
        value = alternative_value;
    return value;
}