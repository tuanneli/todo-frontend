import {makeAutoObservable} from "mobx";
import {IUser} from "../types/UserTypes";
import {AuthService, TodoService} from "../api/API";
import {ITodo} from "../types/TodoTypes";

/**
 *
 * Внешнее хранилище данных todo листа
 *
 */

export default class TodoStore {

    constructor() {
        makeAutoObservable(this)
    }

    _todos = [] as ITodo[];

    get todos() {
        return this._todos;
    }

    _showAddTodoWindow = false;

    get showAddTodoWindow() {
        return this._showAddTodoWindow;
    }

    _isLoading = false;

    get isLoading() {
        return this._isLoading;
    }

    setShowAddTodoWindow(bool: boolean) {
        this._showAddTodoWindow = bool;
    }

    setTodos(todos: ITodo[]) {
        this._todos = todos;
    }

    setIsLoading(bool: boolean) {
        this._isLoading = bool;
    }

    async fetchTodos() {
        try {
            this.setIsLoading(true);
            const response = await TodoService.fetchTodos();
            this.setTodos(response.data);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }

    async createTodo(formData: FormData) {
        try {
            this.setIsLoading(true);
            await TodoService.createTodo(formData);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }

    async changeTodo(formData: FormData) {
        try {
            this.setIsLoading(true);
            await TodoService.changeTodo(formData);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }

    async checkTodoIsDone(id: string, done: boolean) {
        try {
            this.setIsLoading(true);
            await TodoService.checkTodoIsDone(id, done);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }
}