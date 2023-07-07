/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxFailure(clientAPI) {

    const err = clientAPI.actionResults.SaveScannedBox.error.responseBody,
        msg = JSON.parse(err).message;

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/FailureMessage.action",
        "Properties": {
            "Message": msg
        }
    });
}
