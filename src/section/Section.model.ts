import { Image, Line, Rect, Text } from '../main';
import { Vector2 } from '../math/Vector2';

export type Section = {
	position: Vector2;
	size: Vector2;
	cursor: Vector2;
	padding: Vector2;
	elements: {
		lines: Line[];
		rects: Rect[];
		images: Image[];
		texts: Text[];
	};
	render(): void;
};
