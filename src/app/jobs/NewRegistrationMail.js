import Mail from '../../lib/Mail';

class NewRegistrationMail {
  get key() {
    return 'NewRegistrationMail';
  }

  async handle({ data }) {
    const { meetup, userEnrolled } = data;

    // Enviando email
    await Mail.sendMail({
      to: `${meetup.user.name} <${meetup.user.email}>`,
      subject: `Mais um inscrito no evento: ${meetup.title}`,
      template: 'newRegistration',
      context: {
        staff: meetup.user.name,
        meetup: meetup.title,
        enrolled: userEnrolled.name,
      },
    });
  }
}

export default new NewRegistrationMail();
