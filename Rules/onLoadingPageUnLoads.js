/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function onLoadingPageUnLoads(clientAPI) {

    clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail = {};

    ["DriverName", "DriverLicense", "VehicleNo", "TransporterId"].forEach(element => {
        clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
    });
}
