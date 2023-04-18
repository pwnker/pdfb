import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class First extends Page {
	bootstrap(): void {
		this.Text('Hello World!', vector2(0, 0));
	}
}

export default First;
