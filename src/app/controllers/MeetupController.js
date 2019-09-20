import { isBefore } from 'date-fns';
import Meetup from '../models/Meetup';
import User from '../models/User';

class MeetupController {
  async index(req, res) {
    const meetups = await Meetup.findAll({ where: { user_id: req.userId } });

    return res.json(meetups);
  }

  async store(req, res) {
    const { date, title, description, localization, banner } = req.body;

    const meetup = await Meetup.create({
      user_id: req.userId,
      title,
      description,
      localization,
      banner,
      date,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'This not exists' });
    }
    if (meetup.user.id !== req.userId) {
      return res.status(401).json({ error: 'This not belongs to you' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: "You can't update past meetup" });
    }

    await meetup.update(req.body);
    return res.json(meetup);
  }

  async delete(req, res) {
    const meetup = await Meetup.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id'],
        },
      ],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'This not exists' });
    }
    if (meetup.user.id !== req.userId) {
      return res.status(401).json({ error: 'This not belongs to you' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: "You can't canceling past meetup" });
    }

    await meetup.destroy();
    return res.json({ success: true });
  }
}
export default new MeetupController();
