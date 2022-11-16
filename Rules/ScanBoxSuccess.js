/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ScanBoxSuccess(clientAPI) {

    const hd = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;

    if (hd.LoadingsDate) {
        let box = "", plate = "", label = "";
        const scannedResult = clientAPI.getActionResult('ScanBox').data;

        if (scannedResult.length === 17) {
            box = scannedResult;
        } else if (scannedResult.length === 30) {
            plate = scannedResult.split(":")[0];
        } else if (scannedResult.length === 27) {
            label = scannedResult;
        } else {
            return clientAPI.executeAction({
                'Name': "/BoxDispatch/Actions/FailureMessage.action",
                "Properties": {
                    "Message": "Please scan a valid sticker to proceed"
                }
            });
        }
        return clientAPI.executeAction({
            // ValidateScannedSticker
            'Name': "/BoxDispatch/Actions/SaveScannedBox.action",
            "Properties": {
                "Target": {
                    // EntitySet
                    "ReadLink": validatePath(box, plate, label, hd.DispatchId)
                }
            }
        });
    } else {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": "Please press Start and try again"
            }
        });
    }
}

function validatePath(box, plate, label, dispatchId) {
    var oPath = "DispatchDetailsSet(";
    oPath += box !== "" ? "BoxId='" + box + "'," : "BoxId='',";
    oPath += plate !== "" ? "LicensePlate='" + plate + "'," : "LicensePlate='',";
    oPath += label !== "" ? "LabelId='" + label + "'," : "LabelId='',";
    oPath += "DispatchId='" + dispatchId + "')";
    return oPath;
}
