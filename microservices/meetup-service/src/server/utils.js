import { createObjectCsvWriter } from 'csv-writer';

export const writeCsvReport = async (rows) => {
  const csvWriter = createObjectCsvWriter({
    path: 'report.csv',
    header: [
      { id: 'title', title: 'Название' },
      { id: 'description', title: 'Описание' },
      { id: 'date', title: 'Дата проведения' },
      { id: 'tags', title: 'Тэги' },
    ],
    encoding: 'utf-8'
  });

  await csvWriter.writeRecords(rows);
};
