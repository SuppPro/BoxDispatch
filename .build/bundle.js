(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./build.definitions/BoxDispatch/i18n/i18n.properties":
/*!************************************************************!*\
  !*** ./build.definitions/BoxDispatch/i18n/i18n.properties ***!
  \************************************************************/
/***/ ((module) => {

module.exports = ""

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/AppUpdateFailure.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/AppUpdateFailure.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function AppUpdateFailure(clientAPI) {
  let result = clientAPI.actionResults.AppUpdate.error.toString();
  var message;
  console.log(result);
  if (result.startsWith('Error: Uncaught app extraction failure:')) {
    result = 'Error: Uncaught app extraction failure:';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body: 404 Not Found: Requested route')) {
    result = 'Application instance is not up or running';
  }
  if (result.startsWith('Error: LCMS GET Version Response Error Response Status: 404 | Body')) {
    result = 'Service instance not found.';
  }
  switch (result) {
    case 'Service instance not found.':
      message = 'Mobile App Update feature is not assigned or not running for your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response Error Response Status: 404 | Body: Failed to find a matched endpoint':
      message = 'Mobile App Update feature is not assigned to your application. Please add the Mobile App Update feature, deploy your application, and try again.';
      break;
    case 'Error: LCMS GET Version Response failed: Error: Optional(OAuth2Error.tokenRejected: The newly acquired or refreshed token got rejected.)':
      message = 'The Mobile App Update feature is not assigned to your application or there is no Application metadata deployed. Please check your application in Mobile Services and try again.';
      break;
    case 'Error: Uncaught app extraction failure:':
      message = 'Error extracting metadata. Please redeploy and try again.';
      break;
    case 'Application instance is not up or running':
      message = 'Communication failure. Verify that the BindMobileApplicationRoutesToME Application route is running in your BTP space cockpit.';
      break;
    default:
      message = result;
      break;
  }
  return clientAPI.getPageProxy().executeAction({
    "Name": "/BoxDispatch/Actions/AppUpdateFailureMessage.action",
    "Properties": {
      "Duration": 0,
      "Message": message
    }
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/AppUpdateSuccess.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/AppUpdateSuccess.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AppUpdateSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}
function AppUpdateSuccess(clientAPI) {
  var message;
  // Force a small pause to let the progress banner show in case there is no new version available
  return sleep(500).then(function () {
    let result = clientAPI.actionResults.AppUpdate.data;
    console.log(result);
    let versionNum = result.split(': ')[1];
    if (result.startsWith('Current version is already up to date')) {
      return clientAPI.getPageProxy().executeAction({
        "Name": "/BoxDispatch/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Message": `You are already using the latest version: ${versionNum}`,
          "NumberOfLines": 2
        }
      });
    } else if (result === 'AppUpdate feature is not enabled or no new revision found.') {
      message = 'No Application metadata found. Please deploy your application and try again.';
      return clientAPI.getPageProxy().executeAction({
        "Name": "/BoxDispatch/Actions/AppUpdateSuccessMessage.action",
        "Properties": {
          "Duration": 5,
          "Message": message,
          "NumberOfLines": 2
        }
      });
    }
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/CancelDispatch.js":
/*!***************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/CancelDispatch.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CancelDispatch)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function CancelDispatch(clientAPI) {
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

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/GenerateDispatchSuccessOk.js":
/*!**************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/GenerateDispatchSuccessOk.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GenerateDispatchSuccessOk)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function GenerateDispatchSuccessOk(clientAPI) {
  const dispatchId = clientAPI.evaluateTargetPath("#ActionResults:GenerateDispatchID/data/DispatchId");
  clientAPI.getPageProxy().getClientData().HeaderDetail.DispatchId = dispatchId;
  return clientAPI.executeAction({
    'Name': "/BoxDispatch/Actions/NavToBoxLoad.action"
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/OnWillUpdate.js":
/*!*************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/OnWillUpdate.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ OnWillUpdate)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function OnWillUpdate(clientAPI) {
  return clientAPI.executeAction('/BoxDispatch/Actions/OnWillUpdate.action').then(result => {
    if (result.data) {
      return Promise.resolve();
    } else {
      return Promise.reject('User Deferred');
    }
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/SaveScannedBoxFailure.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/SaveScannedBoxFailure.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveScannedBoxFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SaveScannedBoxFailure(clientAPI) {
  const err = clientAPI.actionResults.SaveScannedBox.error.responseBody,
    errString = err.split("message")[2].split(",")[0],
    error = errString.substring(3, errString.length - 1);
  clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");
  if (err.split(",")[0].includes("S")) {
    const msg = clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox").error.message,
      bId = msg.split('BoxId=')[1].split(',')[0];
    // invNo = msg.split('message')[2].split(" ")[3];

    let val = "";
    if (!msg.split('message')[2].includes("removed from the Dispatch Id")) {
      clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.push({
        "InvoiceNo": error.split("invoice")[1].trim(),
        "BoxId": bId.substring(1, bId.length - 1)
      });
      clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.forEach((item, index) => {
        val += index + 1 + ". Invoice No : " + item.InvoiceNo + ", Box Id : " + item.BoxId + "\r\n";
      });
    } else {
      const items = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.filter(item => item.BoxId !== bId.substring(1, bId.length - 1));
      clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem = items;
      if (items.length > 0) {
        items.forEach((item, index) => {
          val += index + 1 + ". Invoice No : " + item.InvoiceNo + ", Box Id : " + item.BoxId + "\r\n";
        });
      }
    }
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:FormCellNote').setValue(val);
    let head = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;
    head.Count = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.length;

    // errString.message
    return clientAPI.executeAction({
      'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action",
      "Properties": {
        "Message": error
      }
    });
  } else {
    return clientAPI.executeAction({
      'Name': "/BoxDispatch/Actions/FailureMessage.action",
      "Properties": {
        "Message": error
      }
    });
  }
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/SaveScannedBoxSuccess.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/SaveScannedBoxSuccess.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SaveScannedBoxSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SaveScannedBoxSuccess(clientAPI) {
  clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValue("");
  const data = clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data"),
    str = data.split('DispatchDetailsSet')[1];
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.push({
    "InvoiceNo": clientAPI.evaluateTargetPath("#ActionResults:SaveScannedBox/data/InvoiceNo"),
    "BoxId": str.substring(str.indexOf("=") + 2, str.indexOf(",") - 1)
  });
  let val = "";
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.forEach((item, index) => {
    val += index + 1 + ". InvoiceNo : " + item.InvoiceNo + ", BoxId : " + item.BoxId + "\r\n";
  });
  clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:FormCellNote').setValue(val);
  let head = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail;
  head.Count = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem.length;
  return clientAPI.executeAction({
    'Name': "/BoxDispatch/Actions/SaveBoxSuccessMessage.action"
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/ScanBoxSuccess.js":
/*!***************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/ScanBoxSuccess.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ScanBoxSuccess)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ScanBoxSuccess(clientAPI) {
  clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').clearValidation();
  const scannedResult = clientAPI.getValue();
  let box = "",
    plate = "",
    label = "";
  if (scannedResult.length === 17 || scannedResult.length === 18) {
    box = scannedResult;
  } else if (scannedResult.length === 30) {
    // plate = scannedResult.split(":")[0];
    plate = scannedResult;
  } else if (scannedResult.length === 27) {
    label = scannedResult;
  } else {
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValidationProperty('ValidationMessage', "Please scan a valid sticker");
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').setValidationProperty('ValidationMessageColor', "FF0000");
    clientAPI.evaluateTargetPath('#Page:BoxLoad/#Control:ScanSticker').redraw();
    return;
  }
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.BoxId = box;
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LicensePlate = plate;
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.LabelId = label;
  return clientAPI.executeAction({
    'Name': "/BoxDispatch/Actions/SaveScannedBox.action",
    "Properties": {
      "Target": {
        "ReadLink": getPath(box, plate, label, clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.DispatchId)
      }
    }
  });
}
function getPath(box, plate, label, dispatchId) {
  var oPath = "DispatchDetailsSet(";
  oPath += box !== "" ? "BoxId='" + box + "'," : "BoxId='',";
  oPath += plate !== "" ? "LicensePlate='" + plate + "'," : "LicensePlate='',";
  oPath += label !== "" ? "LabelId='" + label + "'," : "LabelId='',";
  oPath += "DispatchId='" + dispatchId + "')";
  return oPath;
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/SetLoginIdHeader.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/SetLoginIdHeader.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetHeaders)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SetHeaders(clientAPI) {
  let userId = clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  return userId.substring(1, userId.length);
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/SetLoginTypeHeader.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/SetLoginTypeHeader.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SetLoginTypeHeader)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function SetLoginTypeHeader(clientAPI) {
  let userId = clientAPI.evaluateTargetPath('#Application/#ClientData/UserId');
  return userId.substring(0, 1).toUpperCase();
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/StartLoad.js":
/*!**********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/StartLoad.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StartLoad)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function StartLoad(clientAPI) {
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
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PicCount = 0;
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

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/StopBoxLoadingFailure.js":
/*!**********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/StopBoxLoadingFailure.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StopBoxLoadingFailure)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function StopBoxLoadingFailure(clientAPI) {
  const err = clientAPI.actionResults.StopBoxLoading.error.responseBody,
    errString = err.split("message")[2].split(",")[0],
    error = errString.substring(3, errString.length - 1);
  // errString = JSON.parse(err);

  // errString.message
  if (err.split(",")[0].includes("W")) {
    return clientAPI.executeAction({
      'Name': "/BoxDispatch/Actions/StopBoxLoadingFailureMessage.action",
      "Properties": {
        "Message": error
      }
    });
  } else {
    return clientAPI.executeAction({
      'Name': "/BoxDispatch/Actions/FailureMessage.action",
      "Properties": {
        "Message": error
      }
    });
  }
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/StopLoad.js":
/*!*********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/StopLoad.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StopLoad)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function StopLoad(clientAPI) {
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
        "Message": "No box scanned, Please scan atleast one to proceed"
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

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/UploadSlug.js":
/*!***********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/UploadSlug.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UploadSlug)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function UploadSlug(clientAPI) {
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PicCount += 1;
  return clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.DispatchId + "/" + "PIC" + clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PicCount + "/" + clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.File;
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/ValidateDispatchHeader.js":
/*!***********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/ValidateDispatchHeader.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateDispatchHeader)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateDispatchHeader(clientAPI) {
  clientAPI.getPageProxy().getClientData().HeaderDetail = {};
  let state,
    control,
    validationResult = [];
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

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/ValidateUpload.js":
/*!***************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/ValidateUpload.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ValidateUpload)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function ValidateUpload(clientAPI) {
  const items = clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem;
  if (items.length > 0) {
    if (clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.PicCount > 10) {
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

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/onLoadingPageLoads.js":
/*!*******************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/onLoadingPageLoads.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onLoadingPageLoads)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function onLoadingPageLoads(clientAPI) {
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().LineItem = [];
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/onLoadingPageUnLoads.js":
/*!*********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/onLoadingPageUnLoads.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ onLoadingPageUnLoads)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function onLoadingPageUnLoads(clientAPI) {
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail = {};
  ["DriverName", "DriverLicense", "VehicleNo", "TransporterId"].forEach(element => {
    clientAPI.evaluateTargetPath('#Page:Main/#Control:' + element).setValue("");
  });
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Rules/uploadAttachment.js":
/*!*****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Rules/uploadAttachment.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uploadAttachment)
/* harmony export */ });
/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
function uploadAttachment(clientAPI) {
  const attachments = clientAPI.getClientData().AddedAttachments;
  clientAPI.evaluateTargetPathForAPI('#Page:Main').getClientData().HeaderDetail.File = attachments[attachments.length - 1].urlString;
  clientAPI.executeAction("/BoxDispatch/Actions/UploadAttachment.action");
}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Styles/Styles.css":
/*!*********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Styles/Styles.css ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
div.MDKPage

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/
`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/BoxDispatch/Styles/Styles.less":
/*!**********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Styles/Styles.less ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* The LESS stylesheet provides the ability to define styling styles that can be used to style the UI in the MDK app.

Examples:

@mdkYellow1: #ffbb33;
@mdkRed1: #ff0000;

//// By-Type style: All Pages in the application will now have a yellow background
Page

{ background-color: @mdkYellow1; }
//// By-Name style: All Buttons with _Name == "BlueButton" will now have this style
#BlueButton

{ color: @mdkYellow1; background-color: #0000FF; }
//// By-Class style: These style classes can be referenced from rules and set using ClientAPI setStyle function

.MyButton

{ color: @mdkYellow1; background-color: @mdkRed1; }
*/`, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "./build.definitions/BoxDispatch/Styles/Styles.nss":
/*!*********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Styles/Styles.nss ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js");
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js */ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js");
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js":
/*!************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/api.js ***!
  \************************************************************************************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!*********************************************************************************************************************************!*\
  !*** ../../extbin/local/openvscode-server/extensions/mdk-vsc-wing-23.10.1/node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \*********************************************************************************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./build.definitions/BoxDispatch/Pages/BoxLoad.page":
/*!**********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Pages/BoxLoad.page ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"FilterFeedbackBar":{"ShowAllFilters":true,"_Type":"Control.Type.FilterFeedbackBar"},"_Type":"Control.Type.SectionedTable","_Name":"SectionedTable","Sections":[{"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"_Type":"Section.Type.ProfileHeader","_Name":"ProfileHeader","Visible":true,"ProfileHeader":{"DetailImage":"sap-icon://shipping-status","DetailImageIsCircular":false,"Headline":"Dispatch ID: {#Page:Main/#ClientData/HeaderDetail/DispatchId}","Subheadline":"","ActivityItems":[]}},{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"ScanSticker","IsVisible":true,"Separator":true,"Caption":"Scan","PlaceHolder":"Scan Sticker","OnValueChange":"/BoxDispatch/Rules/ScanBoxSuccess.js","AlternateInput":"Barcode","Enabled":false,"IsEditable":true},{"_Type":"Control.Type.FormCell.Attachment","_Name":"Attachment","IsVisible":false,"Separator":true,"OnValueChange":"/BoxDispatch/Rules/uploadAttachment.js","AttachmentActionType":["AddPhoto","TakePhoto","SelectFile"],"AttachmentTitle":"Add Photos","AllowedFileTypes":["png","jpg"]},{"_Type":"Control.Type.FormCell.Note","_Name":"FormCellNote","IsVisible":true,"Separator":true,"PlaceHolder":"Scanned Boxes","MaxNumberOfLines":1000,"Enabled":false,"IsEditable":false}],"Separators":{"TopSectionSeparator":false,"BottomSectionSeparator":true,"HeaderSeparator":true,"FooterSeparator":true,"ControlSeparator":true},"Visible":true,"EmptySection":{"FooterVisible":false},"_Type":"Section.Type.FormCell","_Name":"SectionFormCell0"}]}],"_Type":"Page","_Name":"BoxLoad","Caption":"Box Loading","PrefersLargeCaption":false,"OnLoaded":"/BoxDispatch/Rules/onLoadingPageLoads.js","OnUnloaded":"/BoxDispatch/Rules/onLoadingPageUnLoads.js","ActionBar":{"Items":[{"_Name":"StartLoad","Caption":"Start","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/BoxDispatch/Rules/StartLoad.js"},{"_Name":"StopLoad","Caption":"Stop","Position":"Right","IsIconCircular":false,"Visible":false,"OnPress":"/BoxDispatch/Actions/StopLoadConfirmation.action"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"ToolbarItem0","Caption":"Cancel","Enabled":true,"Visible":true,"Clickable":true,"ItemType":"Normal","Style":"","OnPress":"/BoxDispatch/Actions/CancelDispatchConfirmation.action"}]}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Pages/Main.page":
/*!*******************************************************!*\
  !*** ./build.definitions/BoxDispatch/Pages/Main.page ***!
  \*******************************************************/
/***/ ((module) => {

module.exports = {"Controls":[{"_Type":"Control.Type.FormCellContainer","_Name":"FormCellContainer0","Sections":[{"Controls":[{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"DriverName","IsEditable":true,"IsVisible":true,"Caption":"Driver Name","PlaceHolder":"Enter Name","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"DriverLicense","IsEditable":true,"IsVisible":true,"Caption":"Driver License","PlaceHolder":"Enter License Number","Enabled":true},{"_Type":"Control.Type.FormCell.SimpleProperty","_Name":"VehicleNo","IsEditable":true,"IsVisible":true,"Caption":"Vehicle Number","PlaceHolder":"Enter Vehicle Number ","KeyboardType":"Default","AlternateInput":"None","Enabled":true},{"validationProperties":{"SeparatorIsHidden":true,"ValidationViewIsHidden":true},"_Type":"Control.Type.FormCell.ListPicker","_Name":"TransporterId","IsEditable":true,"IsVisible":true,"AllowMultipleSelection":false,"AllowEmptySelection":false,"Caption":"Transporter ID","DataPaging":{"ShowLoadingIndicator":false,"PageSize":50},"IsSelectedSectionEnabled":false,"IsPickerDismissedOnSelection":false,"IsSearchCancelledAfterSelection":false,"AllowDefaultValueIfOneItem":false,"PickerItems":{"Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"TransportIdHelpSet"},"DisplayValue":"{TransName}","ReturnValue":"{TransporterId}"}}],"_Name":"FormCellSection0","Caption":"Fill below details to generate dispatch ID","Visible":true}]}],"_Type":"Page","_Name":"Main","Caption":"Box Dispatch","ActionBar":{"Items":[{"_Name":"Generate","Caption":"Generate","Position":"Right","IsIconCircular":false,"Visible":true,"OnPress":"/BoxDispatch/Actions/GenerateDispatchID.action"}],"_Name":"ActionBar1"},"ToolBar":{"Items":[{"_Type":"Control.Type.ToolbarItem","_Name":"Signout","Caption":"Sign Out","Enabled":true,"Visible":true,"Clickable":true,"Style":"","OnPress":"/BoxDispatch/Actions/Logout.action"}]}}

/***/ }),

/***/ "./build.definitions/Application.app":
/*!*******************************************!*\
  !*** ./build.definitions/Application.app ***!
  \*******************************************/
/***/ ((module) => {

module.exports = {"MainPage":"/BoxDispatch/Pages/Main.page","OnLaunch":["/BoxDispatch/Actions/Service/InitializeOnline.action"],"OnWillUpdate":"/BoxDispatch/Rules/OnWillUpdate.js","OnDidUpdate":"/BoxDispatch/Actions/Service/InitializeOnline.action","Styles":"/BoxDispatch/Styles/Styles.less","Version":"/BoxDispatch/Globals/AppDefinition_Version.global","Localization":"/BoxDispatch/i18n/i18n.properties","_SchemaVersion":"6.3","_Name":"BoxDispatch","StyleSheets":{"Styles":{"css":"/BoxDispatch/Styles/Styles.css","ios":"/BoxDispatch/Styles/Styles.nss","android":"/BoxDispatch/Styles/Styles.json"}}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/AppUpdate.action":
/*!****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/AppUpdate.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ApplicationUpdate","ActionResult":{"_Name":"AppUpdate"},"OnFailure":"/BoxDispatch/Rules/AppUpdateFailure.js","OnSuccess":"/BoxDispatch/Rules/AppUpdateSuccess.js"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/AppUpdateFailureMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/AppUpdateFailureMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to update application - {#ActionResults:AppUpdate/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/AppUpdateProgressBanner.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/AppUpdateProgressBanner.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"CompletionTimeout":3,"Message":"Checking for Updates...","OnSuccess":"/BoxDispatch/Actions/AppUpdate.action","_Type":"Action.Type.ProgressBanner"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/AppUpdateSuccessMessage.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/AppUpdateSuccessMessage.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Update application complete","_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/CancelDispatch.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/CancelDispatch.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.DeleteEntity","ActionResult":{"_Name":"CancelDispatch"},"OnFailure":"/BoxDispatch/Actions/FailureMessage.action","OnSuccess":"/BoxDispatch/Actions/ClosePage.action","Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"DispatchDetailsSet"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/CancelDispatchConfirmation.action":
/*!*********************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/CancelDispatchConfirmation.action ***!
  \*********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"CancelDispatchConfirmation"},"Message":"Are you sure to cancel dispatch {#Page:Main/#ClientData/HeaderDetail/DispatchId} ?","Title":"Confirmation","OKCaption":"Yes","OnOK":"/BoxDispatch/Rules/CancelDispatch.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/ClosePage.action":
/*!****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/ClosePage.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ClosePage"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/FailureMessage.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/FailureMessage.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"An error occurred while processing your request. please try again","Title":"Error"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/GenerateDispatchID.action":
/*!*************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/GenerateDispatchID.action ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateEntity","ActionResult":{"_Name":"GenerateDispatchID"},"OnFailure":"/BoxDispatch/Actions/FailureMessage.action","OnSuccess":"/BoxDispatch/Actions/GenerateDispatchSuccess.action","ValidationRule":"/BoxDispatch/Rules/ValidateDispatchHeader.js","ShowActivityIndicator":true,"Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"DispatchDetailsSet"},"Properties":{"BoxId":"","TransporterId":"#Page:Main/#ClientData/HeaderDetail/TransporterId","VehicleNo":"#Page:Main/#Control:VehicleNo/#Value","DriverName":"#Page:Main/#Control:DriverName/#Value","DriverLicense":"#Page:Main/#ClientData/HeaderDetail/DriverLicense"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/GenerateDispatchSuccess.action":
/*!******************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/GenerateDispatchSuccess.action ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Dispatch id generated successfully","Title":"Success","OKCaption":"Ok","OnOK":"/BoxDispatch/Rules/GenerateDispatchSuccessOk.js"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/Logout.action":
/*!*************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/Logout.action ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Logout"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/NavToBoxLoad.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/NavToBoxLoad.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/BoxDispatch/Pages/BoxLoad.page","ClearHistory":false,"NavigationType":"Outer"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/NavToMain.action":
/*!****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/NavToMain.action ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Navigation","PageToOpen":"/BoxDispatch/Pages/Main.page","ClearHistory":true,"NavigationType":"Outer"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/OnWillUpdate.action":
/*!*******************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/OnWillUpdate.action ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"A new version of the application is now ready to apply. Do you want to update to this version?","Title":"New Version Available!","OKCaption":"Now","CancelCaption":"Later","ActionResult":{"_Name":"OnWillUpdate"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/SaveBoxSuccessMessage.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/SaveBoxSuccessMessage.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"SaveBoxSuccessMessage"},"Message":"Scanned box uploaded successfully in dispatch Id {#Page:Main/#ClientData/HeaderDetail/DispatchId}","Title":"Success"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/SaveScannedBox.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/SaveScannedBox.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"SaveScannedBox"},"OnFailure":"/BoxDispatch/Rules/SaveScannedBoxFailure.js","OnSuccess":"/BoxDispatch/Rules/SaveScannedBoxSuccess.js","ShowActivityIndicator":true,"Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"DispatchDetailsSet","ReadLink":"{@odata.readLink}"},"Properties":{"BoxId":"#Page:Main/#ClientData/HeaderDetail/BoxId","DispatchId":"#Page:Main/#ClientData/HeaderDetail/DispatchId","LicensePlate":"#Page:Main/#ClientData/HeaderDetail/LicensePlate","LabelId":"#Page:Main/#ClientData/HeaderDetail/LabelId","TransporterId":"#Page:Main/#ClientData/HeaderDetail/Transporter","VehicleNo":"#Page:Main/#ClientData/HeaderDetail/VehicleNo","DriverName":"#Page:Main/#ClientData/HeaderDetail/DriverName","DriverLicense":"#Page:Main/#ClientData/HeaderDetail/DriverLicense","LoadingsDate":"#Page:Main/#ClientData/HeaderDetail/LoadingsDate","LoadingsTime":"#Page:Main/#ClientData/HeaderDetail/LoadingsTime"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnline.action":
/*!*******************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/Service/InitializeOnline.action ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = {"Service":"/BoxDispatch/Services/DISPATCH.service","_Type":"Action.Type.ODataService.Initialize","ShowActivityIndicator":true,"OnSuccess":"/BoxDispatch/Actions/Service/InitializeOnlineSuccessMessage.action","OnFailure":"/BoxDispatch/Actions/Service/InitializeOnlineFailureMessage.action","ActionResult":{"_Name":"init"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineFailureMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineFailureMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Message":"Failed to initialize application data service - {#ActionResults:init/error}","Duration":7,"Animated":true,"_Type":"Action.Type.BannerMessage"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineSuccessMessage.action":
/*!*********************************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineSuccessMessage.action ***!
  \*********************************************************************************************/
/***/ ((module) => {

module.exports = {"Animated":true,"Duration":2,"Message":"Application data service initialized","IsIconHidden":true,"NumberOfLines":2,"_Type":"Action.Type.ToastMessage"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/StopBoxLoading.action":
/*!*********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/StopBoxLoading.action ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.UpdateEntity","ActionResult":{"_Name":"StopBoxLoading"},"OnFailure":"/BoxDispatch/Rules/StopBoxLoadingFailure.js","OnSuccess":"/BoxDispatch/Actions/StopBoxLoadingSuccess.action","ShowActivityIndicator":true,"Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"DispatchDetailsSet"},"Properties":{"BoxId":"","DispatchId":"#Page:Main/#ClientData/HeaderDetail/DispatchId","TransporterId":"#Page:Main/#ClientData/HeaderDetail/Transporter","VehicleNo":"#Page:Main/#ClientData/HeaderDetail/VehicleNo","DriverName":"#Page:Main/#ClientData/HeaderDetail/DriverName","DriverLicense":"#Page:Main/#ClientData/HeaderDetail/DriverLicense","LoadingsDate":"#Page:Main/#ClientData/HeaderDetail/LoadingsDate","LoadingsTime":"#Page:Main/#ClientData/HeaderDetail/LoadingsTime","LoadingeDate":"#Page:Main/#ClientData/HeaderDetail/LoadingeDate","LoadingeTime":"#Page:Main/#ClientData/HeaderDetail/LoadingeTime"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/StopBoxLoadingFailureMessage.action":
/*!***********************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/StopBoxLoadingFailureMessage.action ***!
  \***********************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"StopBoxLoadingFailureMessage"},"Message":"An error occurred while processing your request. please try again","Title":"Warning","OnOK":"/BoxDispatch/Actions/NavToMain.action"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/StopBoxLoadingSuccess.action":
/*!****************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/StopBoxLoadingSuccess.action ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","ActionResult":{"_Name":"StopBoxLoadingSuccess"},"Message":"{#Page:Main/#ClientData/HeaderDetail/Count} boxes scanned successfully for dispatch ID {#Page:Main/#ClientData/HeaderDetail/DispatchId}","Title":"Success","OKCaption":"Ok","OnOK":"/BoxDispatch/Actions/NavToMain.action"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/StopLoadConfirmation.action":
/*!***************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/StopLoadConfirmation.action ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.Message","Message":"Are you sure to stop loading of boxes ?","Title":"Stop Loading","OKCaption":"Yes","OnOK":"/BoxDispatch/Rules/StopLoad.js","CancelCaption":"No"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Actions/UploadAttachment.action":
/*!***********************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Actions/UploadAttachment.action ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = {"_Type":"Action.Type.ODataService.CreateMedia","ActionResult":{"_Name":"UploadAttachment"},"ValidationRule":"/BoxDispatch/Rules/ValidateUpload.js","ShowActivityIndicator":true,"Target":{"Service":"/BoxDispatch/Services/DISPATCH.service","EntitySet":"AttachmentSet"},"Media":"#Page:BoxLoad/#Control:Attachment/#Value","Headers":{"slug":"/BoxDispatch/Rules/UploadSlug.js"}}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Globals/AppDefinition_Version.global":
/*!****************************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Globals/AppDefinition_Version.global ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = {"Value":"1.0.0","_Type":"String"}

/***/ }),

/***/ "./build.definitions/BoxDispatch/Services/DISPATCH.service":
/*!*****************************************************************!*\
  !*** ./build.definitions/BoxDispatch/Services/DISPATCH.service ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = {"DestinationName":"DISPATCH","Headers":{"loginId":"/BoxDispatch/Rules/SetLoginIdHeader.js","loginType":"/BoxDispatch/Rules/SetLoginTypeHeader.js"},"OfflineEnabled":false,"OnlineOptions":{"ServiceOptions":{"dataVersion":200}},"SourceType":"Mobile","RestService":false}

/***/ }),

/***/ "./build.definitions/application-index.js":
/*!************************************************!*\
  !*** ./build.definitions/application-index.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

let application_app = __webpack_require__(/*! ./Application.app */ "./build.definitions/Application.app")
let boxdispatch_actions_appupdate_action = __webpack_require__(/*! ./BoxDispatch/Actions/AppUpdate.action */ "./build.definitions/BoxDispatch/Actions/AppUpdate.action")
let boxdispatch_actions_appupdatefailuremessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/AppUpdateFailureMessage.action */ "./build.definitions/BoxDispatch/Actions/AppUpdateFailureMessage.action")
let boxdispatch_actions_appupdateprogressbanner_action = __webpack_require__(/*! ./BoxDispatch/Actions/AppUpdateProgressBanner.action */ "./build.definitions/BoxDispatch/Actions/AppUpdateProgressBanner.action")
let boxdispatch_actions_appupdatesuccessmessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/AppUpdateSuccessMessage.action */ "./build.definitions/BoxDispatch/Actions/AppUpdateSuccessMessage.action")
let boxdispatch_actions_canceldispatch_action = __webpack_require__(/*! ./BoxDispatch/Actions/CancelDispatch.action */ "./build.definitions/BoxDispatch/Actions/CancelDispatch.action")
let boxdispatch_actions_canceldispatchconfirmation_action = __webpack_require__(/*! ./BoxDispatch/Actions/CancelDispatchConfirmation.action */ "./build.definitions/BoxDispatch/Actions/CancelDispatchConfirmation.action")
let boxdispatch_actions_closepage_action = __webpack_require__(/*! ./BoxDispatch/Actions/ClosePage.action */ "./build.definitions/BoxDispatch/Actions/ClosePage.action")
let boxdispatch_actions_failuremessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/FailureMessage.action */ "./build.definitions/BoxDispatch/Actions/FailureMessage.action")
let boxdispatch_actions_generatedispatchid_action = __webpack_require__(/*! ./BoxDispatch/Actions/GenerateDispatchID.action */ "./build.definitions/BoxDispatch/Actions/GenerateDispatchID.action")
let boxdispatch_actions_generatedispatchsuccess_action = __webpack_require__(/*! ./BoxDispatch/Actions/GenerateDispatchSuccess.action */ "./build.definitions/BoxDispatch/Actions/GenerateDispatchSuccess.action")
let boxdispatch_actions_logout_action = __webpack_require__(/*! ./BoxDispatch/Actions/Logout.action */ "./build.definitions/BoxDispatch/Actions/Logout.action")
let boxdispatch_actions_navtoboxload_action = __webpack_require__(/*! ./BoxDispatch/Actions/NavToBoxLoad.action */ "./build.definitions/BoxDispatch/Actions/NavToBoxLoad.action")
let boxdispatch_actions_navtomain_action = __webpack_require__(/*! ./BoxDispatch/Actions/NavToMain.action */ "./build.definitions/BoxDispatch/Actions/NavToMain.action")
let boxdispatch_actions_onwillupdate_action = __webpack_require__(/*! ./BoxDispatch/Actions/OnWillUpdate.action */ "./build.definitions/BoxDispatch/Actions/OnWillUpdate.action")
let boxdispatch_actions_saveboxsuccessmessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/SaveBoxSuccessMessage.action */ "./build.definitions/BoxDispatch/Actions/SaveBoxSuccessMessage.action")
let boxdispatch_actions_savescannedbox_action = __webpack_require__(/*! ./BoxDispatch/Actions/SaveScannedBox.action */ "./build.definitions/BoxDispatch/Actions/SaveScannedBox.action")
let boxdispatch_actions_service_initializeonline_action = __webpack_require__(/*! ./BoxDispatch/Actions/Service/InitializeOnline.action */ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnline.action")
let boxdispatch_actions_service_initializeonlinefailuremessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/Service/InitializeOnlineFailureMessage.action */ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineFailureMessage.action")
let boxdispatch_actions_service_initializeonlinesuccessmessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/Service/InitializeOnlineSuccessMessage.action */ "./build.definitions/BoxDispatch/Actions/Service/InitializeOnlineSuccessMessage.action")
let boxdispatch_actions_stopboxloading_action = __webpack_require__(/*! ./BoxDispatch/Actions/StopBoxLoading.action */ "./build.definitions/BoxDispatch/Actions/StopBoxLoading.action")
let boxdispatch_actions_stopboxloadingfailuremessage_action = __webpack_require__(/*! ./BoxDispatch/Actions/StopBoxLoadingFailureMessage.action */ "./build.definitions/BoxDispatch/Actions/StopBoxLoadingFailureMessage.action")
let boxdispatch_actions_stopboxloadingsuccess_action = __webpack_require__(/*! ./BoxDispatch/Actions/StopBoxLoadingSuccess.action */ "./build.definitions/BoxDispatch/Actions/StopBoxLoadingSuccess.action")
let boxdispatch_actions_stoploadconfirmation_action = __webpack_require__(/*! ./BoxDispatch/Actions/StopLoadConfirmation.action */ "./build.definitions/BoxDispatch/Actions/StopLoadConfirmation.action")
let boxdispatch_actions_uploadattachment_action = __webpack_require__(/*! ./BoxDispatch/Actions/UploadAttachment.action */ "./build.definitions/BoxDispatch/Actions/UploadAttachment.action")
let boxdispatch_globals_appdefinition_version_global = __webpack_require__(/*! ./BoxDispatch/Globals/AppDefinition_Version.global */ "./build.definitions/BoxDispatch/Globals/AppDefinition_Version.global")
let boxdispatch_i18n_i18n_properties = __webpack_require__(/*! ./BoxDispatch/i18n/i18n.properties */ "./build.definitions/BoxDispatch/i18n/i18n.properties")
let boxdispatch_jsconfig_json = __webpack_require__(/*! ./BoxDispatch/jsconfig.json */ "./build.definitions/BoxDispatch/jsconfig.json")
let boxdispatch_pages_boxload_page = __webpack_require__(/*! ./BoxDispatch/Pages/BoxLoad.page */ "./build.definitions/BoxDispatch/Pages/BoxLoad.page")
let boxdispatch_pages_main_page = __webpack_require__(/*! ./BoxDispatch/Pages/Main.page */ "./build.definitions/BoxDispatch/Pages/Main.page")
let boxdispatch_rules_appupdatefailure_js = __webpack_require__(/*! ./BoxDispatch/Rules/AppUpdateFailure.js */ "./build.definitions/BoxDispatch/Rules/AppUpdateFailure.js")
let boxdispatch_rules_appupdatesuccess_js = __webpack_require__(/*! ./BoxDispatch/Rules/AppUpdateSuccess.js */ "./build.definitions/BoxDispatch/Rules/AppUpdateSuccess.js")
let boxdispatch_rules_canceldispatch_js = __webpack_require__(/*! ./BoxDispatch/Rules/CancelDispatch.js */ "./build.definitions/BoxDispatch/Rules/CancelDispatch.js")
let boxdispatch_rules_generatedispatchsuccessok_js = __webpack_require__(/*! ./BoxDispatch/Rules/GenerateDispatchSuccessOk.js */ "./build.definitions/BoxDispatch/Rules/GenerateDispatchSuccessOk.js")
let boxdispatch_rules_onloadingpageloads_js = __webpack_require__(/*! ./BoxDispatch/Rules/onLoadingPageLoads.js */ "./build.definitions/BoxDispatch/Rules/onLoadingPageLoads.js")
let boxdispatch_rules_onloadingpageunloads_js = __webpack_require__(/*! ./BoxDispatch/Rules/onLoadingPageUnLoads.js */ "./build.definitions/BoxDispatch/Rules/onLoadingPageUnLoads.js")
let boxdispatch_rules_onwillupdate_js = __webpack_require__(/*! ./BoxDispatch/Rules/OnWillUpdate.js */ "./build.definitions/BoxDispatch/Rules/OnWillUpdate.js")
let boxdispatch_rules_savescannedboxfailure_js = __webpack_require__(/*! ./BoxDispatch/Rules/SaveScannedBoxFailure.js */ "./build.definitions/BoxDispatch/Rules/SaveScannedBoxFailure.js")
let boxdispatch_rules_savescannedboxsuccess_js = __webpack_require__(/*! ./BoxDispatch/Rules/SaveScannedBoxSuccess.js */ "./build.definitions/BoxDispatch/Rules/SaveScannedBoxSuccess.js")
let boxdispatch_rules_scanboxsuccess_js = __webpack_require__(/*! ./BoxDispatch/Rules/ScanBoxSuccess.js */ "./build.definitions/BoxDispatch/Rules/ScanBoxSuccess.js")
let boxdispatch_rules_setloginidheader_js = __webpack_require__(/*! ./BoxDispatch/Rules/SetLoginIdHeader.js */ "./build.definitions/BoxDispatch/Rules/SetLoginIdHeader.js")
let boxdispatch_rules_setlogintypeheader_js = __webpack_require__(/*! ./BoxDispatch/Rules/SetLoginTypeHeader.js */ "./build.definitions/BoxDispatch/Rules/SetLoginTypeHeader.js")
let boxdispatch_rules_startload_js = __webpack_require__(/*! ./BoxDispatch/Rules/StartLoad.js */ "./build.definitions/BoxDispatch/Rules/StartLoad.js")
let boxdispatch_rules_stopboxloadingfailure_js = __webpack_require__(/*! ./BoxDispatch/Rules/StopBoxLoadingFailure.js */ "./build.definitions/BoxDispatch/Rules/StopBoxLoadingFailure.js")
let boxdispatch_rules_stopload_js = __webpack_require__(/*! ./BoxDispatch/Rules/StopLoad.js */ "./build.definitions/BoxDispatch/Rules/StopLoad.js")
let boxdispatch_rules_uploadattachment_js = __webpack_require__(/*! ./BoxDispatch/Rules/uploadAttachment.js */ "./build.definitions/BoxDispatch/Rules/uploadAttachment.js")
let boxdispatch_rules_uploadslug_js = __webpack_require__(/*! ./BoxDispatch/Rules/UploadSlug.js */ "./build.definitions/BoxDispatch/Rules/UploadSlug.js")
let boxdispatch_rules_validatedispatchheader_js = __webpack_require__(/*! ./BoxDispatch/Rules/ValidateDispatchHeader.js */ "./build.definitions/BoxDispatch/Rules/ValidateDispatchHeader.js")
let boxdispatch_rules_validateupload_js = __webpack_require__(/*! ./BoxDispatch/Rules/ValidateUpload.js */ "./build.definitions/BoxDispatch/Rules/ValidateUpload.js")
let boxdispatch_services_dispatch_service = __webpack_require__(/*! ./BoxDispatch/Services/DISPATCH.service */ "./build.definitions/BoxDispatch/Services/DISPATCH.service")
let boxdispatch_styles_styles_css = __webpack_require__(/*! ./BoxDispatch/Styles/Styles.css */ "./build.definitions/BoxDispatch/Styles/Styles.css")
let boxdispatch_styles_styles_json = __webpack_require__(/*! ./BoxDispatch/Styles/Styles.json */ "./build.definitions/BoxDispatch/Styles/Styles.json")
let boxdispatch_styles_styles_less = __webpack_require__(/*! ./BoxDispatch/Styles/Styles.less */ "./build.definitions/BoxDispatch/Styles/Styles.less")
let boxdispatch_styles_styles_nss = __webpack_require__(/*! ./BoxDispatch/Styles/Styles.nss */ "./build.definitions/BoxDispatch/Styles/Styles.nss")
let tsconfig_json = __webpack_require__(/*! ./tsconfig.json */ "./build.definitions/tsconfig.json")
let version_mdkbundlerversion = __webpack_require__(/*! ./version.mdkbundlerversion */ "./build.definitions/version.mdkbundlerversion")

module.exports = {
	application_app : application_app,
	boxdispatch_actions_appupdate_action : boxdispatch_actions_appupdate_action,
	boxdispatch_actions_appupdatefailuremessage_action : boxdispatch_actions_appupdatefailuremessage_action,
	boxdispatch_actions_appupdateprogressbanner_action : boxdispatch_actions_appupdateprogressbanner_action,
	boxdispatch_actions_appupdatesuccessmessage_action : boxdispatch_actions_appupdatesuccessmessage_action,
	boxdispatch_actions_canceldispatch_action : boxdispatch_actions_canceldispatch_action,
	boxdispatch_actions_canceldispatchconfirmation_action : boxdispatch_actions_canceldispatchconfirmation_action,
	boxdispatch_actions_closepage_action : boxdispatch_actions_closepage_action,
	boxdispatch_actions_failuremessage_action : boxdispatch_actions_failuremessage_action,
	boxdispatch_actions_generatedispatchid_action : boxdispatch_actions_generatedispatchid_action,
	boxdispatch_actions_generatedispatchsuccess_action : boxdispatch_actions_generatedispatchsuccess_action,
	boxdispatch_actions_logout_action : boxdispatch_actions_logout_action,
	boxdispatch_actions_navtoboxload_action : boxdispatch_actions_navtoboxload_action,
	boxdispatch_actions_navtomain_action : boxdispatch_actions_navtomain_action,
	boxdispatch_actions_onwillupdate_action : boxdispatch_actions_onwillupdate_action,
	boxdispatch_actions_saveboxsuccessmessage_action : boxdispatch_actions_saveboxsuccessmessage_action,
	boxdispatch_actions_savescannedbox_action : boxdispatch_actions_savescannedbox_action,
	boxdispatch_actions_service_initializeonline_action : boxdispatch_actions_service_initializeonline_action,
	boxdispatch_actions_service_initializeonlinefailuremessage_action : boxdispatch_actions_service_initializeonlinefailuremessage_action,
	boxdispatch_actions_service_initializeonlinesuccessmessage_action : boxdispatch_actions_service_initializeonlinesuccessmessage_action,
	boxdispatch_actions_stopboxloading_action : boxdispatch_actions_stopboxloading_action,
	boxdispatch_actions_stopboxloadingfailuremessage_action : boxdispatch_actions_stopboxloadingfailuremessage_action,
	boxdispatch_actions_stopboxloadingsuccess_action : boxdispatch_actions_stopboxloadingsuccess_action,
	boxdispatch_actions_stoploadconfirmation_action : boxdispatch_actions_stoploadconfirmation_action,
	boxdispatch_actions_uploadattachment_action : boxdispatch_actions_uploadattachment_action,
	boxdispatch_globals_appdefinition_version_global : boxdispatch_globals_appdefinition_version_global,
	boxdispatch_i18n_i18n_properties : boxdispatch_i18n_i18n_properties,
	boxdispatch_jsconfig_json : boxdispatch_jsconfig_json,
	boxdispatch_pages_boxload_page : boxdispatch_pages_boxload_page,
	boxdispatch_pages_main_page : boxdispatch_pages_main_page,
	boxdispatch_rules_appupdatefailure_js : boxdispatch_rules_appupdatefailure_js,
	boxdispatch_rules_appupdatesuccess_js : boxdispatch_rules_appupdatesuccess_js,
	boxdispatch_rules_canceldispatch_js : boxdispatch_rules_canceldispatch_js,
	boxdispatch_rules_generatedispatchsuccessok_js : boxdispatch_rules_generatedispatchsuccessok_js,
	boxdispatch_rules_onloadingpageloads_js : boxdispatch_rules_onloadingpageloads_js,
	boxdispatch_rules_onloadingpageunloads_js : boxdispatch_rules_onloadingpageunloads_js,
	boxdispatch_rules_onwillupdate_js : boxdispatch_rules_onwillupdate_js,
	boxdispatch_rules_savescannedboxfailure_js : boxdispatch_rules_savescannedboxfailure_js,
	boxdispatch_rules_savescannedboxsuccess_js : boxdispatch_rules_savescannedboxsuccess_js,
	boxdispatch_rules_scanboxsuccess_js : boxdispatch_rules_scanboxsuccess_js,
	boxdispatch_rules_setloginidheader_js : boxdispatch_rules_setloginidheader_js,
	boxdispatch_rules_setlogintypeheader_js : boxdispatch_rules_setlogintypeheader_js,
	boxdispatch_rules_startload_js : boxdispatch_rules_startload_js,
	boxdispatch_rules_stopboxloadingfailure_js : boxdispatch_rules_stopboxloadingfailure_js,
	boxdispatch_rules_stopload_js : boxdispatch_rules_stopload_js,
	boxdispatch_rules_uploadattachment_js : boxdispatch_rules_uploadattachment_js,
	boxdispatch_rules_uploadslug_js : boxdispatch_rules_uploadslug_js,
	boxdispatch_rules_validatedispatchheader_js : boxdispatch_rules_validatedispatchheader_js,
	boxdispatch_rules_validateupload_js : boxdispatch_rules_validateupload_js,
	boxdispatch_services_dispatch_service : boxdispatch_services_dispatch_service,
	boxdispatch_styles_styles_css : boxdispatch_styles_styles_css,
	boxdispatch_styles_styles_json : boxdispatch_styles_styles_json,
	boxdispatch_styles_styles_less : boxdispatch_styles_styles_less,
	boxdispatch_styles_styles_nss : boxdispatch_styles_styles_nss,
	tsconfig_json : tsconfig_json,
	version_mdkbundlerversion : version_mdkbundlerversion
}

/***/ }),

/***/ "./build.definitions/version.mdkbundlerversion":
/*!*****************************************************!*\
  !*** ./build.definitions/version.mdkbundlerversion ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = "1.1\n";

/***/ }),

/***/ "./build.definitions/BoxDispatch/Styles/Styles.json":
/*!**********************************************************!*\
  !*** ./build.definitions/BoxDispatch/Styles/Styles.json ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
module.exports = {};

/***/ }),

/***/ "./build.definitions/BoxDispatch/jsconfig.json":
/*!*****************************************************!*\
  !*** ./build.definitions/BoxDispatch/jsconfig.json ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"include":["Rules/**/*",".typings/**/*"]}');

/***/ }),

/***/ "./build.definitions/tsconfig.json":
/*!*****************************************!*\
  !*** ./build.definitions/tsconfig.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"compilerOptions":{"target":"es2015","module":"esnext","moduleResolution":"node","lib":["es2018","dom"],"experimentalDecorators":true,"emitDecoratorMetadata":true,"removeComments":true,"inlineSourceMap":true,"noEmitOnError":false,"noEmitHelpers":true,"baseUrl":".","plugins":[{"transform":"@nativescript/webpack/dist/transformers/NativeClass","type":"raw"}]},"exclude":["node_modules"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./build.definitions/application-index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});