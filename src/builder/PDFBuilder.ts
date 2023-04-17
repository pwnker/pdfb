import jsPDF from 'jspdf';

import { vector2, Vector2 } from '../math/Vector2';
import FontLoader from '../fonts/FontLoader';
import { Image, Line, Rect, RectStyle, Text } from './PdfBuilder.model';
import COURIER from '../fonts/internal/courier';
import assert from '../Assert';

class PDFBuilder {
	private doc: jsPDF;

	private start: Vector2;

	private position: Vector2;

	Page: {
		width: number;
		height: number;
		padding: number;
	};

	private Lines: Line[];

	private Rects: Rect[];

	private Images: Image[];

	private Texts: Text[];

	private fontLoader: FontLoader;

	constructor(doc: jsPDF) {
		this.doc = doc;

		this.Page = {
			width: doc.internal.pageSize.width,
			height: doc.internal.pageSize.height,
			padding: 5,
		};

		this.start = vector2(this.Page.padding, this.Page.padding);

		this.position = this.Start.clone();

		this.fontLoader = new FontLoader(doc, 22);
		this.fontLoader.setFont(COURIER.NORMAL);

		this.Lines = [];
		this.Rects = [];
		this.Images = [];
		this.Texts = [];
	}

	get FontLoader() {
		return this.fontLoader;
	}

	get PageWidth() {
		return this.Page.width - this.Page.padding * 2;
	}

	get PageHeight() {
		return this.Page.height - this.Page.padding * 2;
	}

	clearBuffer() {
		this.Lines = [];
		this.Rects = [];
		this.Images = [];
		this.Texts = [];
	}

	/**
	 * @Helper
	 * @cleanup
	 */
	renderPaddingBorder() {
		const LineStyles = {
			color: '#C1292E',
		};

		// Left
		this.Line(
			vector2(this.Page.padding, 0),
			vector2(this.Page.padding, this.Page.height)
		).setStyle(LineStyles);

		// Top
		this.Line(
			vector2(0, this.Page.padding),
			vector2(this.Page.width, this.Page.padding)
		).setStyle(LineStyles);

		// Right
		this.Line(
			vector2(this.Page.width - this.Page.padding, 0),
			vector2(this.Page.width - this.Page.padding, this.Page.height)
		).setStyle(LineStyles);

		// Bottom
		this.Line(
			vector2(0, this.Page.height - this.Page.padding),
			vector2(this.Page.width, this.Page.height - this.Page.padding)
		).setStyle(LineStyles);
	}

	/**
	 * Render all elements to the PDF document
	 *
	 * Order: ```Images -> Rects -> Texts -> Lines```
	 */
	render() {
		this.Images.forEach((image) => {
			image.render();
		});
		this.Rects.forEach((rect) => {
			rect.render();
		});
		this.Texts.forEach((text) => {
			text.render();
		});
		this.Lines.forEach((line) => {
			line.render();
		});
	}

	resetPosition() {
		this.position.setVec(this.start);
		return this.position.clone();
	}

	/**
	 * @Cleanup - should the user be responsable for the start, position and buffer reset ??
	 */
	AddPage() {
		this.doc.addPage();

		this.start = vector2(this.Page.padding, this.Page.padding);

		this.position = this.Start.clone();

		this.clearBuffer();
	}

	/**
	 * Text element that will be rendered onto the PDF
	 *
	 *	@default { fontSize: 16 }
	 */
	Text(text: string, position: Vector2) {
		const { w, h } = this.doc.getTextDimensions(text, {
			fontSize: this.fontLoader.CurrentSize,
		});

		const boundingBox = (pos: Vector2, size: Vector2) => {
			return {
				position: pos.clone(),
				size,
				end: position.clone().addVec(vector2(text.length * w, h)),
			};
		};

		const txt: Text = {
			data: text,
			PARENT: this,
			start: position.clone(),
			fontSize: this.fontLoader.CurrentSize,
			color: '#2e2e2e',
			size: vector2(w, h),
			end: position.clone().addVec(vector2(w, h)),
			getDimensions() {
				const result = this.PARENT.doc.getTextDimensions(this.data, {
					fontSize: this.fontSize,
				});
				return vector2(result.w, result.h);
			},
			getRenderVector() {
				const { Y: height } = this.getDimensions();
				return this.start.clone().add(0, height - height / 8);
			},
			setFontSize(size: number) {
				this.fontSize = size;

				this.size = this.getDimensions();
				this.start = position.clone();
				this.end = position.clone().addVec(this.size);

				return this;
			},
			setColor(color: string) {
				this.color = color;
				return this;
			},
			underline(yoffset?: number) {
				const curDrawColor = this.PARENT.doc.getDrawColor();
				this.PARENT.doc.setDrawColor(this.color);
				this.size.add(0, yoffset ?? 1);
				this.end.add(0, yoffset ?? 1);
				this.PARENT.Line(
					this.start.clone().setY(this.end.Y),
					this.end.clone()
				).setStyle({
					color: this.color,
				});
				this.PARENT.doc.setDrawColor(curDrawColor);
				return this;
			},
			renderBoundingBox() {
				const bb = boundingBox(this.start.clone(), this.size.clone());
				this.PARENT.Rect(bb.position, bb.size).render();
			},
			render() {
				const curTextColor = this.PARENT.doc.getTextColor();

				// this.renderBoundingBox();

				this.PARENT.doc.setTextColor(this.color);
				this.PARENT.fontLoader.setFontSize(this.fontSize);
				this.PARENT.doc.text(
					this.data,
					this.getRenderVector().X,
					this.getRenderVector().Y
				);
				this.PARENT.fontLoader.restoreFontSize();
				this.PARENT.doc.setTextColor(curTextColor);
			},
		};

		this.Texts.push(txt);

		return txt;
	}

