import {AxiosResponse} from "axios";
import {$host, baseURL} from "./http";
import {IResponse} from "../types/UserTypes";
import {ITodo} from "../types/TodoTypes";

/**
 *
 * Все запросы к серверу
 *
 */

export class AuthService {
    static async registration(email: string, password: string, role = "USER"): Promise<AxiosResponse<IResponse>> {
        return await $host.post<IResponse>(`${baseURL}/api/auth/registration`, {email, password, role});
    }

    static async login(email: string, password: string): Promise<AxiosResponse<IResponse>> {
        return $host.post<IResponse>(`${baseURL}/api/auth/login`, {email, password});
    }

    static async check(): Promise<AxiosResponse<IResponse>> {
        return $host.get<IResponse>(`http://localhost:5000/api/auth/check`);
    }

    static async logout(): Promise<void> {
        return $host.get(`${baseURL}/api/auth/logout`);
    }
}

export class TodoService {
    static async fetchTodos(): Promise<AxiosResponse<ITodo[]>> {
        return $host.get<ITodo[]>(`${baseURL}/api/todo/find`);
    }

    static async createTodo(formData: FormData): Promise<AxiosResponse<ITodo>> {
        return $host.post(`${baseURL}/api/todo/create`, formData);
    }

    static async changeTodo(formData: FormData): Promise<AxiosResponse<ITodo>> {
        return $host.put(`${baseURL}/api/todo/change`, formData);
    }

    static async checkTodoIsDone(id: string, done: boolean): Promise<AxiosResponse<ITodo>> {
        return $host.put(`${baseURL}/api/todo/check`, {id, done});
    }

    static async deleteTodo(id: string): Promise<AxiosResponse<ITodo>> {
        return $host.delete(`${baseURL}/api/todo/delete`, {
            data: {
                id
            }
        });
    }
}
