import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.less';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import UserStore from "./components/store/UserStore";
import TodoStore from "./components/store/TodoStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

interface IStore {
    userStore: UserStore
    todoStore: TodoStore
}

const userStore = new UserStore();
const todoStore = new TodoStore();

export const Context = createContext<IStore>({
    userStore,
    todoStore
})

root.render(
    <Context.Provider value={{
        userStore,
        todoStore
    }}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Context.Provider>
);
