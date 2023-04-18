import jsPDF from 'jspdf';

import { Vector2, vector2 } from '../math/Vector2';
import {
	FontLoader,
	Image,
	Line,
	PDFBuilder,
	Rect,
	RectStyle,
	Text,
} from '../main';
import { assert } from 'console';
import LineComposer from '../composers/Line.composer';

abstract class Page {
	private padding: Vector2;

	private pageNumber: number;

	private size: Vector2;

	private fontLoader: FontLoader;

	private doc: jsPDF;

	private composers: {
		lineComposer: LineComposer;
	};

	private elements: {
		lines: Line[];
		rects: Rect[];
		images: Image[];
		texts: Text[];
	};

	constructor(
		parent: PDFBuilder,
		options = {
			autonumbering: true,
			pageNumber: -1,
		}
	) {
		if (options.autonumbering) {
			this.pageNumber = parent.Pages.length + 1;
		} else {
			this.pageNumber = options.pageNumber;
		}

		this.padding = vector2(0, 0);
		this.size = vector2(
			parent.Document.internal.pageSize.getWidth(),
			parent.Document.internal.pageSize.getHeight()
		);

		this.fontLoader = parent.FontLoader;
		this.doc = parent.Document;

		this.composers = {
			lineComposer: new LineComposer(this),
		};

		this.elements = {
			lines: [],
			rects: [],
			images: [],
			texts: [],
		};

		this.bootstrap();
	}

	abstract bootstrap(): void;

	clearBuffer() {
		this.elements = {
			lines: [],
			rects: [],
			images: [],
			texts: [],
		};
		return this;
	}

	/**
	 * Position is absolute
	 * Text element that will be rendered onto the PDF
	 * @Todo write documentation
	 *
	 * @default { fontSize: 16 }
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

		const start = position.clone();

		const txt: Text = {
			data: text,
			PARENT: this,
			start,
			fontSize: this.fontLoader.CurrentSize,
			color: '#2e2e2e',
			size: vector2(w, h),
			end: start.clone().addVec(vector2(w, h)),
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
			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};
		this.elements.texts.push(txt);
		return txt;
	}

	// TODO: TextArea

	/**
	 * Line element that will be rendered onto the PDF
	 * @Todo write documentation
	 * @default style: { color: '#2e2e2e', width: 1 }
	 */
	Line(p1: Vector2, p2: Vector2) {
		const line = this.composers.lineComposer.newLine(p1, p2);
		this.elements.lines.push(line);
		return line;
	}

	/**
	 * Image element that will be rendered onto the PDF
	 *
	 * @Todo write documentation
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
			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};

		this.elements.images.push(image);

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

			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};

		this.elements.rects.push(rect);

		return rect;
	}

	render() {
		this.elements.lines.forEach((line) => {
			line.render();
		});
		this.elements.texts.forEach((text) => {
			text.render();
		});
		this.elements.rects.forEach((rect) => {
			rect.render();
		});
		this.elements.images.forEach((image) => {
			image.render();
		});
	}

	/**
	 * @Helper
	 * @Cleanup move to Page.class
	 */
	renderPaddingBorder() {
		const LineStyles = {
			color: '#C1292E',
		};

		// Left
		this.Line(
			vector2(this.Padding.X, 0),
			vector2(this.Padding.X, this.Size.Y)
		).setStyle(LineStyles);

		// Top
		this.Line(
			vector2(0, this.Padding.Y),
			vector2(this.Size.X, this.Padding.Y)
		).setStyle(LineStyles);

		// Right
		this.Line(
			vector2(this.Size.X - this.Padding.X, 0),
			vector2(this.Size.X - this.Padding.X, this.Size.Y)
		).setStyle(LineStyles);

		// Bottom
		this.Line(
			vector2(0, this.Size.Y - this.Padding.Y),
			vector2(this.Size.X, this.Size.Y - this.Padding.Y)
		).setStyle(LineStyles);

		return this;
	}

	get PageNumber() {
		return this.pageNumber;
	}

	get Size() {
		return this.size.clone();
	}

	get Padding() {
		return this.padding.clone();
	}

	get Document() {
		return this.doc;
	}

	setPadding(x: number, y: number) {
		this.padding.set(x, y);
	}

	setPaddingVector(vec: Vector2) {
		this.padding.setVec(vec);
	}
}

export default Page;
