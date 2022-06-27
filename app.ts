import { System, Config, SystemRequest, SystemResponse, getHandlerFunctions, loadRoutingFiles } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
    Bson,
    MongoClient,
  } from "https://deno.land/x/mongo@v0.30.1/mod.ts";


  const ENV_PATH = './.env';
  const config_env:any = config({ path: ENV_PATH });
  const user:string = config_env.mongo_user
  const password:string = config_env.mongo_password
  const host:string = config_env.mongo_host
  const port:number = config_env.mongo_port
  const db_name:string = config_env.mongo_db
  const client = new MongoClient()
  await client.connect({
    db: db_name,
    tls: true,
    servers: [
      {
        host: host,
        port: 27017,
      },
    ],
    credential: {
      username: user,
      password: password,
      db: db_name,
      mechanism: "SCRAM-SHA-1",
    },
  });
  System.setModule(`db`, client)
System.listen(8080, (conf: Config) => {
    console.log(`The server running on http://${conf.hostname}:${conf.port}`);
});

System.createRoutes("./public/*");

System.createRoute("./template/top.html").URL("/");

System.createRoute("アイデアのページ").URL("/q", "/q/:q")
.GET(async (req: SystemRequest, res: SystemResponse) => {
    const key: string = req.variables?.q || "";
    res.setText(`Your request query is "${key}"`);
});

const controller = await getHandlerFunctions("./controller");
await loadRoutingFiles("./route.json", controller);