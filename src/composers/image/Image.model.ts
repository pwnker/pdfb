import { PDFElement } from '../../main';
import { Vector2 } from '../../math/Vector2';

export type ImageFormats = 'png' | 'jpg';

export type Image = PDFElement & {
	data: string;
	format: ImageFormats;
	setFormat(format: ImageFormats): Image;
	underline(offset?: Vector2): Image;
};
