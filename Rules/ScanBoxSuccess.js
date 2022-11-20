/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ScanBoxSuccess(clientAPI) {

    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').clearValidation();

    const scannedResult = clientAPI.getValue();
    let box = "", plate = "", label = "";

    if (scannedResult.length === 17) {
        box = scannedResult;
    } else if (scannedResult.length === 30) {
        plate = scannedResult.split(":")[0];
    } else if (scannedResult.length === 27) {
        label = scannedResult;
    } else {
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValidationProperty('ValidationMessage', "Please scan a valid sticker");
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValidationProperty('ValidationMessageColor', "FF0000");
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').redraw();
        return;
    }

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.BoxId = box;
    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LicensePlate = plate;
    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LabelId = label;

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/SaveScannedBox.action",
        "Properties": {
            "Target": {
                "ReadLink": getPath(box, plate, label, clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.DispatchId)
            }
        }
    });
}

function getPath(box, plate, label, dispatchId) {
    var oPath = "DispatchDetailsSet(";
    oPath += box !== "" ? "BoxId='" + box + "'," : "BoxId='',";
    oPath += plate !== "" ? "LicensePlate='" + plate + "'," : "LicensePlate='',";
    oPath += label !== "" ? "LabelId='" + label + "'," : "LabelId='',";
    oPath += "DispatchId='" + dispatchId + "')";
    return oPath;
}
