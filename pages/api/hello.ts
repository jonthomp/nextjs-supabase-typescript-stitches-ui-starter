import { withSentry } from "@sentry/nextjs";
import { nextConnectHandler } from "../../lib/api/nextConnectHandler";
import { HTTPError } from "../../lib/api/HTTPError";
import { checkAuth } from "../../lib/api/middlewares/checkAuth";

const handler = nextConnectHandler();

handler.get((req, res) => {
  if (req.query.somethingInvalid) {
    throw new HTTPError(400);
  }

  res.status(200).json({ name: "Hello, world!" });
});

// only logged in users can post
handler.use(checkAuth).post((req, res) => {
  res.status(200).json({ name: "Hello, logged in user!" });
});

export default withSentry(handler);
