import jsPDF from 'jspdf';

import { Vector2, vector2 } from '../math/Vector2';
import {
	FontLoader,
	Image,
	Line,
	PDFBuilder,
	Rect,
	Section,
	Text,
} from '../main';
import LineComposer from '../composers/line/Line.composer';
import TextComposer from '../composers/text/Text.composer';
import RectComposer from '../composers/rect/Rect.composer';
import ImageComposer from '../composers/image/Image.composer';

abstract class Page {
	private padding: Vector2;

	private pageNumber: number;

	private size: Vector2;

	private fontLoader: FontLoader;

	private doc: jsPDF;

	private composers: {
		line: LineComposer;
		text: TextComposer;
		rect: RectComposer;
		image: ImageComposer;
	};

	private elements: {
		lines: Line[];
		rects: Rect[];
		images: Image[];
		texts: Text[];
		sections: Section[];
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
			line: new LineComposer(this),
			text: new TextComposer(this),
			rect: new RectComposer(this),
			image: new ImageComposer(this),
		};

		this.elements = {
			lines: [],
			rects: [],
			images: [],
			texts: [],
			sections: [],
		};
	}

	abstract bootstrap(): void;

	Section(section: Section) {
		this.elements.sections.push(section);
	}

	clearBuffer() {
		this.elements = {
			lines: [],
			rects: [],
			images: [],
			texts: [],
			sections: [],
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
	Text(
		text: string,
		position: Vector2,
		options = {
			ignorePadding: false,
		}
	) {
		if (options.ignorePadding === false) {
			if (position.X < this.padding.X) {
				position.setX(this.Padding.X);
			}
			if (position.X > this.Size.X - this.Padding.X) {
				position.setX(this.Size.X - this.Padding.X);
			}
			if (position.Y < this.padding.Y) {
				position.setY(this.Padding.Y);
			}
			if (position.Y > this.Size.Y - this.Padding.Y) {
				position.setY(this.Size.Y - this.Padding.Y);
			}
		}

		const txt = this.composers.text.new(text, position);
		this.elements.texts.push(txt);
		return txt;
	}

	// TODO: TextArea

	/**
	 * Line element that will be rendered onto the PDF
	 * @Todo write documentation
	 * @default style: { color: '#2e2e2e', width: 1 }
	 */
	Line(
		p1: Vector2,
		p2: Vector2,
		options = {
			ignorePadding: false,
		}
	) {
		if (options.ignorePadding === false) {
			if (p1.X < this.padding.X) {
				p1.setX(this.Padding.X);
			}
			if (p2.X < this.padding.X) {
				p2.setX(this.Padding.X);
			}
			if (p1.X > this.Size.X - this.Padding.X) {
				p1.setX(this.Size.X - this.Padding.X);
			}
			if (p2.X > this.Size.X - this.Padding.X) {
				p2.setX(this.Size.X - this.Padding.X);
			}
			if (p1.Y < this.padding.Y) {
				p1.setY(this.Padding.Y);
			}
			if (p2.Y < this.padding.Y) {
				p1.setY(this.Padding.Y);
			}
			if (p1.Y > this.Size.Y - this.Padding.Y) {
				p1.setY(this.Size.Y - this.Padding.Y);
			}
			if (p2.Y > this.Size.Y - this.Padding.Y) {
				p2.setY(this.Size.Y - this.Padding.Y);
			}
		}

		const line = this.composers.line.new(p1, p2);
		this.elements.lines.push(line);
		return line;
	}

	/**
	 * @Todo write documentation
\	 */
	Image(
		imageData: string,
		position: Vector2,
		size: Vector2,
		options = {
			ignorePadding: false,
		}
	) {
		if (options.ignorePadding === false) {
			if (position.X < this.padding.X) {
				position.setX(this.Padding.X);
			}

			if (position.X + size.X > this.Size.X - this.Padding.X) {
				size.setX(this.Size.X - this.Padding.X - position.X);
			}

			if (position.X + size.X < this.Padding.X) {
				size.setX(this.Padding.X - position.X);
			}

			if (position.X > this.Size.X - this.Padding.X) {
				position.setX(this.Size.X - this.Padding.X);
			}

			if (position.Y < this.padding.Y) {
				position.setY(this.Padding.Y);
			}
			if (position.Y > this.Size.Y - this.Padding.Y) {
				position.setY(this.Size.Y - this.Padding.Y);
			}
		}

		const image = this.composers.image.new(imageData, position, size);

		this.elements.images.push(image);

		return image;
	}

	/**
	 * Rectangle that will be rendered onto the PDF
	 *
	 * @default style: { fillStyle: 'S', fill: '' }
	 */
	Rect(
		position: Vector2,
		size: Vector2,
		options = {
			ignorePadding: false,
		}
	) {
		if (options.ignorePadding === false) {
			if (position.X < this.padding.X) {
				position.setX(this.Padding.X);
				size.add(-position.X, 0);
			}

			if (position.X + size.X > this.Size.X - this.Padding.X) {
				size.setX(this.Size.X - this.Padding.X - position.X);
			}

			if (position.X + size.X < this.Padding.X) {
				size.setX(this.Padding.X - position.X);
			}

			if (position.X > this.Size.X - this.Padding.X) {
				position.setX(this.Size.X - this.Padding.X);
			}

			if (position.Y < this.padding.Y) {
				position.setY(this.Padding.Y);
				size.add(0, -position.Y);
			}
			if (position.Y > this.Size.Y - this.Padding.Y) {
				position.setY(this.Size.Y - this.Padding.Y);
			}
		}

		const rect = this.composers.rect.new(position, size);
		this.elements.rects.push(rect);
		return rect;
	}

	render() {
		this.bootstrap();

		this.elements.sections.forEach((section) => {
			section.render();
		});

		this.elements.rects.forEach((rect) => {
			rect.render();
		});

		this.elements.lines.forEach((line) => {
			line.render();
		});

		this.elements.images.forEach((image) => {
			image.render();
		});

		this.elements.texts.forEach((text) => {
			text.render();
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
			vector2(this.Padding.X, this.Size.Y),
			{
				ignorePadding: true,
			}
		).setStyle(LineStyles);

		// Top
		this.Line(
			vector2(0, this.Padding.Y),
			vector2(this.Size.X, this.Padding.Y),
			{
				ignorePadding: true,
			}
		).setStyle(LineStyles);

		// Right
		this.Line(
			vector2(this.Size.X - this.Padding.X, 0),
			vector2(this.Size.X - this.Padding.X, this.Size.Y),
			{
				ignorePadding: true,
			}
		).setStyle(LineStyles);

		// Bottom
		this.Line(
			vector2(0, this.Size.Y - this.Padding.Y),
			vector2(this.Size.X, this.Size.Y - this.Padding.Y),
			{
				ignorePadding: true,
			}
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

	get FontLoader() {
		return this.fontLoader;
	}

	get ComposerText() {
		return this.composers.text;
	}

	get ComposeRect() {
		return this.composers.rect;
	}

	get ComposerImage() {
		return this.composers.image;
	}

	get ComposerLine() {
		return this.composers.line;
	}

	setPadding(x: number, y: number) {
		this.padding.set(x, y);
	}

	setPaddingVector(vec: Vector2) {
		this.padding.setVec(vec);
	}
}

export default Page;
