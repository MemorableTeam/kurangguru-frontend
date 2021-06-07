import {withIronSession} from 'next-iron-session'

export default withIronSession(
  async (req, res) => {
    console.log(req.body)
      req.session.set("user", req.body)
      await req.session.save()
      return res.status(200).send("");
  },
  {
    cookieName: "KURANG-GURU-APP",
    cookieOptions: {
        secure: process.env.VERSION_STATE === "production" ? true : false
    },
    password: `${process.env.SECRET_COOKIE_PASSWORD}`
  }
);