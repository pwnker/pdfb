import { Vector2 } from '../math/Vector2';
import PDFBuilder from './PDFBuilder';

export type LineStyle = {
	color: string;
	width: number;
	dashed: {
		pattern: [number, number] | never[];
		start: number;
	};
};

export type RectStyle = {
	fillStyle: 'S' | 'F' | 'FD' | 'DF';
	fill: string;
	line: LineStyle;
};

export interface PDFElement {
	PARENT: PDFBuilder;
	start: Vector2;
	size: Vector2;
	end: Vector2;
	renderBoundingBox(): void;
	render(): void;
}

export type Line = PDFElement & {
	start: Vector2;
	end: Vector2;
	style: LineStyle;
	setStyle(style: Partial<LineStyle>): Line;
};

export type Rect = PDFElement & {
	style: RectStyle;
	setStyle(style: Partial<RectStyle>): Rect;
};

export type Image = PDFElement & {
	data: string;
	format: 'png' | 'jpg';
	setFormat(format: 'png' | 'jpg'): Image;
	underline(offset?: Vector2): Image;
};

export type Text = PDFElement & {
	data: string;
	fontSize: number;
	color: string;
	getDimensions(): Vector2;
	getRenderVector(): Vector2;
	setFontSize(size: number): Text;
	setColor(color: string): Text;
	underline(yoffset?: number): Text;
};
