"use strict";
exports.__esModule = true;
var Assert_1 = require("../Assert");
var FontLoader = /** @class */ (function () {
    /**
     * @Cleanup use pdf builder instead of doc: jsPDF
     */
    function FontLoader(doc, defaultSize) {
        this.doc = doc;
        this.size = {
            current: defaultSize,
            previous: defaultSize,
            "default": defaultSize
        };
        this.doc.fontSize(this.size["default"]);
    }
    FontLoader.prototype.setDefaultSize = function () {
        this.size.current = this.size["default"];
        this.size.previous = this.size["default"];
        this.doc.fontSize(this.size["default"]);
    };
    FontLoader.prototype.setFontSize = function (size) {
        this.size.previous = this.size.current;
        this.size.current = size;
        this.doc.fontSize(this.size.current);
        return this;
    };
    FontLoader.prototype.restoreFontSize = function () {
        this.size.current = this.size.previous;
        this.doc.fontSize(this.size.previous);
    };
    FontLoader.prototype.addFont = function (font) {
        // assert(
        // 	font.glyphs !== undefined,
        // 	`Unexpected '${font.name}' 'glyphs' are undefined`
        // );
        // assert(
        // 	font.fileName !== undefined,
        // 	`Unexpeected '${font.name}' 'fileName' is undefined`
        // );
        // this.doc.addFileToVFS(font.fileName, font.glyphs);
        // this.doc.addFont(font.fileName, font.name, font.weight);
        (0, Assert_1["default"])(false, 'TODO: adding fonts');
    };
    FontLoader.prototype.addFontFamily = function (family) {
        var _this = this;
        Object.keys(family).forEach(function (fontName) {
            var font = family[fontName];
            _this.addFont(font);
        });
    };
    FontLoader.prototype.setFont = function (font) {
        this.doc.font(font.name);
    };
    Object.defineProperty(FontLoader.prototype, "CurrentSize", {
        get: function () {
            return this.size.current;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontLoader.prototype, "DefaultSize", {
        get: function () {
            return this.size["default"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FontLoader.prototype, "PreviousSize", {
        get: function () {
            return this.size.previous;
        },
        enumerable: false,
        configurable: true
    });
    return FontLoader;
}());
exports["default"] = FontLoader;
