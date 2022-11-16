/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateDispatchHeader(clientAPI) {

    clientAPI.getPageProxy().getClientData().HeaderDetail = {};

    let state, control, validationResult = [];

    ["DriverName", "VehicleNo", "TransporterId"].forEach(controlName => {
        state = true;
        control = clientAPI.evaluateTargetPath('#Page:Main/#Control:' + controlName);
        switch (controlName) {
            case "DriverName":
            case "VehicleNo":
                if (!control.getValue()) {
                    state = false;
                } else {
                    clientAPI.getPageProxy().getClientData().HeaderDetail[controlName] = control.getValue();
                }
                break;
            case "TransporterId":
                if (control.getValue().length === 0) {
                    state = false;
                } else {
                    clientAPI.getPageProxy().getClientData().HeaderDetail.TransporterId = control.getValue()[0].ReturnValue;
                    clientAPI.getPageProxy().getClientData().HeaderDetail.Transporter = control.getValue()[0].DisplayValue;
                }
                break;
        }
        validationResult.push(state);
        control.clearValidation();
        if (!state) {
            control.setValidationProperty('ValidationMessage', control.getCaption() + " Required");
            control.setValidationProperty('ValidationMessageColor', "FF0000");
        }
    });
    if (validationResult.every(state => state === true)) {
        let license = clientAPI.evaluateTargetPath('#Page:Main/#Control:DriverLicense').getValue() || "";
        clientAPI.getPageProxy().getClientData().HeaderDetail.DriverLicense = license;
        return true;
    } else {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": "Please correct error's to proceed"
            }
        });
    }
}
