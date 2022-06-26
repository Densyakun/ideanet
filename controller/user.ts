import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";

export const delete_account = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`DELETE`);
}

export const user_edit = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`USER_EDIT`);
}