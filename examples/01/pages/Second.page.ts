import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class Second extends Page {
	bootstrap(): void {
		this.Text('Goodbye World!', vector2(10, 0));
	}
}

export default Second;
