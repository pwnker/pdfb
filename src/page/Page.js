"use strict";
exports.__esModule = true;
var Vector2_1 = require("../math/Vector2");
var Line_composer_1 = require("../composers/line/Line.composer");
var Text_composer_1 = require("../composers/text/Text.composer");
var Rect_composer_1 = require("../composers/rect/Rect.composer");
var Image_composer_1 = require("../composers/image/Image.composer");
var Page = /** @class */ (function () {
    function Page(parent, options) {
        if (options === void 0) { options = {
            autonumbering: true,
            pageNumber: -1
        }; }
        if (options.autonumbering) {
            this.pageNumber = parent.Pages.length + 1;
        }
        else {
            this.pageNumber = options.pageNumber;
        }
        this.padding = (0, Vector2_1.vector2)(0, 0);
        this.size = (0, Vector2_1.vector2)(parent.Document.page.width, parent.Document.page.height);
        this.fontLoader = parent.FontLoader;
        this.doc = parent.Document;
        this.composers = {
            line: new Line_composer_1["default"](this),
            text: new Text_composer_1["default"](this),
            rect: new Rect_composer_1["default"](this),
            image: new Image_composer_1["default"](this)
        };
        this.elements = {
            lines: [],
            rects: [],
            images: [],
            texts: [],
            sections: []
        };
    }
    Page.prototype.Section = function (section) {
        this.elements.sections.push(section);
    };
    Page.prototype.clearBuffer = function () {
        this.elements = {
            lines: [],
            rects: [],
            images: [],
            texts: [],
            sections: []
        };
        return this;
    };
    /**
     * Position is absolute
     * Text element that will be rendered onto the PDF
     * @Todo write documentation
     *
     * @default { fontSize: 16 }
     */
    Page.prototype.Text = function (text, position, options) {
        if (options === void 0) { options = {
            ignorePadding: false
        }; }
        if (options.ignorePadding === false) {
            if (position.X < this.padding.X) {
                position.setX(this.Padding.X);
            }
            if (position.X > this.Size.X - this.Padding.X) {
                position.setX(this.Size.X - this.Padding.X);
            }
            if (position.Y < this.padding.Y) {
                position.setY(this.Padding.Y);
            }
            if (position.Y > this.Size.Y - this.Padding.Y) {
                position.setY(this.Size.Y - this.Padding.Y);
            }
        }
        var txt = this.composers.text["new"](text, position);
        this.elements.texts.push(txt);
        return txt;
    };
    // TODO: TextArea
    /**
     * Line element that will be rendered onto the PDF
     * @Todo write documentation
     * @default style: { color: '#2e2e2e', width: 1 }
     */
    Page.prototype.Line = function (p1, p2, options) {
        if (options === void 0) { options = {
            ignorePadding: false
        }; }
        if (options.ignorePadding === false) {
            if (p1.X < this.padding.X) {
                p1.setX(this.Padding.X);
            }
            if (p2.X < this.padding.X) {
                p2.setX(this.Padding.X);
            }
            if (p1.X > this.Size.X - this.Padding.X) {
                p1.setX(this.Size.X - this.Padding.X);
            }
            if (p2.X > this.Size.X - this.Padding.X) {
                p2.setX(this.Size.X - this.Padding.X);
            }
            if (p1.Y < this.padding.Y) {
                p1.setY(this.Padding.Y);
            }
            if (p2.Y < this.padding.Y) {
                p1.setY(this.Padding.Y);
            }
            if (p1.Y > this.Size.Y - this.Padding.Y) {
                p1.setY(this.Size.Y - this.Padding.Y);
            }
            if (p2.Y > this.Size.Y - this.Padding.Y) {
                p2.setY(this.Size.Y - this.Padding.Y);
            }
        }
        var line = this.composers.line["new"](p1, p2);
        this.elements.lines.push(line);
        return line;
    };
    /**
     * @Todo write documentation
\	 */
    Page.prototype.Image = function (imageData, position, size, options) {
        if (options === void 0) { options = {
            ignorePadding: false
        }; }
        if (options.ignorePadding === false) {
            if (position.X < this.padding.X) {
                position.setX(this.Padding.X);
            }
            if (position.X + size.X > this.Size.X - this.Padding.X) {
                size.setX(this.Size.X - this.Padding.X - position.X);
            }
            if (position.X + size.X < this.Padding.X) {
                size.setX(this.Padding.X - position.X);
            }
            if (position.X > this.Size.X - this.Padding.X) {
                position.setX(this.Size.X - this.Padding.X);
            }
            if (position.Y < this.padding.Y) {
                position.setY(this.Padding.Y);
            }
            if (position.Y > this.Size.Y - this.Padding.Y) {
                position.setY(this.Size.Y - this.Padding.Y);
            }
        }
        var image = this.composers.image["new"](imageData, position, size);
        this.elements.images.push(image);
        return image;
    };
    /**
     * Rectangle that will be rendered onto the PDF
     *
     * @default style: { fillStyle: 'S', fill: '' }
     */
    Page.prototype.Rect = function (position, size, options) {
        if (options === void 0) { options = {
            ignorePadding: false
        }; }
        if (options.ignorePadding === false) {
            if (position.X < this.padding.X) {
                position.setX(this.Padding.X);
                size.add(-position.X, 0);
            }
            if (position.X + size.X > this.Size.X - this.Padding.X) {
                size.setX(this.Size.X - this.Padding.X - position.X);
            }
            if (position.X + size.X < this.Padding.X) {
                size.setX(this.Padding.X - position.X);
            }
            if (position.X > this.Size.X - this.Padding.X) {
                position.setX(this.Size.X - this.Padding.X);
            }
            if (position.Y < this.padding.Y) {
                position.setY(this.Padding.Y);
                size.add(0, -position.Y);
            }
            if (position.Y > this.Size.Y - this.Padding.Y) {
                position.setY(this.Size.Y - this.Padding.Y);
            }
        }
        var rect = this.composers.rect["new"](position, size);
        this.elements.rects.push(rect);
        return rect;
    };
    Page.prototype.render = function () {
        this.bootstrap();
        this.elements.sections.forEach(function (section) {
            section.render();
        });
        this.elements.rects.forEach(function (rect) {
            rect.render();
        });
        this.elements.lines.forEach(function (line) {
            line.render();
        });
        this.elements.images.forEach(function (image) {
            image.render();
        });
        this.elements.texts.forEach(function (text) {
            text.render();
        });
    };
    /**
     * @Helper
     * @Cleanup move to Page.class
     */
    Page.prototype.renderPaddingBorder = function () {
        var LineStyles = {
            color: '#C1292E'
        };
        // Left
        this.Line((0, Vector2_1.vector2)(this.Padding.X, 0), (0, Vector2_1.vector2)(this.Padding.X, this.Size.Y), {
            ignorePadding: true
        }).setStyle(LineStyles);
        // Top
        this.Line((0, Vector2_1.vector2)(0, this.Padding.Y), (0, Vector2_1.vector2)(this.Size.X, this.Padding.Y), {
            ignorePadding: true
        }).setStyle(LineStyles);
        // Right
        this.Line((0, Vector2_1.vector2)(this.Size.X - this.Padding.X, 0), (0, Vector2_1.vector2)(this.Size.X - this.Padding.X, this.Size.Y), {
            ignorePadding: true
        }).setStyle(LineStyles);
        // Bottom
        this.Line((0, Vector2_1.vector2)(0, this.Size.Y - this.Padding.Y), (0, Vector2_1.vector2)(this.Size.X, this.Size.Y - this.Padding.Y), {
            ignorePadding: true
        }).setStyle(LineStyles);
        return this;
    };
    Object.defineProperty(Page.prototype, "PageNumber", {
        get: function () {
            return this.pageNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "Size", {
        get: function () {
            return this.size.clone();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "Padding", {
        get: function () {
            return this.padding.clone();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "Document", {
        get: function () {
            return this.doc;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "FontLoader", {
        get: function () {
            return this.fontLoader;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "ComposerText", {
        get: function () {
            return this.composers.text;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "ComposeRect", {
        get: function () {
            return this.composers.rect;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "ComposerImage", {
        get: function () {
            return this.composers.image;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "ComposerLine", {
        get: function () {
            return this.composers.line;
        },
        enumerable: false,
        configurable: true
    });
    Page.prototype.setPadding = function (x, y) {
        this.padding.set(x, y);
    };
    Page.prototype.setPaddingVector = function (vec) {
        this.padding.setVec(vec);
    };
    return Page;
}());
exports["default"] = Page;
