/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function StopBoxLoadingFailure(clientAPI) {

    const err = clientAPI.actionResults.StopBoxLoading.error.responseBody,
        errString = err.split("message")[2].split(",")[0],
        error = errString.substring(3, errString.length - 1);
    // errString = JSON.parse(err);

    // errString.message
    if (err.split(",")[0].includes("W")) {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/StopBoxLoadingFailureMessage.action",
            "Properties": {
                "Message": error
            }
        });
    } else {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": error
            }
        });
    }
}
