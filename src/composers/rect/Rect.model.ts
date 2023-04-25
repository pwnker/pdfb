import { PDFElement } from '../../main';
import { LineStyle } from '../line/Line.model';

export type RectFillStyle = 'S' | 'F' | 'FD' | 'DF';

export type RectStyle = {
	fillStyle: RectFillStyle;
	fill: string;
	line: LineStyle;
};

export type Rect = PDFElement & {
	style: RectStyle;
	setStyle(style: Partial<RectStyle>): Rect;
};
