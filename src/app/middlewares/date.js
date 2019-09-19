import { isBefore, startOfHour, parseISO } from 'date-fns';

export default async (req, res, next) => {
  if (req.body.date) {
    const hourStart = startOfHour(parseISO(req.body.date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past date are not permitted' });
    }
  }
  return next();
};
