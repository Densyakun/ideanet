import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

/**
 * アカウント登録
 */
export const signup = async (req: SystemRequest, res: SystemResponse) => {

    const body = body_to_JSON(await req.readBody());
    const user_name: string = body?.user_name || "";
    const password: string = body?.password || "";

    // user_nameかpasswordに問題がある場合は登録を拒否する。
    if(!(check_username(user_name) && check_password(password))) {
        res.setText("Registration failure.", 403);
        return;
    }

    // パスワードをハッシュ化する
    const hashed_password: string = await bcrypt.hash(password);

    // user_nameとハッシュ化したパスワードをユーザーDBに登録する。

    // セッションデータベースにセッションを追加する

    // セッション情報をクッキーに設定する
    /*
    res.setCookie({
        name: "session", 
        value: session_id,
        secure: false, // Secureサーバーならtrue推奨
        httpOnly: true,
    });
    */

    res.redirect("/");
}

/**
 * ログイン処理
 */
export const signin = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`SIGNIN`);
}

/**
 * ログアウト処理
 */
export const signout = async (req: SystemRequest, res: SystemResponse) => {
    res.setText(`SIGNOUT`);
}

/**
 * ボディーを連想配列に変換する
 * @param body requestのbodyデータ
 * @returns 成功時は連想配列、失敗時はnull
 */
function body_to_JSON(body: string): {[key:string]: string} | null {
    try {
        return JSON.parse(body);
    } catch (error) {
        return null;
    }
}

/**
 * user_nameが問題ないかチェックする
 * @param user_name 文字列
 * @returns 問題ない場合はtrue
 */
function check_username(user_name: string): boolean {

    // user_nameが既にユーザーDBに登録されていないかチェックする。

    return user_name.length > 0;
}

/**
 * passwordが問題ないかチェックする
 * @param password 文字列
 * @returns 問題ない場合はtrue
 */
function check_password(password: string): boolean {

    return password.length >= 14;
}