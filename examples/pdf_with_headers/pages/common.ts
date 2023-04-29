import path from 'path';
import fs from 'fs';
import { Page, Section } from '../../../src';
import { vector2 } from '../../../src/math/Vector2';

const headerSection = (parent: Page, orderId: string) => {
	const header = new Section(parent, parent.Padding, vector2(0, 2));

	header.setSize(vector2(parent.Size.X - parent.Padding.X * 2, 0));

	const logo = fs.readFileSync(
		path.join(
			path.dirname(__dirname),
			'/assets/kingsbox-logo-building-fixed.png'
		),
		{ encoding: 'base64' }
	);

	const width = 3623;
	const height = 1353;
	const scalar = 55;

	const logoImage = header.addImage(
		logo,
		vector2(header.Size.X - width / scalar, -5),
		vector2(width / scalar, height / scalar)
	);

	const title = header.addText('Kingsbox Rack Configuration', vector2(0, 0), {
		underline: false,
		fontSize: 22,
	});

	header.addText(
		`- ID: ${orderId}`,
		vector2(title.Start().X - header.Start.X + 5, title.End().Y + 2),
		{
			fontSize: 10,
		}
	);

	header.addRect(vector2(0, 22), header.Size.setY(0.5)).setStyle({
		fillStyle: 'F',
	});

	return header;
};

export default {
	headerSection,
};
