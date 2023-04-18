/* eslint-disable new-cap */
/* eslint-disable no-console */

import jsPDF from 'jspdf';

import { PDFBuilder } from '../../src';

const EXAMPLE_ID = '01';

const EXAMPLE_PDF_PATH = `${__dirname}/result/${EXAMPLE_ID}-example.pdf`;

const doc = new jsPDF();
const builder = new PDFBuilder(doc);

builder.render();

console.log(EXAMPLE_PDF_PATH);

builder.Document.save(EXAMPLE_PDF_PATH);
