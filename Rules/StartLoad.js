/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function StartLoad(clientAPI) {

    clientAPI.getPageProxy().setActionBarItemVisible(0, false); // set start load button visible false
    clientAPI.getPageProxy().setActionBarItemVisible(1, true); // set stop load button visible true
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setEnable(true);
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:Attachment').setVisible(true);

    let sdate = new Date();
    let month = checkLength((sdate.getMonth() + 1).toString());
    let date = checkLength(sdate.getDate().toString());
    let hrs = checkLength(sdate.getHours().toString());
    let mins = checkLength(sdate.getMinutes().toString());
    let sec = checkLength(sdate.getSeconds().toString());

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PickCount = 0;

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LoadingsTime = hrs + mins + sec;
    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LoadingsDate = sdate.getFullYear() + month + date;
}

function checkLength(field) {
    if (field.length < 2) {
        return "0" + field;
    } else {
        return field;
    }
}
