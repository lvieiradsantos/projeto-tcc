import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { UtilService } from '../services/util.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {
    constructor(
        private loaderService: LoaderService,
        private utilService: UtilService
    ) { }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        this.loaderService.show();
        req = req.clone({
            setHeaders: {
                Authorization: '' + this.utilService.getToken()
            },
        });
        return next.handle(req).pipe(finalize(() => this.loaderService.hide()));
    }

}
