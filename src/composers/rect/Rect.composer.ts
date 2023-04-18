import { assert } from 'console';
import { Vector2 } from '../../math/Vector2';
import Page from '../../page/Page';
import { Rect, RectFillStyle, RectStyle } from './Rect.model';

class RectComposer {
	private PARENT: Page;

	constructor(parent: Page) {
		this.PARENT = parent;
	}

	/**
	 *
	 * @default
	 * style: {
	 *	 fillStyle: 'S',
	 *	 fill: ''
	 *	 line: {
	 *		color: '',
	 *		width: 0,
	 *		dashed: {
	 *			pattern: [],
	 *			start: 0,
	 *		},
	 *	 }
	 * }
	 *
	 * @param p1
	 * @param size
	 * @returns
	 */
	newRect(p1: Vector2, size: Vector2) {
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
			PARENT: this.PARENT,
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
				const curFillColor = this.PARENT.Document.getFillColor();
				const curLineWidth = this.PARENT.Document.getLineWidth();

				this.PARENT.Document.setFillColor(this.style.fill);
				this.PARENT.Document.setLineWidth(this.style.line.width);
				this.PARENT.Document.setLineDashPattern(
					this.style.line.dashed.pattern,
					this.style.line.dashed.start
				);
				this.PARENT.Document.rect(
					this.start.X,
					this.start.Y,
					this.size.X,
					this.size.Y,
					this.style.fillStyle
				);

				this.PARENT.Document.setFillColor(curFillColor);
				this.PARENT.Document.setLineWidth(curLineWidth);
			},

			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};
		return rect;
	}
}

export default RectComposer;
