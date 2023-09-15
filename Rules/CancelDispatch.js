/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function CancelDispatch(clientAPI) {

    const head = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/CancelDispatch.action",
        "Properties": {
            "Target": {
                "ReadLink": "DispatchDetailsSet(BoxId='',LicensePlate='',LabelId='',DispatchId='" + head.DispatchId + "')"
            }
        }
    });
}
