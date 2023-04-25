import { PDFElement } from '../../main';
import { Vector2 } from '../../math/Vector2';

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
