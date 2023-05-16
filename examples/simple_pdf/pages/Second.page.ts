import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class Second extends Page {
	bootstrap(): void {
		this.setPadding(50, 10);

		this.Text('Goodbye World!', vector2(0, 0));

		this.Rect(vector2(100, 20), vector2(-500, 10)).setStyle({
			fillStyle: 'DF',
			fill: '#2e2e2e',
		});

		this.renderPaddingBorder();
	}
}

export default Second;
