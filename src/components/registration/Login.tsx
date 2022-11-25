import React, {useContext, useEffect, useState} from 'react';
import Error from "../error/Error";
import {Link, useNavigate} from "react-router-dom";
import './RegistrationLogin.less';
import {useAuthValidation} from "./validationHooks";
import {Context} from "../../index";
import Loader from "../loader/Loader";

/**
 *
 * Компонент с описанием логики логинизации
 *
 * @constructor
 */

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);
    let validationError = "";
    validationError = useAuthValidation(email, password, password);
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    /**
     *
     * После сбора данных о пользователе в переменные валидируем ошибки
     * и если всё впорядке отправляем запрос с логинизации на сервер
     *
     * @param e
     */

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError(validationError);
        if (!validationError) {
            const possibleError = await userStore.login(email, password,)
            if (possibleError) {
                return setError(possibleError);
            }
            navigate('/');
        }
    }

    useEffect(() => {
        setIsLoading(false);
    }, [])

    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <div className={'main-content'}>
            <div className={'sidebox sidebox-left'}>
                <div className={'form-box'}>
                    <h1 style={{fontSize: '50px', marginBottom: "10px"}}>Todo List</h1>
                    <h1 style={{fontSize: '30px', marginBottom: "10px"}}>Вход</h1>
                    <p>И снова здравствуй! C возвращением!</p>
                </div>
            </div>
            <div className={'sidebox sidebox-right'}>
                <div className={'form-box'}>
                    <div className={'form-box__label'}>Почта</div>
                    <input className={'form-box__input'} type="text" placeholder={"Введите почту"}
                           value={email}
                           onChange={(e) => setEmail(e.target.value.trim())}/>
                    <div className={'form-box__label'}>Введите пароль</div>
                    <input className={'form-box__input'} type="password" placeholder={"Введите пароль"}
                           value={password}
                           onChange={(e) => setPassword(e.target.value.trim())}/>
                    <div className={'form-box__label'}>
                        {error ? <Error errorText={error}/> : null}
                    </div>
                    <button className={'form-box__button'} onClick={handleSubmit}>Подтвердить</button>
                    <div className={'form-box__label-bottom'}>
                        <div>Ещё нет аккаунта?</div>
                        <Link className={'form-box__label-bottom__link-text'}
                              to={'/registration'}>Зарегестрироваться</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;