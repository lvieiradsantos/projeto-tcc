import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import jwt_decode from "jwt-decode";
import { ProfileModel } from '../model/profile.model';
@Injectable(
    {
        providedIn: 'root'
    }
)
export class UtilService {
    public isLoggedSubject = new Subject<boolean>()

    constructor(
        private router: Router,
    ) { }

    setToken(token: string) {
        return localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
    }

    isLogged(): boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        this.emitIsLogged(false);
        localStorage.clear();
        this.router.navigate(['/']);
    }

    emitIsLogged(isLogged: boolean) {
        this.isLoggedSubject.next(isLogged);
    }

    getDecodedUser() {
        return this.getToken() ? jwt_decode(this.getToken()) as ProfileModel : null;
    }
}