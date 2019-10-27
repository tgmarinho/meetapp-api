import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class DashboardController {
  async index(req, res) {
    const page = req.query.page || 1;

    const meetups = await Meetup.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
      limit: 10,
      offset: 10 * page - 10,
    });

    return res.json(meetups);
  }
}
export default new DashboardController();
