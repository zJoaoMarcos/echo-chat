import { app } from "./app";
import { socketRoutes } from "./infra/socket/controllers/routes";

const port = +process.env.PORT!;

app.ready((err) => {
  if (err) throw err;
  socketRoutes(app.io)
});

app.listen({ host: "0.0.0.0", port }).then(() => {
  console.log(`Server is running in port: ${port}... 🚀`);
});
