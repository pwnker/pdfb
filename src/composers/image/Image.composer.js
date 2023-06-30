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
var ImageComposer = /** @class */ (function (_super) {
    __extends(ImageComposer, _super);
    function ImageComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @Todo write documentation
     */
    ImageComposer.prototype["new"] = function (imageData, position, size) {
        var boundingBox = function (pos, bsize) {
            return {
                position: pos.clone(),
                size: bsize,
                end: position.clone().addVec(bsize)
            };
        };
        var image = {
            data: imageData,
            start: position.clone(),
            size: size,
            end: position.clone().addVec(size),
            format: 'png',
            PARENT: this.PARENT,
            setFormat: function (format) {
                this.format = format;
                return this;
            },
            underline: function (offset) {
                this.PARENT.Line(this.start
                    .clone()
                    .add(0, this.size.Y)
                    .addVec(offset !== null && offset !== void 0 ? offset : (0, Vector2_1.vector2)(0, 0)), this.start
                    .clone()
                    .addVec(this.size)
                    .addVec((offset !== null && offset !== void 0 ? offset : (0, Vector2_1.vector2)(0, 0)).scaleXY(-1, 1)));
                return this;
            },
            renderBoundingBox: function () {
                var bb = boundingBox(this.start.clone(), this.size.clone());
                this.PARENT.Rect(bb.position, bb.size).render();
            },
            render: function () {
                this.PARENT.Document.addImage(imageData, 'png', this.start.X, this.start.Y, size.X, size.Y);
            },
            Start: function () {
                return this.start.clone();
            },
            End: function () {
                return this.end.clone();
            }
        };
        return image;
    };
    return ImageComposer;
}(Composer_1["default"]));
exports["default"] = ImageComposer;
