import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable(
    {
        providedIn: 'root'
    }
)
export class UtilService {

    constructor(
        private router: Router
    ) { }

    isLogged(): boolean {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['/']);
    }
}