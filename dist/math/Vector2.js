"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vector2 = void 0;
const vector2 = (X, Y) => {
    const result = {
        X,
        Y,
        setY(y) {
            this.Y = y;
            return this;
        },
        setX(x) {
            this.X = x;
            return this;
        },
        set(x, y) {
            this.X = x;
            this.Y = y;
            return this;
        },
        setVec(vec) {
            this.X = vec.X;
            this.Y = vec.Y;
            return this;
        },
        add(x, y) {
            this.X += x;
            this.Y += y;
            return this;
        },
        addVec(vec) {
            this.X += vec.X;
            this.Y += vec.Y;
            return this;
        },
        substractVec(vec) {
            this.X -= vec.X;
            this.Y -= vec.Y;
            return this;
        },
        scale(scalar) {
            this.X *= scalar;
            this.Y *= scalar;
            return this;
        },
        scaleXY(xscalar, yscalar) {
            this.X *= xscalar;
            this.Y *= yscalar;
            return this;
        },
        update(newVector) {
            if (this.X < newVector.X) {
                this.X = newVector.X;
            }
            if (this.Y < newVector.Y) {
                this.Y = newVector.Y;
            }
            return this;
        },
        clone() {
            return (0, exports.vector2)(this.X, this.Y);
        },
    };
    return result;
};
exports.vector2 = vector2;
//# sourceMappingURL=Vector2.js.map