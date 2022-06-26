import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";

export const signup = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`SIGNUP`);
}

export const signin = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`SIGNIN`);
}

export const signout = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`SIGNOUT`);
}