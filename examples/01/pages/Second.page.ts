import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class Second extends Page {
	bootstrap(): void {
		this.setPadding(50, 10);

		this.Text('Goodbye World!', vector2(0, 0));

		this.renderPaddingBorder();
	}
}

export default Second;
