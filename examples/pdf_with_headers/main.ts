/* eslint-disable new-cap */
/* eslint-disable no-console */

import jsPDF from 'jspdf';

import { PDFBuilder } from '../../src';
import First from './pages/First.page';
import IOSEVKA from './fonts/iosevka';
import Second from './pages/Second.page';

const EXAMPLE_ID = 'pdf_with_headers';

const EXAMPLE_PDF_PATH = `${__dirname}/result/${EXAMPLE_ID}-example.pdf`;

const doc = new jsPDF();
const builder = new PDFBuilder(doc);

builder.FontLoader.addFontFamily(IOSEVKA);
builder.FontLoader.setFont(IOSEVKA.SEMI_BOLD);

const ORDER_ID = '123';
builder.AddPage(new First(builder, ORDER_ID));
builder.AddPage(new Second(builder, ORDER_ID));

builder.render();

console.log(EXAMPLE_PDF_PATH);

builder.Document.save(EXAMPLE_PDF_PATH);
