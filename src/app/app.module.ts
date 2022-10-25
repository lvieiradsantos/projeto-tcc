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
import { ManageUserComponent } from './pages/manage-user/manage-user.component';
import { ManageObjectComponent } from './pages/manage-object/manage-object.component';
import { FavoriteObjectsCatalogComponent } from './pages/favorite-objects-catalog/favorite-objects-catalog.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { DeleteProfileComponent } from './pages/delete-profile/delete-profile.component';
import { ManagerProfileComponent } from './pages/manager-profile/manager-profile.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { OpenObjectComponent } from './pages/open-object/open-object.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuFooterComponent } from './pages/menu-footer/menu-footer.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/api.interceptor';
import { HttpErrorInterceptor } from './interceptors/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistryObjectComponent,
    ObjectCatalogComponent,
    SignUpComponent,
    ManageUserComponent,
    ManageObjectComponent,
    FavoriteObjectsCatalogComponent,
    ProfileComponent,
    EditProfileComponent,
    DeleteProfileComponent,
    ManagerProfileComponent,
    HeaderComponent,
    FooterComponent,
    OpenObjectComponent,
    MenuComponent,
    MenuFooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
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
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
