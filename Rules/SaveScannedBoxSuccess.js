/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxSuccess(clientAPI) {

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");

    const data = clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data"),
        str = data.split('DispatchDetailsSet')[1];

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.unshift({
        "InvoiceNo": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/InvoiceNo"),
        "BoxId": str.substring(str.indexOf("=") + 2, str.indexOf(",") - 1)
    });

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action"
    });
}
