/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function SaveScannedBoxFailure(clientAPI) {

    const err = clientAPI.actionResults.SaveScannedBox.error.responseBody,
        errString = err.split("message")[2].split(",")[0],
        error = errString.substring(3, errString.length - 1);

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");

    if (err.split(",")[0].includes("S")) {
        const msg = clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox").error.message,
            bId = msg.split('BoxId=')[1].split(',')[0];
        // invNo = msg.split('message')[2].split(" ")[3];

        let val = "";
        if (!msg.split('message')[2].includes("removed from the Dispatch Id")) {
            clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.push({
                "InvoiceNo": error.split("invoice")[1].trim(),
                "BoxId": bId.substring(1, bId.length - 1)
            });

            clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.forEach((item, index) => {
                val += index + 1 + ". Invoice No : " + item.InvoiceNo + ", Box Id : " + item.BoxId + "\r\n";
            });
        } else {
            const items = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.filter(item => item.BoxId !== bId.substring(1, bId.length - 1));
            clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem = items;
            if (items.length > 0) {
                items.forEach((item, index) => {
                    val += index + 1 + ". Invoice No : " + item.InvoiceNo + ", Box Id : " + item.BoxId + "\r\n";
                });
            }
        }
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:FormCellNote').setValue(val);

        let head = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;
        head.Count = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.length;

        // errString.message
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action",
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
