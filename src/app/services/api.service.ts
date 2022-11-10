import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient,
    ) { }

    login(email: string, password: string) {
        return this.http.post(environment.api.login, { email, password })
            .pipe(tap((respnse: any) => {
                localStorage.setItem('token', respnse.token);
            })) as Observable<any>;
    }

    getItensPendentes() {
        return this.http.get(environment.api.itensPendentes) as Observable<any>;
    }

    getItens(like?: string) {
        return this.http.get(`${environment.api.itens}?like=${like || ''}`) as Observable<any>;
    }

    createItem(item: {
        name: string,
        model: string,
        brand: string,
        watts: number,
        db: number,
        rate: 'yellow' | 'red' | 'green'
    }) {
        return this.http.post(environment.api.itens, item) as Observable<any>;
    }

    deleteItem(itemId: string) {
        return this.http.delete(`${environment.api.itens}/${itemId}`) as Observable<any>;
    }

    getItem(itemId: string) {
        return this.http.get(`${environment.api.itens}/${itemId}`) as Observable<any>;
    }

    editItem(itemId: string, item: any) {
        return this.http.put(`${environment.api.itens}/${itemId}`, item) as Observable<any>;
    }

    createUsuario(user: {
        name: string,
        email: string,
        password: string
    }) {
        return this.http.post(environment.api.user, user) as Observable<any>;
    }

    getUsuario(userId: string) {
        return this.http.get(`${environment.api.user}/${userId}`) as Observable<any>;
    }

    editUsuario(userId: string, user: any) {
        return this.http.put(`${environment.api.user}/${userId}`, user) as Observable<any>;
    }

    addFavouriteItem(itemId: string, userId: string) {
        return this.http.post(`${environment.api.user}/${userId}/${environment.api.itens}/${itemId}`, {}) as Observable<any>;
    }

    removeFavouriteItem(itemId: string, userId: string) {
        return this.http.delete(`${environment.api.user}/${userId}/${environment.api.itens}/${itemId}`, {}) as Observable<any>;
    }

    uploadItemPhoto(itemId: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('itemId', itemId);

        const request = new HttpRequest(
            'POST',
            environment.api.itemPhoto,
            formData, {
            headers: new HttpHeaders({ Authorization: String(localStorage.getItem('token')) }),
            reportProgress: true,
        }
        );
        return this.http.request(request);
    }
}