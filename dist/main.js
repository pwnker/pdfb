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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FONTS = exports.FontLoader = exports.SectionBuilder = exports.PDFBuilder = exports.version = void 0;
const PDFBuilder_1 = __importDefault(require("./builder/PDFBuilder"));
exports.PDFBuilder = PDFBuilder_1.default;
const SectionBuilder_1 = __importDefault(require("./section/SectionBuilder"));
exports.SectionBuilder = SectionBuilder_1.default;
const FontLoader_1 = __importDefault(require("./fonts/FontLoader"));
exports.FontLoader = FontLoader_1.default;
const helvetica_1 = __importDefault(require("./fonts/internal/helvetica"));
const times_1 = __importDefault(require("./fonts/internal/times"));
const courier_1 = __importDefault(require("./fonts/internal/courier"));
const version = () => {
    return '0.1.0';
};
exports.version = version;
__exportStar(require("./builder/PdfBuilder.model"), exports);
__exportStar(require("./fonts/Font.model"), exports);
const FONTS = {
    COURIER: courier_1.default,
    TIMES: times_1.default,
    HELVETICA: helvetica_1.default,
};
exports.FONTS = FONTS;
//# sourceMappingURL=main.js.map