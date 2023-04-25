import path from 'path';
import { PDFBuilder, Page, Section } from '../../../src';
import { vector2 } from '../../../src/math/Vector2';
import fs from 'fs';
import common from './common';

class First extends Page {
	private orderId: string;

	constructor(parent: PDFBuilder, orderId: string) {
		super(parent);
		this.orderId = orderId;
	}

	bootstrap(): void {
		this.setPadding(10, 10);

		this.Section(common.headerSection(this, this.orderId));
	}
}

export default First;
