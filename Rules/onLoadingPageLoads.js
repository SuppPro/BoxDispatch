/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onLoadingPageLoads(clientAPI) {

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem = [];
}
