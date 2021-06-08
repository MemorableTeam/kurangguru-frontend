import { withIronSession } from "next-iron-session";

async function handler(req, res, session) {
    req.session.destroy();
    res.send({message : "Logged Out", logout : true});
}

export default withIronSession(handler, {
  cookieName: "KURANG-GURU-APP",
  cookieOptions: {
    secure: process.env.VERSION_STATE === "production" ? true : false
  },
  password: `${process.env.SECRET_COOKIE_PASSWORD}`
});