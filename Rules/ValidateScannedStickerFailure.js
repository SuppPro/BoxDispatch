/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateScannedStickerFailure(clientAPI) {

    const err = clientAPI.actionResults.ValidateScannedSticker.error;
    // responseBody

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
