import { PDFBuilder, Page } from '../../../src';
import common from './common';

class Second extends Page {
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

export default Second;
