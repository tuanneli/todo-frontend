import React, {Dispatch, useContext, useEffect, useState} from 'react';
import {writeFile} from "fs";
import dayjs from "dayjs";
import {Check, Close} from "@mui/icons-material";
import {Context} from "../../../index";
import Error from "../../error/Error";
import {TodoService} from "../../api/API";
import Loader from "../../loader/Loader";
import {ITodo} from "../../types/TodoTypes";
import {$host, baseURL} from "../../api/http";
import * as url from "url";
import axios from "axios";

interface IAddTodo {
    todoItem: ITodo | null
    setTodoItem: Dispatch<ITodo | null>
}

const AddTodo = ({setTodoItem, todoItem}: IAddTodo) => {

    const [file, setFiles] = useState<any>();
    const [date, setDate] = useState<string>("");
    const [todoHeader, setTodoHeader] = useState<string>('')
    const [todoDescription, setTodoDescription] = useState<string>('')
    const [error, setError] = useState<string>()
    const {todoStore, userStore} = useContext(Context);
    const [loading, setLoading] = useState(false);

    const uploadHandler = (e: any) => {
        const file = e.target.files[0];
        setFiles(file);
    }
    
    useEffect(() => {
        if (todoItem !== null) {
            setTodoHeader(todoItem.header);
            setTodoDescription(todoItem.description);
            setDate(todoItem.date);
        } else {
            setTodoHeader("");
            setTodoDescription("");
            setDate("");
        }
    }, [todoItem])

    const uploadDate = (e: any) => {
        const date = e.target.value;
        setDate(date);
    };

    const closeWindowHandler = (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        todoStore.setShowAddTodoWindow(false);
        setTodoItem(null)
    }

    const addTodoHandler = async (e: any) => {
        e.stopPropagation();
        const formData = new FormData();
        formData.append('header', todoHeader);
        formData.append('description', todoDescription);
        formData.append('date', date);
        formData.append('file', file);
        setTodoItem(null)
        if (!todoHeader || !todoDescription) {
            setError('Название задачи и текст заметки не должны быть пустыми!')
        } else {
            setLoading(true);
            if (todoItem !== null) {
                formData.append('id', todoItem._id as string)
                todoStore.changeTodo(formData).then(() => {
                    todoStore.setShowAddTodoWindow(false);
                });
            } else {
                todoStore.createTodo(formData).then(() => {
                    todoStore.setShowAddTodoWindow(false);
                });
            }
        }
    }

    return (
        <div className={'todo-main-container'} onClick={() => setError('')}>
            <div onClick={closeWindowHandler} className={'todo-main-container-bg'}/>
            {error ? <div className={'todo-main-container-error'}>
                {error}
            </div> : null}
            {loading ? <div style={{color: 'black'}} className={'todo-main-container-error'}>
                Загрузка...
            </div> : null}
            <div className={'add-todo-main-box'}>
                <div className={'todo-top-buttons-box'}>
                    <button disabled={loading} onClick={addTodoHandler}
                            className={'todo-top-buttons-box__add'}>Подтвердить<Check/>
                    </button>
                    <button disabled={loading} onClick={closeWindowHandler}
                            className={'todo-top-buttons-box__close'}>{<Close/>}</button>
                </div>
                <div className={"add-todo-main-box__top"}>
                    <div className={"add-todo-main-box__top-item-box"}>
                        <input className={"add-todo-main-box__top-input"}
                               type="text"
                               onChange={(e) => setTodoHeader(e.target.value)}
                               value={todoHeader}
                               placeholder={"Название задачи"}/>
                    </div>
                    <div className={"add-todo-main-box__top-item-box"}>
                        <div className={"add-todo-main-box__top-item-box__date-text"}>
                            Дата завершения:
                        </div>
                        <input className={"add-todo-main-box__top-item-box__date-calendar"}
                               onChange={uploadDate}
                               value={date}
                               type="date"/>
                    </div>
                    <div className={"add-todo-main-box__top-item-box"}>
                        <label htmlFor={'file'} className={"add-todo-main-box__top-item-box__label"}>
                            Загрузить файлы
                        </label>
                        <input type={'file'}
                               id={'file'}
                               name={'file'}
                               className={"add-todo-main-box__top-item-box__input"}
                               onChange={uploadHandler}
                               placeholder={"Прикрепить файл"}/>
                        <div className={"add-todo-main-box__top-item-box__file-name"}>
                            {file?.name}
                        </div>
                    </div>
                </div>
                <div className={"add-todo-main-box__bottom"}>
                    <textarea placeholder={'Текс заметки...'}
                              onChange={(e) => setTodoDescription(e.target.value)}
                              value={todoDescription}
                              className={"add-todo-main-box__bottom__text-area"}/>
                </div>
            </div>
        </div>
    );
};

export default AddTodo;
