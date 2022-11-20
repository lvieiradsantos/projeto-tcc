import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistryObjectComponent } from './pages/registry-object/registry-object.component';
import { ObjectCatalogComponent } from './pages/object-catalog/object-catalog.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { FavoriteObjectsCatalogComponent } from './pages/favorite-objects-catalog/favorite-objects-catalog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OpenObjectComponent } from './pages/open-object/open-object.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuFooterComponent } from './pages/menu-footer/menu-footer.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/api.interceptor';
import { HttpErrorInterceptor } from './interceptors/error.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { TalkUsComponent } from './pages/talk-us/talk-us.component';
export const options: Partial<null | IConfig> | (() => Partial<IConfig>) = null;
import { BlockUIModule } from 'ng-block-ui';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ObjectCatalogEditComponent } from './pages/object-catalog-edit/object-catalog-edit.component';
import { NgChartComponent } from './pages/about-us/ng-chart/ng-chart.component';
import { ObjectCatalogPendingComponent } from './pages/object-catalog-pending/object-catalog-pending.component';
import { ItemComponent } from './shared/item/item.component';
import { MostRatedComponent } from './shared/most-rated/most-rated.component';
import { BackBtnComponent } from './shared/back-btn/back-btn.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistryObjectComponent,
    ObjectCatalogComponent,
    SignUpComponent,
    FavoriteObjectsCatalogComponent,
    ProfileComponent,
    HeaderComponent,
    FooterComponent,
    OpenObjectComponent,
    MenuComponent,
    MenuFooterComponent,
    AboutUsComponent,
    TalkUsComponent,
    TermsOfUseComponent,
    PrivacyPolicyComponent,
    ObjectCatalogEditComponent,
    NgChartComponent,
    ObjectCatalogPendingComponent,
    ItemComponent,
    MostRatedComponent,
    BackBtnComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule,
    MatDialogModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot(),
    BlockUIModule.forRoot(),
    NgxMatFileInputModule,
  ],
  providers: [ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
