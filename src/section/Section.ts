import { Image, Line, Rect, Text } from '../main';
import { vector2, Vector2 } from '../math/Vector2';
import Page from '../page/Page';

class Section {
	private PARENT: Page;

	private position: Vector2;

	private padding: Vector2;

	private size: Vector2;

	private content: {
		start: Vector2;
		cursor: Vector2;
		background: Rect | null;
		border: Rect | null;
		lines: Line[];
		images: Image[];
		texts: Text[];
	};

	constructor(parent: Page, position: Vector2, padding?: Vector2) {
		this.PARENT = parent;
		this.position = position.clone();
		this.padding = padding ?? vector2(0, 0);
		this.content = {
			start: this.position.clone().addVec(this.padding),
			cursor: this.position.clone().addVec(this.padding),
			background: null,
			border: null,
			lines: [],
			images: [],
			texts: [],
		};
		this.size = vector2(0, 0);
	}

	addLine(start: Vector2, end: Vector2) {
		const line = this.PARENT.ComposerLine.new(
			this.content.start.clone().addVec(start),
			this.content.start.clone().addVec(end)
		);

		this.content.lines.push(line);
		return line;
	}

	addText(text: string, position: Vector2) {
		const txt = this.PARENT.ComposerText.new(
			text,
			this.content.start.clone().addVec(position)
		);

		this.content.texts.push(txt);
		return txt;
	}

	addImage(imageData: string, position: Vector2, size: Vector2) {
		const img = this.PARENT.ComposerImage.new(
			imageData,
			this.content.start.clone().addVec(position),
			size
		);

		this.content.images.push(img);
		return img;
	}

	computeSize() {
		this.content.texts.forEach((text) => {
			this.size.update(text.end.clone().substractVec(this.PARENT.Padding));
		});
	}

	rednerBorder(
		options: { side: 'top' | 'bottom' | 'left' | 'right' | 'all' } = {
			side: 'all',
		}
	) {
		let rect;
		this.computeSize();
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
		this.computeSize();

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

	get Size() {
		return this.size.clone();
	}

	get Padding() {
		return this.padding.clone();
	}
}

export default Section;
