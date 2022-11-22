import { Component } from '@angular/core';
import { faBookOpen, faBookmark, faArrowRightToBracket, faArrowRightFromBracket, faCircleUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isLogged: boolean;

  faBookOpen = faBookOpen; //catálogo
  faBookmark = faBookmark;
  faArrowRightToBracket = faArrowRightToBracket; //entrar
  faArrowRightFromBracket = faArrowRightFromBracket; //sair
  faCircleUser = faCircleUser; //perfil
  faUserPlus = faUserPlus; //cadastrar-se

  constructor(
    private utilService: UtilService
  ) { }

  ngOnInit(): void {
    this.isLogged = !!this.utilService.getToken();
    this.subscribeToIsLoggedSubject();
  }

  subscribeToIsLoggedSubject() {
    this.utilService.isLoggedSubject
      .subscribe(isLogged => {
        this.isLogged = isLogged;
      });
  }

  logout() {
    this.utilService.logout();
  }
}