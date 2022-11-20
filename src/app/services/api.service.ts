import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CatalogItemModel } from "../model/catalog-item.model";
import { ProfileModel } from "../model/profile.model";
import { UtilService } from "./util.service";

@Injectable()
export class ApiService {

    constructor(
        private http: HttpClient,
        private utilService: UtilService
    ) { }

    login(email: string, password: string) {
        return this.http.post(environment.api.login, { email, password })
            .pipe(tap((response: any) => {
                this.utilService.setToken(response.token);
            })) as Observable<{
                token: string
            }>;
    }

    getItensPendentes() {
        return this.http.get(environment.api.itensPendentes) as Observable<any>;
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
        rate: 'yellow' | 'red' | 'green',
        file?: File
    }) {
        if (item.file) {
            return this.http.post(environment.api.itens, item).pipe(
                switchMap(resp => this.uploadItemPhoto(resp['id'], item.file))
            );
        } else {
            return this.http.post(environment.api.itens, item) as Observable<any>;
        }
    }

    deleteItem(itemId: string) {
        return this.http.delete(`${environment.api.itens}/${itemId}`) as Observable<{ message: string }>;
    }

    getItem(itemId: string) {
        return this.http.get(`${environment.api.itens}/${itemId}`) as Observable<CatalogItemModel>;
    }

    editItem(itemId: string, item: {
        name?: string,
        model?: string,
        brand?: string,
        watts?: number,
        db?: number,
        rate?: 'yellow' | 'red' | 'green',
        file?: File
        active?: boolean
    }) {
        if (item.file) {
            return this.http.put(`${environment.api.itens}/${itemId}`, {
                ...item,
                file: null
            }).pipe(
                switchMap(resp => this.uploadItemPhoto(resp['id'], item?.file))
            );
        } else {
            return this.http.put(`${environment.api.itens}/${itemId}`, item) as Observable<any>;
        }
    }

    createUsuario(user: {
        name: string,
        email: string,
        password: string
    }) {
        return this.http.post(environment.api.user, user) as Observable<ProfileModel>;
    }

    getUsuario(userId: string) {
        return this.http.get(`${environment.api.user}/${userId}`) as Observable<ProfileModel>;
    }

    deleteUser(userId: string) {
        return this.http.delete(`${environment.api.user}/${userId}`) as Observable<any>;
    }

    editUsuario(userId: string, user: any) {
        return this.http.put(`${environment.api.user}/${userId}`, user) as Observable<ProfileModel>;
    }

    addFavouriteItem(itemId: string, userId: string) {
        return this.http.post(`${environment.api.user}/${userId}/item/${itemId}`, {}) as Observable<ProfileModel>;
    }

    removeFavouriteItem(itemId: string, userId: string) {
        return this.http.delete(`${environment.api.user}/${userId}/item/${itemId}`, {}) as Observable<ProfileModel>;
    }

    uploadItemPhoto(itemId: string, file: File) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('itemId', itemId);

        const request = new HttpRequest(
            'POST',
            environment.api.itemPhoto,
            formData, {
            headers: new HttpHeaders({ Authorization: String(this.utilService.getToken()) }),
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

    getPendingItensPaginado(page: number, limit: number, like?: string) {
        return this.http.get(`${environment.api.itensPendentes}/?page=${page || ''}&limit=${limit || ''}&like=${like || ''}`) as Observable<{
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

    getUsersNumbers() {
        return this.http.get(environment.api.userNumbers) as Observable<any>;
    }

    getItensNumbers() {
        return this.http.get(environment.api.itensNumbers) as Observable<any>;
    }

    getRankedItems(limit: number, order: string) {
        return this.http.get(`${environment.api.favitems}rank?limit=${limit || ''}&order=${order || ''}`)
    }
}