/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function GenerateDispatchSuccessOk(clientAPI) {

    const dispatchId = clientAPI.evaluateTargetPath("#ActionResults:GenerateDispatchID/data/DispatchId");

    clientAPI.getPageProxy().getClientData().HeaderDetail.DispatchId = dispatchId;

    return clientAPI.executeAction({
        'Name': "/BoxDispatch/Actions/NavToBoxLoad.action"
    });
}
