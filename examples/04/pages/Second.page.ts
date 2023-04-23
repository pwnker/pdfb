import { PDFBuilder, Page, Section } from '../../../src';
import { Vector2, vector2 } from '../../../src/math/Vector2';
import common from './sections/common';

class Second extends Page {
	private FONT_SIZE = 18;

	private FONT_COLOR = '#ffffff';

	private SECTION_SPACING = 10;

	private orderId: string;

	constructor(parent: PDFBuilder, orderId: string) {
		super(parent);
		this.orderId = orderId;
	}

	clientSection(
		start: Vector2,
		email: string,
		mobile: string,
		header: Section
	) {
		const test = new Section(this, start, vector2(2, 2));

		test.setSize(vector2(header.Size.X / 2 - this.SECTION_SPACING / 2, 0));

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

		test.fill();

		return test;
	}

	priceSection(start: Vector2, priceStream: string, header: Section) {
		const priceSplit = priceStream.split(';');

		const section = new Section(this, start, vector2(2, 2));

		section.setSize(vector2(header.Size.X / 2 - this.SECTION_SPACING / 2, 0));

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
		this.setPadding(15, 15);

		const header = common.headerSection(this, this.orderId);

		const client = this.clientSection(
			vector2(header.Position.X, header.Position.Y + header.Size.Y + 2),
			'example@gmail.com',
			'0038640437269',
			header
		);

		const price = this.priceSection(
			vector2(
				client.Position.X + client.Size.X + this.SECTION_SPACING,
				client.Position.Y
			),
			'KB05MI-982;KB05MI-892;KB05MI-829;KB05MI-982;KB05MI-929;',
			header
		);

		this.Section(header);
		this.Section(client);
		this.Section(price);
	}
}

export default Second;
