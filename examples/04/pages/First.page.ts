import { PDFBuilder, Page, Section } from '../../../src';
import { Vector2, vector2 } from '../../../src/math/Vector2';
import common from './sections/common';

class First extends Page {
	private FONT_SIZE = 18;

	private FONT_COLOR = '#ffffff';

	clientSection(start: Vector2, email: string, mobile: string) {
		const test = new Section(this, start, vector2(2, 2));

		test.setSize(vector2(this.Size.X / 2 - 15, 0));

		const INDENT = vector2(5, 1);

		const title = test.addText('Client:', vector2(0, 0), {
			fontSize: this.FONT_SIZE + 2,
			underline: true,
			color: this.FONT_COLOR,
		});

		const emailText = test.addText(
			`email: ${email}`,
			vector2(
				title.Start().X - test.Start.X + INDENT.X,
				test.Size.Y - test.Padding.Y * 2 + INDENT.Y
			),
			{
				fontSize: this.FONT_SIZE,
				color: this.FONT_COLOR,
			}
		);

		const mobileText = test.addText(
			`mobile: ${mobile}`,
			vector2(
				title.Start().X - test.Start.X + INDENT.X,
				emailText.End().Y + INDENT.Y
			),
			{
				fontSize: this.FONT_SIZE,
				color: this.FONT_COLOR,
			}
		);

		test.setSize(test.Size.add(0, 1));

		test.fill();

		return test;
	}

	priceSection(start: Vector2, priceStream: string) {
		const priceSplit = priceStream.split(';');

		const section = new Section(this, start, vector2(4, 4));

		section.setSize(vector2(this.Size.X / 2 - 5, 0));

		const title = section.addText('Price:', vector2(0, 0), {
			fontSize: this.FONT_SIZE + 2,
			underline: true,
			color: this.FONT_COLOR,
		});

		const INDENT = vector2(5, 1);

		priceSplit.forEach((price) => {
			if (price === '') return;
			const priceText = section.addText(
				`+ ${price}`,
				title
					.End()
					.setX(title.Start().X - section.Start.X)
					.addVec(INDENT),
				{
					fontSize: this.FONT_SIZE,
					color: this.FONT_COLOR,
				}
			);
			INDENT.add(0, priceText.size.Y);
		});

		section.fill();
		return section;
	}

	bootstrap(): void {
		this.setPadding(10, 10);

		const header = common.headerSection(
			this,
			'9dccf243290cb418b7ee138654e30f4822628ba1010898fa56977b5a1bc7d4cf'
		);

		const INNER_PAGE_INDENT = 0;
		const client = this.clientSection(
			header.Position.add(
				INNER_PAGE_INDENT,
				header.Size.Y + INNER_PAGE_INDENT
			).add(0, 2),
			'example@gmail.com',
			'0038640437269'
		);

		const price = this.priceSection(
			vector2(header.Size.X / 2 + 8, header.Position.Y + header.Size.Y).add(
				0,
				2
			),
			'KB05MI-982;KB05MI-892;KB05MI-829;KB05MI-982;KB05MI-929;'
		);

		this.Section(header);
		this.Section(client);
		this.Section(price);
	}
}

export default First;
