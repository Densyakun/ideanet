import { SystemRequest, SystemResponse, System } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

export const idea_get = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`IDEA_GET`);
    const ENV_PATH = './.env';
const config_env:any = config({ path: ENV_PATH });
const user:string = config_env.mongo_user
const password:string = config_env.mongo_password
const host:string = config_env.mongo_host
const port:number = config_env.mongo_port
const db_name:string = config_env.mongo_db
const client = System.getModule(`db`)
    const db = client.database(db_name)
const collection_name:string = config_env.mongo_collection
const datas = db.collection(collection_name)
    const insertId = await datas.insertOne({
        username: "johmaru",
        password: "114514",
      });
     console.log(insertId) 

}

export const idea_post = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`IDEA_POST`);
}

export const idea_vote = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`IDEA_VOTE`);
}

export const idea_favolite = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`IDEA_FAVOLITE`);
}

