import path from 'path';
import fs from 'fs';
import { Page, Section } from '../../../../src';
import { vector2 } from '../../../../src/math/Vector2';

const headerSection = (parent: Page, orderId: string) => {
	const header = new Section(parent, parent.Padding, vector2(0, 0));

	header.setSize(vector2(parent.Size.X - parent.Padding.X * 2, 0));

	const logo = fs.readFileSync(
		path.join(path.dirname(path.dirname(__dirname)), '/assets/logo2.png'),
		{ encoding: 'base64' }
	);

	header.addImage(logo, vector2(header.Size.X - 60, 0), vector2(60, 20));

	const title = header
		.addText('Kingsbox Rack Configuration', vector2(5, 5))
		.underline();

	header
		.addText(
			`- ID: ${orderId}`,
			title.end
				.clone()
				.setX(title.start.X)
				.substractVec(parent.Padding)
				.substractVec(header.Padding)
		)
		.setFontSize(12);

	header.addLine(vector2(0, 22), header.Size.setY(22));

	return header;
};

export default {
	headerSection,
};
