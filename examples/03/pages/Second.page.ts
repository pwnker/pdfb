import { PDFBuilder, Page, Section } from '../../../src';
import { Vector2, vector2 } from '../../../src/math/Vector2';
import common from './sections/common';

class Second extends Page {
	private orderId: string;

	constructor(parent: PDFBuilder, orderId: string) {
		super(parent);
		this.orderId = orderId;
	}

	clientDataSection(start: Vector2) {
		const FONT_SIZE = 10;
		// const FONT_COLOR = '#ffffff';
		const FONT_COLOR = '#2e2e2e';
		const INDENT = 5;

		const section = new Section(this, start, vector2(2, 2));
		// const sectionSize = vector2((this.Size.X - 2 * this.Padding.X) / 2 - 5, 0);
		// section.setSize(sectionSize);

		const CURSOR = vector2(0, 0);
		const st = section
			.addText('Client:', CURSOR)
			.setFontSize(12)
			.setColor(FONT_COLOR)
			.underline();

		const emailText = section
			.addText(`email: ${'yj-example@gmail.com'}`, CURSOR.add(0, st.size.Y))
			.setFontSize(FONT_SIZE)
			.setColor(FONT_COLOR)
			.underline();
		// position = emailText.end.clone();

		// if (clientData.mobileNumber !== '') {
		// 	const mobileText = builder
		// 		.Text(
		// 			`mobile: ${clientData.mobileNumber}`,
		// 			section.Start.addVec(position.setX(INDENT))
		// 		)
		// 		.setFontSize(FONT_SIZE)
		// 		.setColor(FONT_COLOR)
		// 		.underline();
		// 	section.append(mobileText);
		// 	position = mobileText.end.clone();
		// }

		// if (clientData.message !== '') {
		// 	const messageTitle = builder
		// 		.Text('message:', section.Start.addVec(position.setX(INDENT)))
		// 		.setFontSize(FONT_SIZE)
		// 		.setColor(FONT_COLOR)
		// 		.underline();
		// 	section.append(messageTitle);
		// 	position = messageTitle.end.clone();

		// 	// I don't understand why PageWidth works here as PageWidth / 2. But really who cares?
		// 	const messageData: string[] = builder.doc.splitTextToSize(
		// 		clientData.message,
		// 		builder.PageWidth - INDENT * 2
		// 	);

		// 	messageData.forEach((information) => {
		// 		const dataText = builder
		// 			.Text(information, section.Start.addVec(position.setX(INDENT * 2)))
		// 			.setFontSize(FONT_SIZE)
		// 			.setColor(FONT_COLOR);
		// 		section.append(dataText);
		// 		position = dataText.end.clone();
		// 	});
		// }

		section.fill();
		return section;
	}

	bootstrap(): void {
		this.setPadding(10, 10);

		const header = common.headerSection(this, this.orderId);

		this.Section(header);
		this.Section(this.clientDataSection(header.Position));
	}
}

export default Second;
