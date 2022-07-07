import { System, SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import { bodyToJSON, compare_password, add_session } from "./common.ts"

/**
 * ログイン処理
 */
export const signin = async (req: SystemRequest, res: SystemResponse) => {
    const body = bodyToJSON(await req.readBody());
    const user_name: string = body?.user_name || "";
    const password: string = body?.password || "";

    // ユーザー名とパスワードが正しいかどうかをチェックする
    const result: boolean = user_name.length && password.length && compare_password(user_name, password);

    if(!result) {
        res.setText("Authentication failure.", 403);
        return;
    }

    // sessionを追加する
    add_session(res, user_name);

    // データを返す
    res.setText("{}");
    res.setType("application/json");
}

/**
 * ログアウト処理
 */
export const signout = async (req: SystemRequest, res: SystemResponse) => {

    const session_id: string = req.getCookie("session") || "";

    // session_idがセッションデータベースに登録されているかチェックし、あれば削除する

    res.deleteCookie("session");

    res.setText("{}");
    res.setType("application/json");
}