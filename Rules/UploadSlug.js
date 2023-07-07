/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function UploadSlug(clientAPI) {

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PickCount += 1;

    return clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.DispatchId + "/"
        + "PIC" + clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PickCount + "/"
        + "Photo" + clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PickCount + ".jpg";
}
