/**
 * controllerで使用されるコモン関数群
 */

import { SystemRequest, SystemResponse } from "https://github.com/PuddleServer/Puddle/raw/v1.1.2-beta/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.3.0/mod.ts";

/**
 * ボディーを連想配列に変換する
 * @param body requestのbodyデータ
 * @returns 成功時は連想配列、失敗時はnull
 */
export function body_to_JSON(body: string): {[key:string]: string} | null {
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
export async function check_username(user_name: string): Promise<boolean> {

    // user_nameが既にユーザーDBに登録されていないかチェックする。

    return user_name.length > 0;
}

/**
 * passwordが問題ないかチェックする
 * @param password 文字列
 * @returns 問題ない場合はtrue
 */
export function check_password(password: string): boolean {

    return password.length >= 14;
}

export async function compare_password(user_name: string, password: string): Promise<boolean> {

    // user_nameを用いてユーザーDBからhashed_passwordを取得
    const hashed_password: string = "";

    return await bcrypt.compare(password, hashed_password);
}

/**
 * セッションを追加する
 * @param res レスポンス
 * @param user_name ユーザーの名前
 */
export async function add_session(res: SystemResponse, user_name: string): Promise<void> {

    // セッションデータベースにuser_nameを追加する
    const session_id = "XXXXXXXXXXXXXXX";

    // セッション情報をクッキーに設定する
    res.setCookie({
        name: "session", 
        value: session_id,
        secure: false, // Secureサーバーならtrue推奨
        httpOnly: true,
    });
    
}