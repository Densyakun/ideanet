function check_username(user_name) {
    return 6 <= user_name.length && user_name.length <= 30
}

function check_password(password) {
    return 14 <= password.length
        && password.length <= 100
        && /^[\x20-\x7E]{14,100}$/.test(password)
}