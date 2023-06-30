"use strict";
exports.__esModule = true;
var FontLoader_1 = require("../fonts/FontLoader");
var courier_1 = require("../fonts/internal/courier");
var PDFBuilder = /** @class */ (function () {
    function PDFBuilder(doc) {
        this.pages = [];
        this.doc = doc;
        this.fontLoader = new FontLoader_1["default"](doc, 22);
        this.fontLoader.setFont(courier_1["default"].NORMAL);
    }
    PDFBuilder.prototype.clearBuffer = function () {
        this.pages = [];
    };
    /**
     * Render all elements to the PDF document
     *
     * Order: ```Images -> Rects -> Texts -> Lines```
     */
    PDFBuilder.prototype.render = function () {
        var _this = this;
        this.pages.forEach(function (page, index) {
            if (index > 0) {
                _this.doc.addPage();
            }
            page.render();
        });
    };
    /**
     * @Todo write documentation
     * @Cleanup - should the user be responsable for the start, position and buffer reset ??
     */
    PDFBuilder.prototype.AddPage = function (page) {
        this.pages.push(page);
    };
    Object.defineProperty(PDFBuilder.prototype, "Document", {
        get: function () {
            return this.doc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "FontLoader", {
        get: function () {
            return this.fontLoader;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "Pages", {
        get: function () {
            return this.pages;
        },
        enumerable: false,
        configurable: true
    });
    return PDFBuilder;
}());
exports["default"] = PDFBuilder;
