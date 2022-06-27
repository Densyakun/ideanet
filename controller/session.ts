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
 * ログイン処理
 */
export const signin = async (req: SystemRequest, res: SystemResponse) => {
    const body = body_to_JSON(await req.readBody());
    const user_name: string = body?.user_name || "";
    const password: string = body?.password || "";

    // user_nameかpasswordが入力されていない場合は認証を失敗させる。
    if(!(user_name.length && password.length)) {
        res.setText("Authentication failure.", 403);
        return;
    }

    // user_nameを用いてユーザーDBからhashed_passwordを取得
    const hashed_password: string = "";

    const result: boolean = await bcrypt.compare(password, hashed_password);

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
async function check_username(user_name: string): Promise<boolean> {

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

/**
 * セッションを追加する
 * @param res レスポンス
 * @param user_name ユーザーの名前
 */
async function add_session(res: SystemResponse, user_name: string): Promise<void> {

    // セッションデータベースにセッションを追加する
    const session_id = "XXXXXXXXXXXXXXX";

    // セッション情報をクッキーに設定する
    res.setCookie({
        name: "session", 
        value: session_id,
        secure: false, // Secureサーバーならtrue推奨
        httpOnly: true,
    });
    
}