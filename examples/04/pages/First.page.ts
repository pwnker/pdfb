import { Page, Section } from '../../../src';
import { Vector2, vector2 } from '../../../src/math/Vector2';
import common from './sections/common';

class First extends Page {
	clientSection(start: Vector2) {
		const test = new Section(this, start, vector2(2, 2));

		const FONT_SIZE = 10;
		const INDENT = vector2(5, 1);
		const COLOR = '#ffffff';

		const title = test.addText('Client:', vector2(0, 0), {
			fontSize: 20,
			underline: true,
			color: COLOR,
		});

		const email = test.addText(
			'email: example@gmail.com',
			vector2(
				title.Start().X - test.Start.X + INDENT.X,
				test.Size.Y - test.Padding.Y * 2 + INDENT.Y
			),
			{
				fontSize: FONT_SIZE,
				color: COLOR,
			}
		);

		const mobile = test.addText(
			'mobile: 0038640437269',
			vector2(
				title.Start().X - test.Start.X + INDENT.X,
				email.End().Y + INDENT.Y
			),
			{
				fontSize: FONT_SIZE,
				color: COLOR,
			}
		);

		test.setSize(test.Size.add(0, 1));

		test.fill();

		return test;
	}

	bootstrap(): void {
		this.setPadding(10, 10);
		const header = common.headerSection(
			this,
			'9dccf243290cb418b7ee138654e30f4822628ba1010898fa56977b5a1bc7d4cf'
		);

		const INNER_PAGE_INDENT = 2;
		const client = this.clientSection(
			header.Position.add(INNER_PAGE_INDENT, header.Size.Y + INNER_PAGE_INDENT)
		);

		this.Section(header);
		this.Section(client);
	}
}

export default First;
