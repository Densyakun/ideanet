import { System, Config, SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";

System.listen(8080, (conf: Config) => {
    console.log(`The server running on http://${conf.hostname}:${conf.port}`);
});

System.createRoutes("./public/*");

System.createRoute("./template/top.html").URL("/");