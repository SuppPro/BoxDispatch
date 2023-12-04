/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function uploadAttachment(clientAPI) {

    const attachments = clientAPI.getClientData().AddedAttachments;

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.File = attachments[attachments.length - 1].urlString;

    clientAPI.executeAction("/BoxDispatch/Actions/UploadAttachment.action");
}
