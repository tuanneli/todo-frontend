import {makeAutoObservable} from "mobx";
import {IUser} from "../types/UserTypes";
import {AuthService} from "../api/API";

/**
 *
 * Внешнее хранилище данных о пользователе
 *
 */

export default class UserStore {

    constructor() {
        makeAutoObservable(this)
    }

    _isLoading = false;

    get isLoading() {
        return this._isLoading;
    }

    _isAuth = false;

    get isAuth() {
        return this._isAuth;
    }

    _user = {} as IUser;

    get user() {
        return this._user;
    }

    setIsLoading(bool: boolean) {
        this._isLoading = bool;
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }

    setUser(user: IUser) {
        this._user = user;
    }

    async registration(email: string, password: string, role: string) {
        try {
            this.setIsLoading(true);
            const response = await AuthService.registration(email, password, role);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }

    async login(email: string, password: string) {
        try {
            this.setIsLoading(true);
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data);
            return e.response?.data?.message;
        } finally {
            this.setIsLoading(false);
        }
    }

    async checkAuth() {
        try {
            this.setIsLoading(true);
            const response = await AuthService.check();
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }

    async logout() {
        try {
            this.setIsLoading(true);
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setIsAuth(false);
            this.setUser({} as IUser);
        } catch (e: any) {
            console.log(e.response?.data?.message);
        } finally {
            this.setIsLoading(false);
        }
    }
}