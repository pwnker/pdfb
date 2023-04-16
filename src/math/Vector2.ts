export interface Vector2 {
	X: number;
	Y: number;
	setX(x: number): Vector2;
	setY(y: number): Vector2;
	set(x: number, y: number): Vector2;
	setVec(vec: Vector2): Vector2;
	add(x: number, y: number): Vector2;
	addVec(vec: Vector2): Vector2;
	substractVec(vec: Vector2): Vector2;
	scale(scalar: number): Vector2;
	scaleXY(xscalar: number, yscalar: number): Vector2;
	update(newVector: Vector2): Vector2;
	clone(): Vector2;
}

export const vector2 = (X: number, Y: number): Vector2 => {
	const result: Vector2 = {
		X,
		Y,
		setY(y: number): Vector2 {
			this.Y = y;
			return this;
		},
		setX(x: number): Vector2 {
			this.X = x;
			return this;
		},
		set(x: number, y: number): Vector2 {
			this.X = x;
			this.Y = y;
			return this;
		},
		setVec(vec: Vector2): Vector2 {
			this.X = vec.X;
			this.Y = vec.Y;
			return this;
		},
		add(x: number, y: number): Vector2 {
			this.X += x;
			this.Y += y;
			return this;
		},
		addVec(vec: Vector2): Vector2 {
			this.X += vec.X;
			this.Y += vec.Y;
			return this;
		},
		substractVec(vec: Vector2): Vector2 {
			this.X -= vec.X;
			this.Y -= vec.Y;
			return this;
		},
		scale(scalar: number): Vector2 {
			this.X *= scalar;
			this.Y *= scalar;
			return this;
		},
		scaleXY(xscalar: number, yscalar: number): Vector2 {
			this.X *= xscalar;
			this.Y *= yscalar;
			return this;
		},
		update(newVector: Vector2) {
			if (this.X < newVector.X) {
				this.X = newVector.X;
			}
			if (this.Y < newVector.Y) {
				this.Y = newVector.Y;
			}
			return this;
		},
		clone() {
			return vector2(this.X, this.Y);
		},
	};
	return result;
};
