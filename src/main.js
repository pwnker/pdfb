"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.FONTS = exports.FontLoader = exports.Section = exports.Page = exports.PDFBuilder = exports.version = void 0;
var PDFBuilder_1 = require("./builder/PDFBuilder");
exports.PDFBuilder = PDFBuilder_1["default"];
var Section_1 = require("./section/Section");
exports.Section = Section_1["default"];
var FontLoader_1 = require("./fonts/FontLoader");
exports.FontLoader = FontLoader_1["default"];
var helvetica_1 = require("./fonts/internal/helvetica");
var times_1 = require("./fonts/internal/times");
var courier_1 = require("./fonts/internal/courier");
var Page_1 = require("./page/Page");
exports.Page = Page_1["default"];
var version = function () {
    return '0.1.0';
};
exports.version = version;
__exportStar(require("./builder/PdfBuilder.model"), exports);
__exportStar(require("./fonts/Font.model"), exports);
__exportStar(require("./composers/image/Image.model"), exports);
__exportStar(require("./composers/rect/Rect.model"), exports);
__exportStar(require("./composers/line/Line.model"), exports);
__exportStar(require("./composers/text/Text.model"), exports);
var FONTS = {
    COURIER: courier_1["default"],
    TIMES: times_1["default"],
    HELVETICA: helvetica_1["default"]
};
exports.FONTS = FONTS;
