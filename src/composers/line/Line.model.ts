import { PDFElement } from '../../main';
import { Vector2 } from '../../math/Vector2';

export type LineStyle = {
	color: string;
	width: number;
	dashed: {
		pattern: [number, number] | never[];
		start: number;
	};
};

export type Line = PDFElement & {
	start: Vector2;
	end: Vector2;
	style: LineStyle;
	setStyle(style: Partial<LineStyle>): Line;
};
