"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Vector2_1 = require("../../math/Vector2");
var Composer_1 = require("../Composer");
var TextComposer = /** @class */ (function (_super) {
    __extends(TextComposer, _super);
    function TextComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Position is absolute
     * Text element that will be rendered onto the PDF
     * @Todo write documentation
     *
     * @default { fontSize: 16 }
     */
    TextComposer.prototype["new"] = function (text, position) {
        var _a = this.PARENT.Document.getTextDimensions(text, {
            fontSize: this.PARENT.FontLoader.CurrentSize
        }), w = _a.w, h = _a.h;
        var boundingBox = function (pos, size) {
            return {
                position: pos.clone(),
                size: size,
                end: position.clone().addVec((0, Vector2_1.vector2)(text.length * w, h))
            };
        };
        var start = position.clone();
        var txt = {
            data: text,
            PARENT: this.PARENT,
            start: start,
            fontSize: this.PARENT.FontLoader.CurrentSize,
            color: '#2e2e2e',
            size: (0, Vector2_1.vector2)(w, h),
            end: start.clone().addVec((0, Vector2_1.vector2)(w, h)),
            getDimensions: function () {
                var result = this.PARENT.Document.getTextDimensions(this.data, {
                    fontSize: this.fontSize
                });
                return (0, Vector2_1.vector2)(result.w, result.h);
            },
            getRenderVector: function () {
                var height = this.getDimensions().Y;
                return this.start.clone().add(0, height - height / 8);
            },
            setFontSize: function (size) {
                this.fontSize = size;
                this.size = this.getDimensions();
                this.start = position.clone();
                this.end = position.clone().addVec(this.size);
                return this;
            },
            setColor: function (color) {
                this.color = color;
                return this;
            },
            underline: function (yoffset) {
                var curDrawColor = this.PARENT.Document.getDrawColor();
                this.PARENT.Document.setDrawColor(this.color);
                this.size.add(0, yoffset !== null && yoffset !== void 0 ? yoffset : 1);
                this.end.add(0, yoffset !== null && yoffset !== void 0 ? yoffset : 1);
                this.PARENT.Line(this.start.clone().setY(this.end.Y), this.end.clone()).setStyle({
                    color: this.color
                });
                this.PARENT.Document.setDrawColor(curDrawColor);
                return this;
            },
            renderBoundingBox: function () {
                var bb = boundingBox(this.start.clone(), this.size.clone());
                this.PARENT.Rect(bb.position, bb.size).render();
            },
            render: function () {
                var curTextColor = this.PARENT.Document.getTextColor();
                // this.renderBoundingBox();
                this.PARENT.Document.setTextColor(this.color);
                this.PARENT.FontLoader.setFontSize(this.fontSize);
                this.PARENT.Document.text(this.data, this.getRenderVector().X, this.getRenderVector().Y);
                this.PARENT.FontLoader.restoreFontSize();
                this.PARENT.Document.setTextColor(curTextColor);
            },
            Start: function () {
                return this.start.clone();
            },
            End: function () {
                return this.end.clone();
            }
        };
        return txt;
    };
    return TextComposer;
}(Composer_1["default"]));
exports["default"] = TextComposer;
