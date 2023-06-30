"use strict";
exports.__esModule = true;
exports.vector2 = void 0;
var vector2 = function (X, Y) {
    var result = {
        X: X,
        Y: Y,
        setY: function (y) {
            this.Y = y;
            return this;
        },
        setX: function (x) {
            this.X = x;
            return this;
        },
        set: function (x, y) {
            this.X = x;
            this.Y = y;
            return this;
        },
        setVec: function (vec) {
            this.X = vec.X;
            this.Y = vec.Y;
            return this;
        },
        add: function (x, y) {
            this.X += x;
            this.Y += y;
            return this;
        },
        addVec: function (vec) {
            this.X += vec.X;
            this.Y += vec.Y;
            return this;
        },
        substractVec: function (vec) {
            this.X -= vec.X;
            this.Y -= vec.Y;
            return this;
        },
        scale: function (scalar) {
            this.X *= scalar;
            this.Y *= scalar;
            return this;
        },
        scaleXY: function (xscalar, yscalar) {
            this.X *= xscalar;
            this.Y *= yscalar;
            return this;
        },
        update: function (newVector) {
            if (this.X < newVector.X) {
                this.X = newVector.X;
            }
            if (this.Y < newVector.Y) {
                this.Y = newVector.Y;
            }
            return this;
        },
        clone: function () {
            return (0, exports.vector2)(this.X, this.Y);
        }
    };
    return result;
};
exports.vector2 = vector2;
