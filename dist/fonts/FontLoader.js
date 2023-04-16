"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Assert_1 = __importDefault(require("../Assert"));
class FontLoader {
    doc;
    size;
    constructor(doc, defaultSize) {
        this.doc = doc;
        this.size = {
            current: defaultSize,
            previous: defaultSize,
            default: defaultSize,
        };
        this.doc.setFontSize(this.size.default);
    }
    setDefaultSize() {
        this.size.current = this.size.default;
        this.size.previous = this.size.default;
        this.doc.setFontSize(this.size.default);
    }
    setFontSize(size) {
        this.size.previous = this.size.current;
        this.size.current = size;
        this.doc.setFontSize(this.size.current);
        return this;
    }
    restoreFontSize() {
        this.size.current = this.size.previous;
        this.doc.setFontSize(this.size.previous);
    }
    addFont(font) {
        (0, Assert_1.default)(font.glyphs !== undefined, `Unexpected '${font.name}' 'glyphs' are undefined`);
        (0, Assert_1.default)(font.fileName !== undefined, `Unexpeected '${font.name}' 'fileName' is undefined`);
        this.doc.addFileToVFS(font.fileName, font.glyphs);
        this.doc.addFont(font.fileName, font.name, font.weight);
    }
    addFontFamily(family) {
        Object.keys(family).forEach((fontName) => {
            const font = family[fontName];
            this.addFont(font);
        });
    }
    setFont(font) {
        this.doc.setFont(font.name, '', font.weight);
    }
}
exports.default = FontLoader;
//# sourceMappingURL=FontLoader.js.map