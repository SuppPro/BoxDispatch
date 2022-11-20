/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxFailure(clientAPI) {

    const err = clientAPI.actionResults.SaveScannedBox.error;

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/FailureMessage.action",
        "Properties": {
            "Message": err
        }
    });
}
