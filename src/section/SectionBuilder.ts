import { vector2, Vector2 } from '../math/Vector2';
import PDFBuilder from '../builder/PDFBuilder';
import { PDFElement } from '../builder/PdfBuilder.model';

class SectionBuilder {
	private start: Vector2;

	private end: Vector2;

	private contentStart: Vector2;

	private contentEnd: Vector2;

	private size: Vector2;

	private cursor: Vector2;

	private padding: Vector2;

	constructor(sectionStart: Vector2, padding?: Vector2) {
		this.start = sectionStart.clone();
		this.end = this.start.clone();
		this.padding = padding ?? vector2(0, 0);
		this.contentStart = this.start.clone().addVec(this.padding);
		this.contentEnd = this.start.clone().addVec(this.padding);
		this.cursor = this.start.clone().addVec(this.padding);
		this.size = vector2(0, 0);
	}

	moveCursor(x: number, y: number) {
		return this.cursor.add(x, y);
	}

	indentCursor(x: number, y: number) {
		return this.cursor.add(0, y).clone().add(x, 0);
	}

	append(element: PDFElement) {
		const SizeVector = element.end
			.substractVec(this.start)
			.addVec(this.padding);
		this.size.update(SizeVector);
		this.end = this.Start.addVec(this.size.clone());
	}

	setSize(width: number, height: number) {
		this.size.X = width;
		this.size.Y = height;
		return this.Size;
	}

	fill(builder: PDFBuilder) {
		builder.Rect(this.Start, this.Size).setStyle({
			fillStyle: 'DF',
			fill: '#1e7da9',
		});
	}

	renderBorders(builder: PDFBuilder) {
		builder.Rect(this.Start, this.Size);
	}

	get Start() {
		return this.start.clone();
	}

	get Size() {
		return this.size.clone();
	}

	get End() {
		return this.end.clone();
	}

	get ContentStart() {
		return this.contentStart.clone();
	}

	get Padding() {
		return this.padding.clone();
	}
}

export default SectionBuilder;
