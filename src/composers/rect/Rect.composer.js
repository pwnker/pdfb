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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var console_1 = require("console");
var Composer_1 = require("../Composer");
var RectComposer = /** @class */ (function (_super) {
    __extends(RectComposer, _super);
    function RectComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @default
     * style: {
     *	 fillStyle: 'S',
     *	 fill: ''
     *	 line: {
     *		color: '',
     *		width: 0,
     *		dashed: {
     *			pattern: [],
     *			start: 0,
     *		},
     *	 }
     * }
     *
     * @param p1
     * @param size
     * @returns
     */
    RectComposer.prototype["new"] = function (p1, size) {
        var rect = {
            start: p1.clone(),
            size: size,
            end: p1.clone().addVec(size),
            style: {
                fillStyle: 'S',
                fill: '',
                line: {
                    color: '',
                    width: 0,
                    dashed: {
                        pattern: [],
                        start: 0
                    }
                }
            },
            PARENT: this.PARENT,
            setStyle: function (style) {
                this.style = __assign(__assign({}, this.style), style);
                return this;
            },
            renderBoundingBox: function () {
                (0, console_1.assert)(false, 'TODO:');
            },
            render: function () {
                var curFillColor = this.PARENT.Document.getFillColor();
                var curLineWidth = this.PARENT.Document.getLineWidth();
                this.PARENT.Document.setFillColor(this.style.fill);
                this.PARENT.Document.setLineWidth(this.style.line.width);
                this.PARENT.Document.setLineDashPattern(this.style.line.dashed.pattern, this.style.line.dashed.start);
                this.PARENT.Document.rect(this.start.X, this.start.Y, this.size.X, this.size.Y, this.style.fillStyle);
                this.PARENT.Document.setFillColor(curFillColor);
                this.PARENT.Document.setLineWidth(curLineWidth);
            },
            Start: function () {
                return this.start.clone();
            },
            End: function () {
                return this.end.clone();
            }
        };
        return rect;
    };
    return RectComposer;
}(Composer_1["default"]));
exports["default"] = RectComposer;
