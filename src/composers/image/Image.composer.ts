import { Vector2, vector2 } from '../../math/Vector2';
import Composer from '../Composer';
import { Image } from './Image.model';

class ImageComposer extends Composer {
	/**
	 * @Todo write documentation
	 */
	new(imageData: string, position: Vector2, size: Vector2) {
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
			PARENT: this.PARENT,
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
				this.PARENT.Document.addImage(
					imageData,
					'png',
					this.start.X,
					this.start.Y,
					size.X,
					size.Y,
					'FAST',
					'MEDIUM'
				);
			},
			Start() {
				return this.start.clone();
			},
			End() {
				return this.end.clone();
			},
		};

		return image;
	}
}

export default ImageComposer;
