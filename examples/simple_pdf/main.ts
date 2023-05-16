/* eslint-disable new-cap */
/* eslint-disable no-console */

import jsPDF from 'jspdf';

import { PDFBuilder } from '../../src';
import First from './pages/First.page';
import Second from './pages/Second.page';

const EXAMPLE_ID = 'basic_pdf';

const EXAMPLE_PDF_PATH = `${__dirname}/result/${EXAMPLE_ID}-example.pdf`;

const doc = new jsPDF();
const builder = new PDFBuilder(doc);

builder.AddPage(new First(builder));
builder.AddPage(new Second(builder));

builder.render();

console.log(EXAMPLE_PDF_PATH);

builder.Document.save(EXAMPLE_PDF_PATH);
