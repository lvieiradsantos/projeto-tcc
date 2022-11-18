import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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
        this.router.navigate(['/login']);
    }

    emitIsLogged(isLogged: boolean) {
        this.isLoggedSubject.next(isLogged);
    }
}