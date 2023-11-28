/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
var pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./SVGControl/index.ts":
/*!*****************************!*\
  !*** ./SVGControl/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.SVGControl = void 0;\nvar elemRecordId = \"elemRecId\";\nvar SVGControl = /** @class */function () {\n  /**\r\n   * Empty constructor.\r\n   */\n  function SVGControl() {\n    this.zoomLevel = 1;\n    this.tscale = 2;\n  }\n  /**\r\n   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.\r\n   * Data-set values are not initialized here, use updateView.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.\r\n   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.\r\n   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.\r\n   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.\r\n   */\n  SVGControl.prototype.init = function (context, notifyOutputChanged, state, container) {\n    // Add control initialization code\n    //Generate random string to prefix dom elements\n    this.randomString = Random.newString();\n    // Need to track container resize so that control could get the available width. The available height won't be provided even this is true\n    context.mode.trackContainerResize(true);\n    // Set pageSize of dataset\n    context.parameters.dataSet.paging.setPageSize(100);\n    // Create main container div. \n    this.mainContainer = document.createElement(\"div\");\n    this.mainContainer.classList.add(\"main-container\");\n    // Create svg container div and append to main container. \n    this.svgContainer = document.createElement(\"div\");\n    this.mainContainer.classList.add(\"svg-container\");\n    this.svgContainer.setAttribute(\"id\", this.randomString + \"svg-container\");\n    // Adding the main container to the container DIV.\n    this.mainContainer.appendChild(this.svgContainer);\n    container.appendChild(this.mainContainer);\n    this._notifyOutputChanged = notifyOutputChanged;\n  };\n  /**\r\n   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.\r\n   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions\r\n   */\n  SVGControl.prototype.updateView = function (context) {\n    // Add code to update control view\n    this.contextObj = context;\n    // Set SVG content\n    if (this.contextObj.parameters.svg != null) {\n      if (this.contextObj.parameters.svg.raw != null) {\n        this.svgContainer.innerHTML = this.contextObj.parameters.svg.raw.toString();\n        this.initSVG();\n      }\n    }\n    // Set zoom level\n    if (this.contextObj.parameters.zoomLevel != null) {\n      if (this.contextObj.parameters.zoomLevel.raw != null) {\n        this.zoomLevel = this.contextObj.parameters.zoomLevel.raw;\n      }\n    }\n    // Read records from dataset\n    if (!this.contextObj.parameters.dataSet.loading) {\n      if (this.contextObj.parameters.dataSet.sortedRecordIds.length > 0) {\n        // Loop through records\n        for (var _i = 0, _a = this.contextObj.parameters.dataSet.sortedRecordIds; _i < _a.length; _i++) {\n          var currentRecordId = _a[_i];\n          // Alias workaround\n          var idColumn = this.contextObj.parameters.dataSet.columns.find(function (x) {\n            return x.alias === \"id\";\n          });\n          var idColumnName = idColumn == null ? \"id\" : idColumn.name;\n          var fillColumn = this.contextObj.parameters.dataSet.columns.find(function (x) {\n            return x.alias === \"fill\";\n          });\n          var fillColumnName = fillColumn == null ? \"fill\" : fillColumn.name;\n          // Find referenced SVG elements\n          var svgObjCollection = document.getElementsByClassName(this.contextObj.parameters.dataSet.records[currentRecordId].getFormattedValue(idColumnName).toLowerCase().replace(/\\s/g, \"\"));\n          // Set fill color of found SVG elements\n          for (var i = 0; i < svgObjCollection.length; i++) {\n            var svgObj = svgObjCollection[i];\n            if (svgObj != null) {\n              if (fillColumn != null) {\n                svgObj.style.fill = this.contextObj.parameters.dataSet.records[currentRecordId].getFormattedValue(fillColumnName);\n              }\n              // Add onclick event to SVG element\n              svgObj.addEventListener(\"click\", this.onElementClick.bind(this));\n              // Set the recordId on the SVG element\n              svgObj.setAttribute(elemRecordId, currentRecordId);\n            }\n          }\n        }\n      }\n    }\n    //reset zoom\n    this.reset();\n    if (this.contextObj.parameters.scale != null) {\n      if (this.contextObj.parameters.scale.raw != null) {\n        this.tscale = this.contextObj.parameters.scale.raw;\n      }\n    }\n    // Zoom to SVG element if configured\n    if (this.contextObj.parameters.zoomToId != null) {\n      if (this.contextObj.parameters.zoomToId.raw != null) {\n        this.zoomToId = this.contextObj.parameters.zoomToId.raw.toString();\n        if (this.zoomToId != \"\") {\n          var svgElem = document.getElementById(this.zoomToId);\n          if (svgElem != null) {\n            //ZOOM\n            this.zoomToElement(this.zoomToId);\n          }\n        }\n      }\n    }\n  };\n  /**\r\n  * Row Click Event handler for the associated row when being clicked\r\n  * @param event\r\n  */\n  SVGControl.prototype.onElementClick = function (event) {\n    var elementRecordId = event.currentTarget.getAttribute(elemRecordId);\n    if (elementRecordId) {\n      var record = this.contextObj.parameters.dataSet.records[elementRecordId];\n      this.contextObj.parameters.dataSet.setSelectedRecordIds([elementRecordId]);\n      this.contextObj.parameters.dataSet.openDatasetItem(record.getNamedReference());\n      this._notifyOutputChanged();\n    }\n  };\n  /**\r\n   * It is called by the framework prior to a control receiving new data.\r\n   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”\r\n   */\n  SVGControl.prototype.getOutputs = function () {\n    return {};\n  };\n  /**\r\n   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.\r\n   * i.e. cancelling any pending remote calls, removing listeners, etc.\r\n   */\n  SVGControl.prototype.destroy = function () {\n    // Add code to cleanup control if necessary\n  };\n  // Initialize SVG \n  // Need the viewbox properties to facilitate zoom functionality\n  SVGControl.prototype.initSVG = function () {\n    this.vbox = [0, 0, 0, 0];\n    var _svgElement = document.querySelector(\"#\" + this.randomString + \"svg-container svg\");\n    if (_svgElement != null) {\n      // The main SVG object and its current viewBox\n      this.svg = _svgElement;\n      // Parse the viewBox properties\n      var _viewbox = this.svg.getAttribute('viewBox');\n      if (_viewbox != null) {\n        var _vbox = _viewbox.split(' ');\n        this.vbox[0] = parseFloat(_vbox[0]);\n        this.vbox[1] = parseFloat(_vbox[1]);\n        this.vbox[2] = parseFloat(_vbox[2]);\n        this.vbox[3] = parseFloat(_vbox[3]);\n      }\n    }\n  };\n  // Reset SVG to original state\n  SVGControl.prototype.reset = function () {\n    this.svg.setAttribute(\"viewBox\", \"\" + this.vbox[0] + \" \" + this.vbox[1] + \" \" + this.vbox[2] + \" \" + this.vbox[3]);\n  };\n  // Zoom to SVG element by manipulating the viewbox properties\n  SVGControl.prototype.zoomToElement = function (elementId) {\n    // the current center of the viewBox\n    var cx = this.vbox[0] + this.vbox[2] / 2;\n    var cy = this.vbox[1] + this.vbox[3] / 2;\n    var element = this.svg.querySelector('#' + elementId);\n    if (element != null && this.svg != null) {\n      var bbox = element.getBBox();\n      var _domMatrix = element.getScreenCTM();\n      if (_domMatrix != null) {\n        //SVGElement.prototype.getTransformToElement || function(toElement) { return toElement.getScreenCTM().inverse().multiply(this.getScreenCTM()); };\n        var matrix = _domMatrix.inverse().multiply(this.svg.getScreenCTM());\n        // the new center\n        var newx = (bbox.x + bbox.width / 2) * matrix.a + matrix.e;\n        var newy = (bbox.y + bbox.height / 2) * matrix.d + matrix.f;\n        // the corresponding top left corner in the current scale\n        var absolute_offset_x = this.vbox[0] + newx - cx;\n        var absolute_offset_y = this.vbox[1] + newy - cy;\n        // the new scale\n        var scale = bbox.width * matrix.a / this.vbox[2] * (6 - this.zoomLevel);\n        var scaled_offset_x = absolute_offset_x + this.vbox[2] * (1 - scale) / this.tscale; //tscale = 2\n        var scaled_offset_y = absolute_offset_y + this.vbox[3] * (1 - scale) / this.tscale; //tscale = 2;\n        var scaled_width = this.vbox[2] * scale;\n        var scaled_height = this.vbox[3] * scale;\n        this.svg.setAttribute(\"viewBox\", \"\" + scaled_offset_x + \" \" + scaled_offset_y + \" \" + scaled_width + \" \" + scaled_height);\n      }\n    }\n  };\n  return SVGControl;\n}();\nexports.SVGControl = SVGControl;\n// Generate random string\nvar Random = /** @class */function () {\n  function Random() {}\n  Random.newString = function () {\n    return 'axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {\n      var r = Math.random() * 16 | 0,\n        v = c == 'x' ? r : r & 0x3 | 0x8;\n      return v.toString(16);\n    });\n  };\n  return Random;\n}();\n\n//# sourceURL=webpack://pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad/./SVGControl/index.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./SVGControl/index.ts"](0, __webpack_exports__);
/******/ 	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = __webpack_exports__;
/******/ 	
/******/ })()
;
if (window.ComponentFramework && window.ComponentFramework.registerControl) {
	ComponentFramework.registerControl('PowerAppsGuy.SVGControl', pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.SVGControl);
} else {
	var PowerAppsGuy = PowerAppsGuy || {};
	PowerAppsGuy.SVGControl = pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad.SVGControl;
	pcf_tools_652ac3f36e1e4bca82eb3c1dc44e6fad = undefined;
}