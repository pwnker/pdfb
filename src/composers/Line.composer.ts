import { assert } from 'console';
import { Line } from '../main';
import { Vector2, vector2 } from '../math/Vector2';
import Page from '../page/Page';

class LineComposer {
	private PARENT: Page;

	constructor(parent: Page) {
		this.PARENT = parent;
	}

	/**
	 * Creates a new line object
	 * Position is absolute
	 * @default
	 * style:
	 * 	color: "#2e2e2e"
	 * 	width: 1
	 *
	 * @param p1 start vector 2D
	 * @param p2 end vector 2D
	 * @returns Line
	 */
	newLine(p1: Vector2, p2: Vector2) {
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
			PARENT: this.PARENT,
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
				const curDrawColor = this.PARENT.Document.getDrawColor();

				this.PARENT.Document.setDrawColor(this.style.color);
				this.PARENT.Document.setLineDashPattern(
					this.style.dashed.pattern,
					this.style.dashed.start
				);
				this.PARENT.Document.line(
					this.start.X,
					this.start.Y,
					this.end.X,
					this.end.Y
				);

				this.PARENT.Document.setDrawColor(curDrawColor);
			},
			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};
		return line;
	}
}

export default LineComposer;
