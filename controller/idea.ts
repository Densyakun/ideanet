import { System, SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";

export const idea_get = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`IDEA_GET`);
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

