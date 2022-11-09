import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(
        public loaderService: LoaderService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.loaderService.show();
        req = req.clone({
            setHeaders: {
                Authorization: '' + localStorage.getItem('token')
            },
        });
        return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    }

}
