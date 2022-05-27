import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public kioscoActivo = true;
  public mensajeKioscoInactivo = null;

  constructor(private http: HttpClient, private usuarioService: UsuarioService) {
  }

  registrarUsuario(seudonimo: string, usuario: string, clave: string, nitEmpresa: string, correo: string, cadena: string) {
    // const url = `${environment.urlKioskoDesigner}conexioneskioskos?seudonimo=${seudonimo}&usuario=${usuario}&clave=${clave}&nitEmpresa=${nitempresa}&correo=${correo}`;
    //const url = `${environment.urlEvalws}conexioneskioskos/creaUsuario`;
    const url = `${environment.urlEvalws}conexioneskioskos/creaUsuario?seudonimo=${seudonimo}&usuario=${usuario}&clave=${clave}&nitEmpresa=${nitEmpresa}&correo=${correo}&cadena=${cadena}`;
    //console.log(url);
    // let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*');
    return this.http.post(url, { params: {
      seudonimo: seudonimo,
      usuario: usuario,
      clave: clave,
      nitEmpresa: nitEmpresa,
      correo: correo
    }});
  }

  validarUsuarioYEmpresa(codEmpleado: string, nitEmpresa: string, cadena: string) {
    // const url = `${environment.urlKioskoDesigner}restKiosco/validarUsuarioyEmpresa/${codEmpleado}/${nitEmpresa}`;
    const url = `${environment.urlEvalws}conexioneskioskos/restKiosco/validarUsuarioyEmpresa/${codEmpleado}/${nitEmpresa}?cadena=${cadena}`;
    //console.log(url);
    return this.http.get(url);
  }

  getCorreoAsociadoPersonaEmpresa(documento: string, nitEmpresa: string, cadena: string){
    // const url = `${environment.urlKioskoDesigner}restKiosco/getCorreoPersonaEmpresa/${documento}/${nitEmpresa}`;
    const url = `${environment.urlEvalws}conexioneskioskos/restKiosco/getCorreoPersonaEmpresa/${documento}/${nitEmpresa}?cadena=${cadena}`;
    //console.log(url);
    return this.http.get(url);
  }

  enviarCorreoConfirmaCuenta(usuario: string, clave: string, nitEmpresa: string, cadena: string, grupoEmpr: string, urlKiosco: string) {
    //const url = `${environment.urlKioskoDesigner}restKiosco/jwtValidCuenta?usuario=${usuario}&clave=${clave}&nit=${nitEmpresa}&urlKiosco=${urlKiosco}`;
    // const url = `${environment.urlKioskoDesigner}restKiosco/jwtValidCuenta?usuario=${usuario}&clave=${clave}&nit=${nitEmpresa}&urlKiosco=${environment.urlKiosko}`;
    const url = `${environment.urlEvalws}conexioneskioskos/restKiosco/jwtValidCuenta?usuario=${usuario}&clave=${clave}&nit=${nitEmpresa}&cadena=${cadena}&grupo=${grupoEmpr}&urlKiosco=${urlKiosco}`;
    //console.log(url);
    return this.http.get(url);
  }

  generarToken(usuario: string, clave: string, nitEmpresa: string, cadena: string, grupo: string) {
    //const url = `${environment.urlKioskoDesigner}restKiosco/jwt?usuario=${usuario}&clave=${clave}&nit=${nitEmpresa}`;
    const url = `${environment.urlEvalws}conexioneskioskos/restKiosco/jwt?usuario=${usuario}&clave=${clave}&nit=${nitEmpresa}&cadena=${cadena}&grupo=${grupo}`;
    //console.log(url);
    //console.log(`parametros: usuario ${usuario}, nit ${nitEmpresa}, clave ${clave}, grupo: ${grupo}`);
    return this.http.post(url, {});
  }

  validarSeudonimoYNitEmpresaRegistrado(seudonimo: string, nitempresa: string, cadena: string) {
    // const url = `${environment.urlKioskoDesigner}restKiosco/validarSeudonimoyEmpresaRegistrado/${seudonimo}/${nitempresa}`;
    const url = `${environment.urlEvalws}conexioneskioskos/restKiosco/validarSeudonimoyEmpresaRegistrado/${seudonimo}/${nitempresa}?cadena=${cadena}`;
    //console.log(url);
    return this.http.get(url);
  }

  // Cerrar sesión
  logOut() {
    //console.log('logOut() loginService');
    this.usuarioService.clear();
  }

}
