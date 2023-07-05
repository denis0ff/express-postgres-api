import {
  selectAllQuery,
  selectByIdQuery,
  insertMeetupQuery,
  updateByIdQuery,
  deleteByIdQuery,
} from './queries';
import { writeCsvReport } from './utils';

export const getAllMeetups = async (req, res) => {
  try {
    const { rows } = await selectAllQuery(req.query);
    res.status(200).json(rows);
  } catch (err) {
    console.log(err);
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
  }
};

export const createMeetup = async (req, res) => {
  try {
    const { rows } = await insertMeetupQuery(req.body);

    res.status(201).send(`Meetup added with ID: ${rows[0].id}`);
  } catch (err) {
    console.log(err);
  }
};

export const updateMeetup = async (req, res) => {
  try {
    const { rowCount } = await selectById({ id: parseInt(req.params.id) });

    if (rowCount === 0) {
      return res.status(404).json('Data with such id was not found');
    }

    await updateByIdQuery({ ...req.body, id });

    res.status(200).send(`Meetup modified with ID: ${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

export const deleteMeetup = async (req, res) => {
  try {
    await deleteByIdQuery({ id: parseInt(req.params.id) });

    res.status(204).send(`Meetup deleted with ID: ${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
};

export const getMeetupReport = async (req, res) => {
  try {
    const { rows } = await selectAllQuery(req.query);

    await writeCsvReport(rows)

    res.download('report.csv');
  } catch (err) {
    console.log(err);
  }
};
