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

    let val = "";
    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.forEach((item, index) => {
        val += index + 1 + ". InvoiceNo : " + item.InvoiceNo + ", BoxId : " + item.BoxId + "\r\n";
    });
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:FormCellNote').setValue(val);

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action"
    });
}