	// TODO: TextArea

	/**
	 * Line element that will be rendered onto the PDF
	 * @default style: { color: '#2e2e2e', width: 1 }
	 */
	Line(p1: Vector2, p2: Vector2) {
		const line: Line = {
			start: p1,
			end: p2,
			size: vector2(p2.X - p1.X, p2.Y - p1.Y),
			style: {
				color: '#2e2e2e',
				width: 1,
				dashed: {
					pattern: [],
					start: 0,
				},
			},
			PARENT: this,
			setStyle(
				style: Partial<{
					color: string;
					dashed: { pattern: [number, number] | never[]; start: number };
				}>
			): Line {
				this.style = {
					...this.style,
					...style,
				};
				return this;
			},
			renderBoundingBox() {
				assert(false, 'TODO:');
			},
			render(): void {
				const curDrawColor = this.PARENT.doc.getDrawColor();

				this.PARENT.doc.setDrawColor(this.style.color);
				this.PARENT.doc.setLineDashPattern(
					this.style.dashed.pattern,
					this.style.dashed.start
				);
				this.PARENT.doc.line(
					this.start.X,
					this.start.Y,
					this.end.X,
					this.end.Y
				);

				this.PARENT.doc.setDrawColor(curDrawColor);
			},
		};
		this.Lines.push(line);
		return line;
	}

	/**
	 * Image element that will be rendered onto the PDF
	 *
	 * @default { format: 'png' }
	 */
	Image(imageData: string, position: Vector2, size: Vector2) {
		const boundingBox = (pos: Vector2, bsize: Vector2) => {
			return {
				position: pos.clone(),
				size: bsize,
				end: position.clone().addVec(bsize),
			};
		};

		const image: Image = {
			data: imageData,
			start: position.clone(),
			size,
			end: position.clone().addVec(size),
			format: 'png',
			PARENT: this,
			setFormat(format: 'png' | 'jpg'): Image {
				this.format = format;
				return this;
			},
			underline(offset?: Vector2) {
				this.PARENT.Line(
					this.start
						.clone()
						.add(0, this.size.Y)
						.addVec(offset ?? vector2(0, 0)),
					this.start
						.clone()
						.addVec(this.size)
						.addVec((offset ?? vector2(0, 0)).scaleXY(-1, 1))
				);
				return this;
			},
			renderBoundingBox() {
				const bb = boundingBox(this.start.clone(), this.size.clone());
				this.PARENT.Rect(bb.position, bb.size).render();
			},
			render(): void {
				// this.renderBoundingBox();
				this.PARENT.doc.addImage(
					imageData,
					'png',
					this.start.X,
					this.start.Y,
					size.X,
					size.Y
				);
			},
		};

		this.Images.push(image);

		return image;
	}

	/**
	 * Rectangle that will be rendered onto the PDF
	 *
	 * @default style: { fillStyle: 'S', fill: '' }
	 */
	Rect(p1: Vector2, size: Vector2) {
		const rect: Rect = {
			start: p1.clone(),
			size,
			end: p1.clone().addVec(size),
			style: {
				fillStyle: 'S',
				fill: '',
				line: {
					color: '',
					width: 0,
					dashed: {
						pattern: [],
						start: 0,
					},
				},
			},
			PARENT: this,
			setStyle(style: Partial<RectStyle>): Rect {
				this.style = {
					...this.style,
					...style,
				};
				return this;
			},
			renderBoundingBox() {
				assert(false, 'TODO:');
			},
			render(): void {
				const curFillColor = this.PARENT.doc.getFillColor();
				const curLineWidth = this.PARENT.doc.getLineWidth();

				this.PARENT.doc.setFillColor(this.style.fill);
				this.PARENT.doc.setLineWidth(this.style.line.width);
				this.PARENT.doc.setLineDashPattern(
					this.style.line.dashed.pattern,
					this.style.line.dashed.start
				);
				this.PARENT.doc.rect(
					this.start.X,
					this.start.Y,
					this.size.X,
					this.size.Y,
					this.style.fillStyle
				);

				this.PARENT.doc.setFillColor(curFillColor);
				this.PARENT.doc.setLineWidth(curLineWidth);
			},
		};

		this.Rects.push(rect);

		return rect;
	}

	get Start() {
		return this.start.clone();
	}

	get Position() {
		return this.position.clone();
	}

	get Document() {
		return this.doc;
	}
}

export default PDFBuilder;
