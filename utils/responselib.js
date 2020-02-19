/**
 * Success http response
 * @export
 * @param {*} body the body to send
 * @return {*} formatted http return for a lambda
 */
export function success(body) {
    return buildResponse(200, body);
  }

  /**
   * Failure http response
   * @export
   * @param {*} body the body to send
   * @return {*} formatted http return for a lambda
   */
  export function failure(status, body) {
    return buildResponse(status, body);
  }

  /**
   * Builds an lambda acceptable http response
   * @param {*} statusCode the status code to return
   * @param {*} body the body to resturn
   * @return {*} The http formatted response
   */
  function buildResponse(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
      },
      body: JSON.stringify(body),
    };
  }