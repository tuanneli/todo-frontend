import React, {useContext, useEffect, useState} from 'react';
import './App.less';
import {Route, Routes} from "react-router-dom";
import Registration from "./components/registration/Registration";
import Login from "./components/registration/Login";
import TodoList from "./components/todo/todo-list/TodoList";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Sidebar from "./components/todo/sidebar/Sidebar";
import Loader from "./components/loader/Loader";

/**
 *
 * Ядро приложения
 *
 * Прописаны основные роутинги для логина и todo листа
 *
 * В useEffect одгружаем данные из сервера в первый раз
 *
 * @constructor
 */

function App() {

    const {userStore} = useContext(Context);
    const [loading, setLoading] = useState(true)

    const checkAuthorization = async () => {
        if (localStorage.getItem('token')) {
            await userStore.checkAuth();
        }
    }

    useEffect(() => {
        checkAuthorization();
        setLoading(false);
    }, [])

    if (userStore.isLoading || loading) {
        return (
            <Loader/>
        );
    }

    return (
        <div className="App">
            {!userStore.isAuth ?
                <Routes>
                    <Route path={'/registration'} element={<Registration/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/*'} element={<Login/>}/>
                </Routes>
                :
                <>
                    <Sidebar/>
                    <Routes>
                        <Route path={'/todo'} element={<TodoList/>}/>
                        <Route path={'/*'} element={<TodoList/>}/>
                    </Routes>
                </>
            }
        </div>
    );
}

export default observer(App);
