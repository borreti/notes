import {success, failure} from '../utils/responselib';
import {queryNote, basicRoutine, put} from '../utils/commonFunctions';

/**
 * Entry point
 * @param {*} event aws event
 * @param {*} context aws context
 * @return {*} http response
 */

export async function handler(event, context){
    // ToDo: make the user captured from cognito
    const usrid = "robert";
    const _parsed = basicRoutine(event);
    const nid = String(Date.now());

    await put(nid, usrid, _parsed.title, _parsed.note_body);

    const arrayNotesGetedFromDb = await queryNote(nid);
    return validateResult(arrayNotesGetedFromDb, "insert");
}

/**
 * Validate the array geted from an query
 * @param {*} result the array containing the dicts with the info
 */

export function validateResult(result){
    if(result.Items.length > 0){
        return success(result.Items[0]);
    }
    else{
        return failure(404, {"msg ": "The insert failed for some reason. Check the fields and try again!"});
    }
}