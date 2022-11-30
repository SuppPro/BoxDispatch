/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxSuccess(clientAPI) {

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.unshift({
        "InvoiceNo": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/InvoiceNo"),
        "BoxId": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/BoxId")
    });

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action"
    });
}
