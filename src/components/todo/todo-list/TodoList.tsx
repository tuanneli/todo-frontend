import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import {ITodo} from "../../types/TodoTypes";
import {toJS} from "mobx";
import './TodoList.less';
import AddTodo from "./AddTodo";
import {TodoService} from "../../api/API";
import {Check, Delete, Edit} from "@mui/icons-material";
import {baseURL} from "../../api/http";
import dayjs from "dayjs";
import img from '../../img/note.jpg';

/**
 *
 *Основная логика todo листа
 *
 */

const TodoList = observer(() => {

    const {todoStore} = useContext(Context);
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [toggle, setToggle] = useState(false);
    const [todoItem, setTodoItem] = useState<ITodo | null>(null);
    const [currDate, setCurrDate] = useState<number[]>([])

    /**
     *
     * Получаем текущую дату
     */

    const getCurrentDate = () => {
        const getDate = new Date;
        setCurrDate([getDate.getDate(), (getDate.getMonth() + 1), getDate.getFullYear()])
    }

    /**
     *
     * Проверка не устарела ли задача в todo листе
     *
     */

    const checkExpired = () => {
        todos.map(async (todo) => {
            let itemDate = todo.date.split('-').map(item => Number(item)).reverse();
            console.log(itemDate)
            if (itemDate.length !== 1) {
                if ((itemDate[0] < currDate[0] || itemDate[1] < currDate[1] || itemDate[2] < currDate[2])) {
                    await todoStore.checkTodoIsDone(todo._id as string, true)
                }
            }
        })
    }

    useEffect(() => {
        todoStore.fetchTodos().then(() => setTodos(toJS(todoStore.todos.reverse())));
        if (currDate.length === 0) {
            getCurrentDate();
        } else {
            checkExpired();
        }
    }, [todoStore.showAddTodoWindow, toggle])

    /**
     *
     * Реализация кнопом по удалению добавлению и изменению файла
     *
     */

    const handleDelete = async (id: string) => {
        await TodoService.deleteTodo(id)
        setToggle(!toggle);
    }

    const handleDone = async (todo: ITodo) => {
        await todoStore.checkTodoIsDone(todo._id as string, !todo.done as boolean)
        setToggle(!toggle)
    }

    const handleChange = async (todo: ITodo) => {
        todoStore.setShowAddTodoWindow(true);
        setTodoItem(todo);
    }

    return (
        <>
            <div className={'main-todo-list-container'}>
                <div className={'todo-search-input-box'}>
                    <div>Список задач</div>
                </div>
                {todos.map(todo => {
                    return (
                        <div className={'todo-list-item-box'} key={todo._id}>
                            <div className={'todo-list-item-inner-box'}>
                                <div
                                    style={{
                                        textDecoration: (todo.done) ? "line-through" : ""
                                    }}
                                    className={'todo-item-left-part'}>
                                    <div style={{textAlign: 'start'}}>{todo.header}</div>
                                    <div>{todo.date ? "Выполнить до: " + dayjs(todo.date).format('DD.MM.YYYY') : null}</div>
                                </div>
                                <div
                                    style={{
                                        textDecoration: (todo.done) ? "line-through" : ""
                                    }}
                                    className={'todo-item-central-part'}>
                                    <div className={'todo-item-central-part__text'}>
                                        {todo.description}
                                    </div>
                                    {todo.file ?
                                        <img className={'todo-item-central-part__img'} src={baseURL + "/" + todo.file}
                                             alt="файл"/> : null}
                                </div>
                                <div className={'todo-item-right-part'}>
                                    <button className={'done-todoitem-button'}
                                            onClick={() => handleDone(todo)}><Check/>
                                    </button>
                                    <button className={'change-todoitem-button'}
                                            onClick={() => handleChange(todo)}><Edit/>
                                    </button>
                                    <button className={'delete-todoitem-button'}
                                            onClick={() => handleDelete(todo._id as string)}><Delete/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {todoStore.showAddTodoWindow ? <AddTodo setTodoItem={setTodoItem} todoItem={todoItem}/> : null}
            </div>
        </>
    );
});

export default TodoList;