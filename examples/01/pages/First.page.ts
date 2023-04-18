import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class First extends Page {
	bootstrap(): void {
		this.setPadding(10, 5);
		const t1 = this.Text('Hello World y!', vector2(0, 0));
		this.Line(t1.Start().setY(t1.End().Y), t1.End());

		this.Text('Hello World y!', t1.Start().add(0, t1.size.Y)).underline();
	}
}

export default First;
