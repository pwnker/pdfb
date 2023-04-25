import PDFBuilder from './builder/PDFBuilder';
import Section from './section/Section';
import FontLoader from './fonts/FontLoader';
import HELVETICA from './fonts/internal/helvetica';
import TIMES from './fonts/internal/times';
import COURIER from './fonts/internal/courier';
import Page from './page/Page';

const version = () => {
	return '0.1.0';
};

export * from './builder/PdfBuilder.model';

export * from './fonts/Font.model';

export * from './composers/image/Image.model';
export * from './composers/rect/Rect.model';
export * from './composers/line/Line.model';
export * from './composers/text/Text.model';

const FONTS = {
	COURIER,
	TIMES,
	HELVETICA,
};

export { version, PDFBuilder, Page, Section, FontLoader, FONTS };
