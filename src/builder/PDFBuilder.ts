import jsPDF from 'jspdf';

import FontLoader from '../fonts/FontLoader';
import COURIER from '../fonts/internal/courier';
import Page from '../page/Page';

class PDFBuilder {
	private doc: jsPDF;

	Pages: Page[] = [];

	private fontLoader: FontLoader;

	constructor(doc: jsPDF) {
		this.doc = doc;

		this.fontLoader = new FontLoader(doc, 22);
		this.fontLoader.setFont(COURIER.NORMAL);
	}

	clearBuffer() {
		this.Pages = [];
	}

	/**
	 * Render all elements to the PDF document
	 *
	 * Order: ```Images -> Rects -> Texts -> Lines```
	 */
	render() {
		this.Pages.forEach((page, index) => {
			if (index > 0) {
				this.doc.addPage();
			}
			page.render();
		});
	}

	/**
	 * @Todo write documentation
	 * @Cleanup - should the user be responsable for the start, position and buffer reset ??
	 */
	AddPage(page: Page) {
		page.bootstrap();
		this.Pages.push(page);
	}

	get Document() {
		return this.doc;
	}

	get FontLoader() {
		return this.fontLoader;
	}
}

export default PDFBuilder;
