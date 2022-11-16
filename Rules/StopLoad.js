/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function StopLoad(clientAPI) {

    let sdate = new Date();
    let month = checkLength((sdate.getMonth() + 1).toString());
    let date = checkLength(sdate.getDate().toString());
    let hrs = checkLength(sdate.getHours().toString());
    let mins = checkLength(sdate.getMinutes().toString());
    let sec = checkLength(sdate.getSeconds().toString());

    let head = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;
    head.LoadingeTime = hrs + mins + sec;
    head.LoadingeDate = sdate.getFullYear() + month + date;

    const items = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem;
    if (items.length > 0) {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/StopBoxLoading.action",
            "Properties": {
                "Target": {
                    "ReadLink": "DispatchDetailsSet(BoxId='" + items[items.length - 1].BoxId + "',LicensePlate='',LabelId='',DispatchId='" + head.DispatchId + "')"
                }
            }
        });
    } else {
        return clientAPI.executeAction({
            'Name': "/BoxDispatch/Actions/FailureMessage.action",
            "Properties": {
                "Message": "No box scanned in dispatch ID " + head.DispatchId + ", Please scan atleast one to proceed"
            }
        });
    }
}

function checkLength(field) {
    if (field.length < 2) {
        return "0" + field;
    } else {
        return field;
    }
}
