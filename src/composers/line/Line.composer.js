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
var Vector2_1 = require("../../math/Vector2");
var Composer_1 = require("../Composer");
var LineComposer = /** @class */ (function (_super) {
    __extends(LineComposer, _super);
    function LineComposer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Creates a new line object
     * Position is absolute
     * @default
     * style:
     * 	color: "#2e2e2e"
     * 	width: 1
     *
     * @param p1 start vector 2D
     * @param p2 end vector 2D
     * @returns Line
     */
    LineComposer.prototype["new"] = function (p1, p2) {
        var line = {
            start: p1,
            end: p2,
            size: (0, Vector2_1.vector2)(p2.X - p1.X, p2.Y - p1.Y),
            style: {
                color: '#2e2e2e',
                width: 1,
                dashed: {
                    pattern: [],
                    start: 0
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
                var curDrawColor = this.PARENT.Document.getDrawColor();
                this.PARENT.Document.setDrawColor(this.style.color);
                this.PARENT.Document.setLineDashPattern(this.style.dashed.pattern, this.style.dashed.start);
                this.PARENT.Document.line(this.start.X, this.start.Y, this.end.X, this.end.Y);
                this.PARENT.Document.setDrawColor(curDrawColor);
            },
            Start: function () {
                return this.start.clone();
            },
            End: function () {
                return this.end.clone();
            }
        };
        return line;
    };
    return LineComposer;
}(Composer_1["default"]));
exports["default"] = LineComposer;
