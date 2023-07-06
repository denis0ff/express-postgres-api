import {
  selectAllQuery,
  selectByIdQuery,
  insertMeetupQuery,
  updateByIdQuery,
  deleteByIdQuery,
} from './queries';
import fs from 'fs';
import { Client } from '@elastic/elasticsearch';

import { writeCsvReport } from './utils';

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

export const getAllMeetups = async (req, res) => {
  try {
    const { rows } = await selectAllQuery(req.query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const getMeetupById = async (req, res) => {
  try {
    const { rowCount, rows } = await selectByIdQuery({
      id: parseInt(req.params.id),
    });

    if (rowCount === 0) {
      return res.status(404).json('Data with such id was not found');
    }

    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const createMeetup = async (req, res) => {
  try {
    const {
      rows: [{ id, title, description, time, tags }],
    } = await insertMeetupQuery(req.body);

    await client.index({
      index: 'meetups',
      id,
      body: {
        title,
        description,
        time,
        tags,
      },
    });

    res.status(201).send(`Meetup added with ID: ${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const updateMeetup = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { rowCount } = await selectByIdQuery({ id });

    if (rowCount === 0) {
      return res.status(404).json('Data with such id was not found');
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
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const deleteMeetup = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await client.delete({
      index: 'meetups',
      id: id,
    });

    await deleteByIdQuery({ id });

    res.status(204).send(`Meetup deleted with ID: ${id}`);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const getMeetupReport = async (req, res) => {
  try {
    const { rows } = await selectAllQuery(req.query);

    await writeCsvReport(rows);

    res.download('report.csv', () => {
      fs.unlink('report.csv', () => {});
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err.toString());
  }
};

export const getMeetupBySearch = async (req, res) => {
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
    console.log(err);
    res.status(500).json(err.toString());
  }
};
