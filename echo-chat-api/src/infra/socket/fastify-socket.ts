import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { Server, ServerOptions } from "socket.io";
import fastifyPlugin from "fastify-plugin";

const fastifySocketIO: FastifyPluginAsync<Partial<ServerOptions>> = fastifyPlugin(
  async function (fastify, opts) {
    fastify.decorate("io", new Server(fastify.server, opts));
    fastify.addHook("onClose", (fastify: FastifyInstance, done) => {
      (fastify as any).io.close();
      done();
    });
  },
  { fastify: ">=4.x.x", name: "fastify-socket.io" }
);

export default fastifySocketIO