import path from 'path';
import fs from 'fs';
import { Page, Section } from '../../../../src';
import { vector2 } from '../../../../src/math/Vector2';

const headerSection = (parent: Page, orderId: string) => {
	const header = new Section(parent, parent.Padding, vector2(2, 2));

	header.setSize(vector2(parent.Size.X - parent.Padding.X * 2, 0));

	const logo = fs.readFileSync(
		path.join(path.dirname(path.dirname(__dirname)), '/assets/logo3.png'),
		{ encoding: 'base64' }
	);

	const logoImage = header.addImage(
		logo,
		vector2(header.Size.X - 41, -5),
		vector2(41, 20)
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

	header.addRect(vector2(0, 22), header.Size.setY(1)).setStyle({
		fillStyle: 'F',
	});

	return header;
};

export default {
	headerSection,
};
