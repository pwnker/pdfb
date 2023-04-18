import { PDFElement } from '../main';
import Page from '../page/Page';

abstract class Composer {
	protected PARENT: Page;

	constructor(parent: Page) {
		this.PARENT = parent;
	}

	abstract new(...args: unknown[]): PDFElement;
}

export default Composer;
