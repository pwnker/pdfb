import { Font } from '../../../../src';
import semibold from './semibold';

const FONT_NAME = 'iosevka';

const SEMI_BOLD: Font = {
	name: FONT_NAME,
	weight: 'semibold',
	fileName: `${FONT_NAME}-semibold.ttf`,
	glyphs: semibold,
};

const IOSEVKA = {
	SEMI_BOLD,
};

export default IOSEVKA;
