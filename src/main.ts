import PDFBuilder from './builder/PDFBuilder';
import SectionBuilder from './section/SectionBuilder';
import FontLoader from './fonts/FontLoader';
import HELVETICA from './fonts/internal/helvetica';
import TIMES from './fonts/internal/times';
import COURIER from './fonts/internal/courier';

const version = () => {
	return '0.1.0';
};

export * from './builder/PdfBuilder.model';

export * from './fonts/Font.model';

const FONTS = {
	COURIER,
	TIMES,
	HELVETICA,
};

export { version, PDFBuilder, SectionBuilder, FontLoader, FONTS };
