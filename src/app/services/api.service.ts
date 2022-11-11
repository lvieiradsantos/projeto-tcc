import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CatalogItemModel } from "../model/catalog-item.model";

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient,
    ) { }

    login(email: string, password: string) {
        return this.http.post(environment.api.login, { email, password })
            .pipe(tap((respnse: any) => {
                localStorage.setItem('token', respnse.token);
            })) as Observable<{
                token: string
            }>;
    }

    getItensPendentes() {
        return this.http.get(environment.api.itensPendentes) as Observable<CatalogItemModel>;
    }

    getItens(like?: string) {
        return this.http.get(`${environment.api.itens}?like=${like || ''}`) as Observable<CatalogItemModel[]>;
    }

    createItem(item: {
        name: string,
        model: string,
        brand: string,
        watts: number,
        db: number,
        rate: 'yellow' | 'red' | 'green'
    }) {
        return this.http.post(environment.api.itens, item) as Observable<CatalogItemModel>;
    }

    deleteItem(itemId: string) {
        return this.http.delete(`${environment.api.itens}/${itemId}`) as Observable<{ message: string }>;
    }

    getItem(itemId: string) {
        return this.http.get(`${environment.api.itens}/${itemId}`) as Observable<CatalogItemModel>;
    }

    editItem(itemId: string, item: any) {
        return this.http.put(`${environment.api.itens}/${itemId}`, item) as Observable<CatalogItemModel>;
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

    deleteUser(userId: string) {
        return this.http.delete(`${environment.api.user}/${userId}`) as Observable<any>;
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

    getItensPaginado(page: number, limit: number, like?: string) {
        return this.http.get(`${environment.api.itensPag}?page=${page || ''}&limit=${limit || ''}&like=${like || ''}`) as Observable<{
            items: CatalogItemModel[],
            meta: {
                totalItems: number;
                itemCount: number;
                itemsPerPage: number;
                totalPages: number;
                currentPage: number;
            },
            links: {
                first: string;
                previous: string;
                next: string;
                last: string;
            }
        }>;
    }
}