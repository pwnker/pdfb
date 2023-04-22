import path from 'path';
import fs from 'fs';
import { Page, Section } from '../../../../src';
import { vector2 } from '../../../../src/math/Vector2';

const headerSection = (parent: Page, orderId: string) => {
	const header = new Section(parent, parent.Padding, vector2(2, 2));

	header.setSize(vector2(parent.Size.X - parent.Padding.X * 2, 0));

	const logo = fs.readFileSync(
		path.join(path.dirname(path.dirname(__dirname)), '/assets/logo2.png'),
		{ encoding: 'base64' }
	);

	const logoImage = header.addImage(
		logo,
		vector2(header.Size.X - 60, -5),
		vector2(60, 20)
	);

	const title = header.addText('Kingsbox Rack Configuration', vector2(0, 0), {
		underline: true,
		fontSize: 18,
	});

	header.addText(
		`- ID: ${orderId}`,
		vector2(title.Start().X - header.Start.X + 5, title.End().Y + 2),
		{
			fontSize: 10,
		}
	);

	// header.addLine(
	// 	vector2(0, header.Position.Y + header.Size.Y),
	// 	header.Size.setY(22)
	// );

	header.rednerBorder({
		side: 'bottom',
	});

	return header;
};

export default {
	headerSection,
};
