import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { body_to_JSON, check_username, check_password, compare_password, add_session } from "./common.ts"

/**
 * アカウント登録
 */
 export const signup = async (req: SystemRequest, res: SystemResponse) => {

    const body = body_to_JSON(await req.readBody());
    const user_name: string = body?.user_name || "";
    const password: string = body?.password || "";

    // user_nameかpasswordに問題がある場合は登録を拒否する。
    if(!(await check_username(user_name) && check_password(password))) {
        res.setText("Registration failure.", 403);
        return;
    }

    // パスワードをハッシュ化する
    const hashed_password: string = await bcrypt.hash(password);

    // user_nameとハッシュ化したパスワードをユーザーDBに登録する。

    // sessionを追加する
    await add_session(res, user_name);

    res.redirect("/");
}

/**
 * アカウント削除
 */
export const delete_account = async (req: SystemRequest, res: SystemResponse) => {

    const body = body_to_JSON(await req.readBody());
    const password: string = body?.password || "";
    const session_id: string = req.getCookie("session") || "";

    // session_idでセッションDBからuser_nameを取得する
    const user_name: string = "XXXXXXXXXX" || "";

    // パスワードが正しいかどうかをチェックする
    const result: boolean = user_name.length && compare_password(user_name, password);

    if(!result) {
        res.setText("Access denied.", 403);
        return;
    }

    // セッションDBからuser_nameに紐づくセッションをすべて削除する

    // ユーザーDBからuser_nameに紐づくアカウントを削除する

    res.deleteCookie("session");

    res.redirect("/");
}

export const user_edit = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`USER_EDIT`);
}