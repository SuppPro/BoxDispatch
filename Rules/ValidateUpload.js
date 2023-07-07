/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function ValidateUpload(clientAPI) {

    const items = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem;
    if (items.length > 0) {
        if (clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PickCount > 10) {
            return clientAPI.executeAction({
                'Name': "/BoxDispatch/Actions/FailureMessage.action",
                "Properties": {
                    "Message": "You can add maximum 10 photos"
                }
            });
        } else {
            return true;
        }
    } else {
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:Attachment').setValue("");
        clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:Attachment').redraw();
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": "Please scan atleast one box to add photos"
            }
        });
    }
}
