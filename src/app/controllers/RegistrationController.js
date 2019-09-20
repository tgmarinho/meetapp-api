import { isBefore } from 'date-fns';
import Registration from '../models/Registration';
import Meetup from '../models/Meetup';

class RegistrationController {
  async store(req, res) {
    const { meetup_id } = req.body;

    const meetup = await Meetup.findOne({
      where: {
        id: meetup_id,
      },
    });

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
      return res
        .status(400)
        .json({ error: 'You already did your subscription on this one' });
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
        .json({ error: 'You already are enrolled at this date' });
    }

    const enrolled = await Registration.create({
      user_id: req.userId,
      meetup_id,
    });

    return res.json(enrolled);
  }
}

export default new RegistrationController();
