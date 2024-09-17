import { Hono } from "hono";
import { getPayload } from "payload";
import config from "../../web/src/payload.config";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

/**
 * TODO: properly import config ?
 * This works, but upon hot reloading hono (with a save), we get a sharp error,
 * even when sharp is entirely disabled in the config.
 */
app.get("/payload", async (c) => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "raid" });

  return c.json(docs);
});

export default {
  port: 8000,
  fetch: app.fetch,
};
