import {
  selectAllQuery,
  selectByIdQuery,
  insertMeetupQuery,
  updateByIdQuery,
  deleteByIdQuery,
} from './queries';
import fs from 'fs';
import { Client } from '@elastic/elasticsearch';

import { writeCsvReport, writePdfReport } from './utils';
import PDFDocument from 'pdfkit';

const ES_PORT = process.env.ES_PORT || 9200;
const ES_HOST = process.env.ES_HOST || 'localhost';

const client = new Client({
  node: `http://${ES_HOST}:${ES_PORT}`,
  maxRetries: 2,
  requestTimeout: 3000,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const getAllMeetups = async (req, res, next) => {
  try {
    const { rows } = await selectAllQuery(req.query);
    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const getMeetupById = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const { rowCount, rows } = await selectByIdQuery({ id });

    if (rowCount === 0) {
      return res.status(404).json(`Data with such id: ${id} was not found`);
    }

    res.status(200).json(rows);
  } catch (err) {
    next(err);
  }
};

export const createMeetup = async (req, res, next) => {
  try {
    const userId = req.cookies['userId'];
    const {
      rows: [{ id, title, description, time, tags }],
    } = await insertMeetupQuery({ ...req.body, userId });

    await client.index({
      index: 'meetups',
      id,
      body: {
        title,
        description,
        time,
        tags,
        userId,
      },
    });

    res.status(201).send(`Meetup added with ID: ${id}`);
  } catch (err) {
    next(err);
  }
};

export const updateMeetup = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const userId = req.cookies['userId'];
  try {
    const { rowCount, rows } = await selectByIdQuery({ id });

    if (rowCount === 0) {
      return res.status(404).json('Data with such id was not found');
    }

    if (String(rows[0]['userid']) !== userId) {
      return res
        .status(403)
        .json(
          "You don't have permission to update meetup that another user created"
        );
    }

    await client.update({
      index: 'meetups',
      id,
      body: {
        doc: req.body,
      },
    });

    await updateByIdQuery({ ...req.body, id });

    res.status(200).send(`Meetup modified with ID: ${id}`);
  } catch (err) {
    next(err);
  }
};

export const deleteMeetup = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    await client.delete({
      index: 'meetups',
      id: id,
    });

    await deleteByIdQuery({ id });

    res.status(204).send(`Meetup deleted with ID: ${id}`);
  } catch (err) {
    next(err);
  }
};

export const getMeetupReport = async (req, res, next) => {
  const { type } = req.params;
  try {
    const { rows } = await selectAllQuery(req.query);

    if (type === 'csv') {
      await writeCsvReport(rows);

      res.download('report.csv', () => {
        fs.unlink('report.csv', () => {});
      });
    }

    if (type === 'pdf') {
      const doc = new PDFDocument();

      await writePdfReport(doc, rows);

      res
        .setHeader('Content-Type', 'application/pdf')
        .setHeader('Content-Disposition', 'inline; filename=test.pdf');
      doc.pipe(res);
      doc.end();
    }
  } catch (err) {
    next(err);
  }
};

export const getMeetupBySearch = async (req, res, next) => {
  try {
    const { searchString } = req.query;

    const {
      body: {
        hits: { hits },
      },
    } = await client.search({
      index: 'meetups',
      body: {
        query: {
          multi_match: {
            query: searchString,
            fields: ['title', 'description', 'tags'],
          },
        },
      },
    });

    const meetups = hits.map((hit) => hit._source);
    res.json(meetups);
  } catch (err) {
    next(err);
  }
};
