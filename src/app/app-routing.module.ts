import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { FavoriteObjectsCatalogComponent } from './pages/favorite-objects-catalog/favorite-objects-catalog.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ObjectCatalogEditComponent } from './pages/object-catalog-edit/object-catalog-edit.component';
import { ObjectCatalogPendingComponent } from './pages/object-catalog-pending/object-catalog-pending.component';
import { OpenObjectComponent } from './pages/open-object/open-object.component';
import { PrivacyPolicyComponent } from './pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RatePageComponent } from './pages/rate-page/rate-page.component';
import { RegistryObjectComponent } from './pages/registry-object/registry-object.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TalkUsComponent } from './pages/talk-us/talk-us.component';
import { TermsOfUseComponent } from './pages/terms-of-use/terms-of-use.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastrar-item',
    component: RegistryObjectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: SignUpComponent
  },

  {
    path: 'sobre-nos',
    component: AboutUsComponent
  },
  {
    path: 'item/:id',
    component: OpenObjectComponent
  },

  {
    path: 'atualizar-item/:id',
    component: ObjectCatalogEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fale-conosco',
    component: TalkUsComponent
  },

  {
    path: 'politica-de-privacidade',
    component: PrivacyPolicyComponent
  },

  {
    path: 'termos-de-uso',
    component: TermsOfUseComponent
  },
  {
    path: 'selo-de-classificacao',
    component: RatePageComponent
  },
  {
    path: 'itens-pendentes',
    component: ObjectCatalogPendingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'meus-favoritos',
    component: FavoriteObjectsCatalogComponent,
    canActivate: [AuthGuard]
  },

  { path: '**', redirectTo: '' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
