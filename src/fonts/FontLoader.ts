import jsPDF from 'jspdf';

import assert from '../Assert';
import { Font } from './Font.model';

class FontLoader {
	doc: jsPDF;

	size: {
		current: number;
		previous: number;
		default: number;
	};

	constructor(doc: jsPDF, defaultSize: number) {
		this.doc = doc;
		this.size = {
			current: defaultSize,
			previous: defaultSize,
			default: defaultSize,
		};
		this.doc.setFontSize(this.size.default);
	}

	setDefaultSize() {
		this.size.current = this.size.default;
		this.size.previous = this.size.default;
		this.doc.setFontSize(this.size.default);
	}

	setFontSize(size: number) {
		this.size.previous = this.size.current;
		this.size.current = size;
		this.doc.setFontSize(this.size.current);
		return this;
	}

	restoreFontSize() {
		this.size.current = this.size.previous;
		this.doc.setFontSize(this.size.previous);
	}

	addFont(font: Font) {
		assert(
			font.glyphs !== undefined,
			`Unexpected '${font.name}' 'glyphs' are undefined`
		);

		assert(
			font.fileName !== undefined,
			`Unexpeected '${font.name}' 'fileName' is undefined`
		);

		this.doc.addFileToVFS(font.fileName, font.glyphs);
		this.doc.addFont(font.fileName, font.name, font.weight);
	}

	addFontFamily(family: Record<string, Font>) {
		Object.keys(family).forEach((fontName) => {
			const font = family[fontName];
			this.addFont(font);
		});
	}

	setFont(font: Font) {
		this.doc.setFont(font.name, '', font.weight);
	}
}

export default FontLoader;
