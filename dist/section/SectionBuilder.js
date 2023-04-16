"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vector2_1 = require("../math/Vector2");
class SectionBuilder {
    start;
    end;
    contentStart;
    contentEnd;
    size;
    cursor;
    padding;
    constructor(sectionStart, padding) {
        this.start = sectionStart.clone();
        this.end = this.start.clone();
        this.padding = padding ?? (0, Vector2_1.vector2)(0, 0);
        this.contentStart = this.start.clone().addVec(this.padding);
        this.contentEnd = this.start.clone().addVec(this.padding);
        this.cursor = this.start.clone().addVec(this.padding);
        this.size = (0, Vector2_1.vector2)(0, 0);
    }
    moveCursor(x, y) {
        return this.cursor.add(x, y);
    }
    indentCursor(x, y) {
        return this.cursor.add(0, y).clone().add(x, 0);
    }
    append(element) {
        const SizeVector = element.end
            .substractVec(this.start)
            .addVec(this.padding);
        this.size.update(SizeVector);
        this.end = this.Start.addVec(this.size.clone());
    }
    setSize(width, height) {
        this.size.X = width;
        this.size.Y = height;
        return this.Size;
    }
    fill(builder) {
        builder.Rect(this.Start, this.Size).setStyle({
            fillStyle: 'DF',
            fill: '#1e7da9',
        });
    }
    renderBorders(builder) {
        builder.Rect(this.Start, this.Size);
    }
    get Start() {
        return this.start.clone();
    }
    get Size() {
        return this.size.clone();
    }
    get End() {
        return this.end.clone();
    }
    get ContentStart() {
        return this.contentStart.clone();
    }
    get Padding() {
        return this.padding.clone();
    }
}
exports.default = SectionBuilder;
//# sourceMappingURL=SectionBuilder.js.map