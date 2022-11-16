/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxFailure(clientAPI) {

    const err = clientAPI.actionResults.SaveScannedBox.error;

    // let errMsg = "An error occurred while processing your request";

    // if (err.search("already been created") > 0) {
    //     errMsg = "Dispatch has already been created for the scanned box";
    // }

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/FailureMessage.action",
        "Properties": {
            "Message": err
        }
    });
}
