import { System, Config, SystemRequest, SystemResponse, getHandlerFunctions, loadRoutingFiles } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";

System.listen("./.env", (conf: Config) => {
    console.log(`The server running on http://${conf.hostname}:${conf.port}`);
});

System.createRoutes("./public/*");

System.createRoute("./template/top.html").URL("/");

System.createRoute("アイデアのページ").URL("/q", "/q/:q")
.GET(async (req: SystemRequest, res: SystemResponse) => {
    const key: string = req.variables?.q || "";
    res.setText(`Your request query is "${key}"`);
});