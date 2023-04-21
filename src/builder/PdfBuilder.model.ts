import { Vector2 } from '../math/Vector2';
import Page from '../page/Page';
// import PDFBuilder from './PDFBuilder';

export interface PDFElement {
	PARENT: Page;
	start: Vector2;
	size: Vector2;
	end: Vector2;
	renderBoundingBox(): void;
	render(): void;
	Start(): Vector2;
	End(): Vector2;
}
