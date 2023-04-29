import { Image, Line, Rect, Text } from '../main';
import { vector2, Vector2 } from '../math/Vector2';
import Page from '../page/Page';

class Section {
	private PARENT: Page;

	private position: Vector2;

	private padding: Vector2;

	private start: Vector2;

	private size: Vector2;

	private content: {
		background: Rect | null;
		border: Rect | null;
		lines: Line[];
		images: Image[];
		texts: Text[];
		rects: Rect[];
	};

	constructor(parent: Page, position: Vector2, padding?: Vector2) {
		this.PARENT = parent;

		this.position = position.clone();
		this.padding = padding ?? vector2(0, 0);

		this.start = this.position.clone().addVec(this.padding);
		this.size = this.padding.clone();

		this.content = {
			background: null,
			border: null,
			lines: [],
			images: [],
			texts: [],
			rects: [],
		};
	}

	addLine(start: Vector2, end: Vector2) {
		const line = this.PARENT.ComposerLine.new(
			this.start.clone().addVec(start),
			this.start.clone().addVec(end)
		);

		this.content.lines.push(line);

		const SizeVector = line.end
			.clone()
			.addVec(this.start)
			.substractVec(this.start.clone())
			.addVec(this.padding.clone().scale(2));
		this.size.update(SizeVector);
		return line;
	}

	addText(
		text: string,
		position: Vector2,
		options: Partial<{
			fontSize: number;
			underline: boolean;
			color: string;
		}> = {
			fontSize: 12,
			underline: false,
			color: '#2e2e2e',
		}
	) {
		const txt = this.PARENT.ComposerText.new(
			text,
			this.start.clone().addVec(position)
		).setFontSize(options.fontSize ?? 12);

		if (options.color !== undefined) {
			txt.setColor(options.color);
		}

		if (options.underline === true) {
			txt.underline();
		}

		txt.end.substractVec(this.start);

		this.content.texts.push(txt);

		const SizeVector = txt.end
			.clone()
			.addVec(this.start)
			.substractVec(this.start.clone())
			.addVec(this.padding.clone().scale(2));
		this.size.update(SizeVector);

		return txt;
	}

	addImage(imageData: string, position: Vector2, size: Vector2) {
		const img = this.PARENT.ComposerImage.new(
			imageData,
			this.start.clone().addVec(position),
			size
		);

		img.end.substractVec(this.start);

		this.content.images.push(img);

		const SizeVector = img.end
			.clone()
			.addVec(this.start)
			.substractVec(this.start.clone())
			.addVec(this.padding.clone().scale(2));
		this.size.update(SizeVector);

		return img;
	}

	addRect(position: Vector2, size: Vector2) {
		const rect = this.PARENT.ComposeRect.new(
			this.start.clone().addVec(position),
			size
		);

		rect.end.substractVec(this.start);

		this.content.rects.push(rect);

		const SizeVector = rect.end
			.clone()
			.addVec(this.start)
			.substractVec(this.start.clone())
			.addVec(this.padding.clone().scale(2));
		this.size.update(SizeVector);

		return rect;
	}

	rednerBorder(
		options: { side: 'top' | 'bottom' | 'left' | 'right' | 'all' } = {
			side: 'all',
		}
	) {
		let rect;
		if (options.side === 'all') {
			rect = this.PARENT.ComposeRect.new(this.Position, this.Size);
		} else if (options.side === 'bottom') {
			rect = this.PARENT.ComposeRect.new(
				this.Position.add(0, this.Size.Y),
				this.Size.setY(0)
			);
		} else {
			throw new Error(`Unexpected '${options.side}' side option`);
		}
		this.content.border = rect;
	}

	// #1e7da9
	fill() {
		const rect = this.PARENT.ComposeRect.new(this.Position, this.Size).setStyle(
			{
				fillStyle: 'DF',
				fill: '#1e7da9',
			}
		);

		this.content.background = rect;
		return rect;
	}

	render() {
		this.content.background?.render();
		this.content.border?.render();

		this.content.lines.forEach((line) => {
			line.render();
		});

		this.content.rects.forEach((rect) => {
			rect.render();
		});

		this.content.images.forEach((image) => {
			image.render();
		});

		this.content.texts.forEach((text) => {
			text.render();
		});
	}

	setSize(size: Vector2) {
		this.size.setVec(size);
	}

	get Position() {
		return this.position.clone();
	}

	get Start() {
		return this.start.clone();
	}

	get Size() {
		return this.size.clone();
	}

	get Padding() {
		return this.padding.clone();
	}
}

export default Section;
