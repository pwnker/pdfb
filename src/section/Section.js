"use strict";
exports.__esModule = true;
var Vector2_1 = require("../math/Vector2");
var Section = /** @class */ (function () {
    function Section(parent, position, padding) {
        this.PARENT = parent;
        this.position = position.clone();
        this.padding = padding !== null && padding !== void 0 ? padding : (0, Vector2_1.vector2)(0, 0);
        this.start = this.position.clone().addVec(this.padding);
        this.size = this.padding.clone();
        this.content = {
            background: null,
            border: null,
            lines: [],
            images: [],
            texts: [],
            rects: []
        };
    }
    Section.prototype.addLine = function (start, end) {
        var line = this.PARENT.ComposerLine["new"](this.start.clone().addVec(start), this.start.clone().addVec(end));
        this.content.lines.push(line);
        var SizeVector = line.end
            .clone()
            .addVec(this.start)
            .substractVec(this.start.clone())
            .addVec(this.padding.clone().scale(2));
        this.size.update(SizeVector);
        return line;
    };
    Section.prototype.addText = function (text, position, options) {
        var _a;
        if (options === void 0) { options = {
            fontSize: 12,
            underline: false,
            color: '#2e2e2e'
        }; }
        var txt = this.PARENT.ComposerText["new"](text, this.start.clone().addVec(position)).setFontSize((_a = options.fontSize) !== null && _a !== void 0 ? _a : 12);
        if (options.color !== undefined) {
            txt.setColor(options.color);
        }
        if (options.underline === true) {
            txt.underline();
        }
        txt.end.substractVec(this.start);
        this.content.texts.push(txt);
        var SizeVector = txt.end
            .clone()
            .addVec(this.start)
            .substractVec(this.start.clone())
            .addVec(this.padding.clone().scale(2));
        this.size.update(SizeVector);
        return txt;
    };
    Section.prototype.addImage = function (imageData, position, size) {
        var img = this.PARENT.ComposerImage["new"](imageData, this.start.clone().addVec(position), size);
        img.end.substractVec(this.start);
        this.content.images.push(img);
        var SizeVector = img.end
            .clone()
            .addVec(this.start)
            .substractVec(this.start.clone())
            .addVec(this.padding.clone().scale(2));
        this.size.update(SizeVector);
        return img;
    };
    Section.prototype.addRect = function (position, size) {
        var rect = this.PARENT.ComposeRect["new"](this.start.clone().addVec(position), size);
        rect.end.substractVec(this.start);
        this.content.rects.push(rect);
        var SizeVector = rect.end
            .clone()
            .addVec(this.start)
            .substractVec(this.start.clone())
            .addVec(this.padding.clone().scale(2));
        this.size.update(SizeVector);
        return rect;
    };
    Section.prototype.rednerBorder = function (options) {
        if (options === void 0) { options = {
            side: 'all'
        }; }
        var rect;
        if (options.side === 'all') {
            rect = this.PARENT.ComposeRect["new"](this.Position, this.Size);
        }
        else if (options.side === 'bottom') {
            rect = this.PARENT.ComposeRect["new"](this.Position.add(0, this.Size.Y), this.Size.setY(0));
        }
        else {
            throw new Error("Unexpected '".concat(options.side, "' side option"));
        }
        this.content.border = rect;
    };
    // #1e7da9
    Section.prototype.fill = function () {
        var rect = this.PARENT.ComposeRect["new"](this.Position, this.Size).setStyle({
            fillStyle: 'DF',
            fill: '#1e7da9'
        });
        this.content.background = rect;
        return rect;
    };
    Section.prototype.render = function () {
        var _a, _b;
        (_a = this.content.background) === null || _a === void 0 ? void 0 : _a.render();
        (_b = this.content.border) === null || _b === void 0 ? void 0 : _b.render();
        this.content.lines.forEach(function (line) {
            line.render();
        });
        this.content.rects.forEach(function (rect) {
            rect.render();
        });
        this.content.images.forEach(function (image) {
            image.render();
        });
        this.content.texts.forEach(function (text) {
            text.render();
        });
    };
    Section.prototype.setSize = function (size) {
        this.size.setVec(size);
    };
    Object.defineProperty(Section.prototype, "Position", {
        get: function () {
            return this.position.clone();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Section.prototype, "Start", {
        get: function () {
            return this.start.clone();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Section.prototype, "Size", {
        get: function () {
            return this.size.clone();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Section.prototype, "Padding", {
        get: function () {
            return this.padding.clone();
        },
        enumerable: false,
        configurable: true
    });
    return Section;
}());
exports["default"] = Section;
