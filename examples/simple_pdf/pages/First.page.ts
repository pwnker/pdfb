import { vector2 } from '../../../src/math/Vector2';
import Page from '../../../src/page/Page';

class First extends Page {
	bootstrap(): void {
		this.setPadding(10, 5);
		const text1 = this.Text('Hello Semen!', vector2(0, 0));
		this.Line(text1.Start().setY(text1.End().Y), text1.End());

		this.Text('! I love you Semen!', text1.Start().add(0, text1.size.Y)).underline();
	}
}

export default First;
