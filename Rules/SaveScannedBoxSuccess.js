/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxSuccess(clientAPI) {

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.unshift({
        "InvoiceNo": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/InvoiceNo"),
        "BoxId": clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.BoxId,
        "ItemNo": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/ItemNo")
    });

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action"
    });
}
