import {
Config,
System,
SystemRequest,
SystemResponse,
} from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Bson, MongoClient } from "https://deno.land/x/mongo@v0.30.1/mod.ts";


System.listen('./.env', async (conf: Config) => {
    await setupDatabase(conf);
    console.log(`The server running on http://${conf.hostname}:${conf.port}`);
});

System.createRoutes("./public/*");

System.createRoute("./template/top.html").URL("/");

System.createRoute("アイデアのページ").URL("/q", "/q/:q")
.GET(async (req: SystemRequest, res: SystemResponse) => {
    const key: string = req.variables?.q || "";
    res.setText(`Your request query is "${key}"`);
});

/**
 * データベースのセットアップ
 * @param conf .envファイルの情報
 */
async function setupDatabase(conf: Config) {
    const client = new MongoClient();
    await client.connect({
        db: conf.DB.name,
        tls: true,
        servers: [{
                host: conf.DB.host,
                port: conf.DB.port,
        }],
        credential: {
            username:   conf.DB.user,
            password:   conf.DB.password,
            db:         conf.DB.host,
            mechanism: "SCRAM-SHA-1",
        },
    });
    System.setModule(`db`, client.database(conf.DB.name));
}