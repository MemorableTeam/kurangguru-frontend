import { withIronSession } from "next-iron-session";

async function handler(req, res, session) {
  const user = await req.session.get("user");
  user ? res.send({ user }) : res.send({ logout: true })
}

export default withIronSession(handler, {
  cookieName: "KURANG-GURU-APP",
  cookieOptions: {
    secure: process.env.VERSION_STATE === "production" ? true : false
  },
  password: `${process.env.SECRET_COOKIE_PASSWORD}`
});