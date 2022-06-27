import { System, SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import { bodyToJSON, compare_password, add_session } from "./common.ts"

/**
 * ログイン処理
 */
export const signin = async (req: SystemRequest, res: SystemResponse) => {
    const body = bodyToJSON(await req.readBody());
    const user_name: string = body?.user_name || "";
    const password: string = body?.password || "";

    // user_nameかpasswordが入力されていない場合は認証を失敗させる
    if(!(user_name.length && password.length)) {
        res.setText("Authentication failure.", 403);
        return;
    }

    // パスワードが正しいかどうかをチェックする
    const result: boolean = compare_password(user_name, password);

    if(!result) {
        res.setText("Authentication failure.", 403);
        return;
    }

    // sessionを追加する
    add_session(res, user_name);

    res.redirect("/");
}

/**
 * ログアウト処理
 */
export const signout = async (req: SystemRequest, res: SystemResponse) => {

    const session_id: string = req.getCookie("session") || "";

    // session_idがセッションデータベースに登録されているかチェックし、あれば削除する

    res.deleteCookie("session");
    res.redirect("/");
}