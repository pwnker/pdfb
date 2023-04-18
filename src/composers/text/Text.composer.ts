import { Vector2, vector2 } from '../../math/Vector2';
import Page from '../../page/Page';
import { Text } from './Text.model';

class TextComposer {
	private PARENT: Page;

	constructor(parent: Page) {
		this.PARENT = parent;
	}

	/**
	 * Position is absolute
	 * Text element that will be rendered onto the PDF
	 * @Todo write documentation
	 *
	 * @default { fontSize: 16 }
	 */
	newText(text: string, position: Vector2) {
		const { w, h } = this.PARENT.Document.getTextDimensions(text, {
			fontSize: this.PARENT.FontLoader.CurrentSize,
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
			PARENT: this.PARENT,
			start,
			fontSize: this.PARENT.FontLoader.CurrentSize,
			color: '#2e2e2e',
			size: vector2(w, h),
			end: start.clone().addVec(vector2(w, h)),
			getDimensions() {
				const result = this.PARENT.Document.getTextDimensions(this.data, {
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
				const curDrawColor = this.PARENT.Document.getDrawColor();
				this.PARENT.Document.setDrawColor(this.color);
				this.size.add(0, yoffset ?? 1);
				this.end.add(0, yoffset ?? 1);
				this.PARENT.Line(
					this.start.clone().setY(this.end.Y),
					this.end.clone()
				).setStyle({
					color: this.color,
				});
				this.PARENT.Document.setDrawColor(curDrawColor);
				return this;
			},
			renderBoundingBox() {
				const bb = boundingBox(this.start.clone(), this.size.clone());
				this.PARENT.Rect(bb.position, bb.size).render();
			},
			render() {
				const curTextColor = this.PARENT.Document.getTextColor();
				// this.renderBoundingBox();
				this.PARENT.Document.setTextColor(this.color);
				this.PARENT.FontLoader.setFontSize(this.fontSize);
				this.PARENT.Document.text(
					this.data,
					this.getRenderVector().X,
					this.getRenderVector().Y
				);
				this.PARENT.FontLoader.restoreFontSize();
				this.PARENT.Document.setTextColor(curTextColor);
			},
			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};
		return txt;
	}
}

export default TextComposer;
