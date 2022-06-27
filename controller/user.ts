import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";
import { bodyToJSON, check_username, check_password, compare_password, add_session, get_username } from "./common.ts"

/**
 * アカウント登録
 */
 export const signup = async (req: SystemRequest, res: SystemResponse) => {

    const body = bodyToJSON(await req.readBody());
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

    const body = bodyToJSON(await req.readBody());
    const password: string = body?.password || "";
    const user_name: string | undefined = get_username(req);

    // パスワードが正しいかどうかをチェックする
    const result: boolean = user_name && compare_password(user_name, password);

    if(!result) {
        res.setText("Access denied.", 403);
        return;
    }

    // セッションDBからuser_nameに紐づくセッションをすべて削除する

    // ユーザーDBからuser_nameに紐づくアカウントを削除する

    res.deleteCookie("session");

    res.redirect("/");
}

/**
 * ユーザー情報の編集
 */
export const user_edit = async (req: SystemRequest, res: SystemResponse) => {
    const user_name: string | undefined = get_username(req);
    if(!user_name) {
        res.setText("Access denied.", 403);
        return;
    }
    const result: {[key: string]: boolean} = {};
    const body = bodyToJSON(await req.readBody());
    if(body.user_name) result["user_name"] = await edit_name(user_name, body.user_name);
    if(body.password) result["password"] = await edit_password(user_name, body.password);

    res.setText(JSON.stringify(result));
    res.setType("application/json")
}

/**
 * ユーザー名の変更
 * @param user_name 現在のユーザー名
 * @param new_user_name 新しいユーザー名
 * @returns 変更に成功したらtrue
 */
async function edit_name(user_name, new_user_name: string): Promise<boolean> {
    return true;
}

/**
 * パスワードの変更
 * @param user_name 現在のユーザー名
 * @param new_password 新しいパスワード
 * @returns 変更に成功したらtrue
 */
async function edit_password(user_name, new_password: string): Promise<boolean> {
    return true;
}