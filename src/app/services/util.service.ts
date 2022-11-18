import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import jwt_decode from "jwt-decode";
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

    getToken() {
        return localStorage.getItem('token');
    }

    isLogged(): boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        this.emitIsLogged(false);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }

    emitIsLogged(isLogged: boolean) {
        this.isLoggedSubject.next(isLogged);
    }

    getUserDecoded() {
        return jwt_decode(this.getToken()) as any;
    }
}