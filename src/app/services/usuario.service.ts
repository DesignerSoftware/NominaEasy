import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public isUserLoggedIn=false;
  public usserLogged;
  grupoEmpresarial : string ="";
  cadenaConexion: string = "";
  empresa : string = "";
  usuario : string = "";
  tokenJWT : string = "";
  urlKioscoDomain : string = "";

  constructor(private http: HttpClient) {
    this.isUserLoggedIn =  false;
  }

  setUsuario(usuario: string) {
    this.usuario = usuario;
  }

  setEmpresa(nitEmpresa: string) {
    this.empresa = nitEmpresa;
  }

  setTokenJWT(token: string) {
    this.tokenJWT = token;
  }

  setGrupo(grupo: string){
    this.grupoEmpresarial=grupo;
  }

  setUrlKiosco(url: string){
    this.urlKioscoDomain=url;
  }

  getUrlws(){
    return environment.urlEvalws;
  }

  getDominio(){
    return environment.urlEval;
  }

  setUserLoggedIn(usuario: any) {
    this.isUserLoggedIn = true;
    this.usserLogged = usuario;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  getUserLoggedIn() {
    const obj: any = JSON.parse(localStorage.getItem('currentUser')) ;
    //console.log('getUserLoggedIn()', obj);
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  validarIngresoKioscoSeudonimo(seudonimo: string, password: string, nit: string, cadena: string) {
    const url = `${environment.urlEvalws}conexioneskioskos/validarIngresoSeudonimoKiosco`;
    console.log(url);
    /*//console.log(
      `${environment.urlKioskoReportes}conexioneskioskos/validarIngresoSeudonimoKiosco?usuario=${seudonimo}&clave=${password}&nitEmpresa=${nit}`);*/
    return this.http.get(url,
    {params: {
      usuario: seudonimo,
      clave: password,
      nitEmpresa: nit,
      cadena: cadena
    }});
  }

  // inactivo todos los tokens de un mismo tipo
  inactivaTokensTipo(tipo: string, usuario: string, nitEmpresa: string, cadena: string) {
    const url = `${environment.urlEvalws}conexioneskioskos/inactivaTokensTipo?tipo=${tipo}&seudonimo=${usuario}&nit=${nitEmpresa}&cadena=${cadena}`;
    ////console.log(url);
    return this.http.post(url, {});
  }

  clear() {
    this.isUserLoggedIn = null;
    this.usserLogged = null;
    this.grupoEmpresarial = "";
    this.cadenaConexion = "";
    this.empresa= "";
    this.usuario = "";
  }
}
