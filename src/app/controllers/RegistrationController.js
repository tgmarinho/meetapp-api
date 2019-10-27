import { isBefore } from 'date-fns';
import { Op } from 'sequelize';
import Registration from '../models/Registration';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Queue from '../../lib/Queue';
import NewRegistrationMail from '../jobs/NewRegistrationMail';
import File from '../models/File';

class RegistrationController {
  async index(req, res) {
    const registrations = await Registration.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          where: {
            date: {
              [Op.gt]: new Date(),
            },
          },
          required: true,
          include: [
            { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
            { model: File, as: 'banner', attributes: ['id', 'path', 'url'] },
          ],
        },
      ],
      order: [['meetup', 'date']],
    });

    return res.json({ registrations });
  }

  async store(req, res) {
    const { meetup_id } = req.body;

    const meetup = await Meetup.findOne({
      where: {
        id: meetup_id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (meetup.user.id === req.userId) {
      return res.status(400).json({ error: 'You are staff in this meetup' });
    }

    if (!meetup) {
      return res.status(400).json({ error: 'This meetup not exists' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: "You can't enroll in past meetup" });
    }

    const registration = await Registration.findOne({
      where: {
        user_id: req.userId,
        meetup_id,
      },
    });

    if (registration) {
      return res.status(400).json({
        error: 'You already did your subscription on this one',
      });
    }

    const userRegistrations = await Registration.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'date'],
        },
      ],
    });

    const isEnrolledAtDate = userRegistrations.some(reg => {
      return reg.meetup.date.getTime() === meetup.date.getTime();
    });

    if (isEnrolledAtDate) {
      return res
        .status(400)
        .send({ error: 'You already are enrolled at this date' });
    }

    const enrolled = await Registration.create({
      user_id: req.userId,
      meetup_id,
    });

    const userEnrolled = await User.findByPk(req.userId);

    await Queue.add(NewRegistrationMail.key, { meetup, userEnrolled });

    return res.json(enrolled);
  }

  async delete(req, res) {
    const registration = await Registration.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id'],
        },
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'date'],
        },
      ],
    });

    if (!registration) {
      return res.status(400).json({ error: 'This not exists' });
    }
    if (registration.user.id !== req.userId) {
      return res.status(401).json({ error: 'This not belongs to you' });
    }

    if (isBefore(registration.meetup.date, new Date())) {
      return res.status(400).json({ error: "You can't canceling past events" });
    }

    await registration.destroy();
    return res.json({ success: true });
  }
}

export default new RegistrationController();
