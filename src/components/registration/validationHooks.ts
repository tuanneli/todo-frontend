export const useAuthValidation = (email: string, passwordFirst: string, passwordSecond: string) => {
    if (email === "") {
        return ("Необходимо ввести почту");
    }
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!regex.test(email)) {
        return ("Неверный формат почты")
    }
    if (passwordFirst !== passwordSecond) {
        return "Пароли не совпадают!";
    }
    if (passwordFirst.length < 4) {
        return "Длина пароля должна быть больше 4 символов";
    }
    return "";
}
