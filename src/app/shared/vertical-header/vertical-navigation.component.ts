import { Component, AfterViewInit, EventEmitter, Output } from "@angular/core";
import {
  NgbModal,
  ModalDismissReasons,
  NgbPanelChangeEvent,
  NgbCarouselConfig,
} from "@ng-bootstrap/ng-bootstrap";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';

declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public showSearch = false;


  // This is for Notifications

  public selectedLanguage: any = {
    language: 'Español',
    code: 'es',
    icon: 'es'
  }

  public languages: any[] = [
    {
      language: 'Español',
      code: 'es',
      icon: 'es'
    }, {
      language: 'English',
      code: 'en',
      type: 'US',
      icon: 'us'
    },
    {
      language: 'Français',
      code: 'fr',
      icon: 'fr'
    },
    {
      language: 'German',
      code: 'de',
      icon: 'de'
    }]



  constructor(private modalService: NgbModal, private translate: TranslateService
    , private loginService: LoginService, private usuarioService: UsuarioService, public router: Router) {
    translate.setDefaultLang('es');
  }

  changeLanguage(lang: any) {
    this.translate.use(lang.code)
    this.selectedLanguage = lang;
  }

  ngAfterViewInit() { }

  logout() {
    //console.log('cerrar sesion');
    localStorage.removeItem('currentUser');
    this.navigate();
    this.loginService.logOut(); // Limpiar datos
  };

  navigate() {
    this.router.navigate(['/login']);
  }
}
