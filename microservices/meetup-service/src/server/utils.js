import { createObjectCsvWriter } from 'csv-writer';
import path from 'path';

export const writeCsvReport = async (rows) => {
  const csvWriter = createObjectCsvWriter({
    path: 'report.csv',
    header: [
      { id: 'title', title: 'Название' },
      { id: 'description', title: 'Описание' },
      { id: 'date', title: 'Дата проведения' },
      { id: 'tags', title: 'Тэги' },
    ],
    encoding: 'utf-8',
  });

  await csvWriter.writeRecords(rows);
};

export const writePdfReport = async (doc, rows) => {
  const fontPath = path.join(__dirname, '../../assets/microsoftsansserif.ttf');
  doc.font(fontPath);

  rows.forEach(({ title = '', description = '', time = '', tags }) => {
    doc.fontSize(12).text(`Название: ${title}`);
    doc.fontSize(12).text(`Описание: ${description}`);
    doc.fontSize(12).text(`Дата проведения: ${time}`);
    doc.fontSize(12).text(`Тэги: ${tags}`);
    doc.moveDown();
  });
};
