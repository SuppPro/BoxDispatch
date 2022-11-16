/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateScannedStickerSuccess(clientAPI) {

    const dispatchId = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.DispatchId,
        data = clientAPI.evaluateTargetPath("#ActionResults:ValidateScannedSticker").data._array[0];

    if (!data.InvoiceNo) {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": "Scanned box not available in the system"
            }
        });
    } else {
        clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.BoxId = data.BoxId;

        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/SaveScannedBox.action",
            "Properties": {
                "Target": {
                    "ReadLink": "DispatchDetailsSet(BoxId='" + data.BoxId + "',LicensePlate='" + data.LicensePlate + "',LabelId='" + data.LabelId + "',DispatchId='" + dispatchId + "')"
                }
            }
        });
    }
}
