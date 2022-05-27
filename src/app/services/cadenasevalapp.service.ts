import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CadenasevaluacionesappService {

  constructor(private http: HttpClient) { }

  getcadenasEvalEmp(grupo: string, dominio: string) {
    //console.log('grupo recibido: ' + grupo);
    const url = `${environment.urlEvalws}cadenasevaluaciones/${grupo}`;
    //console.log(url);
    return this.http.get(url, {
      params: {
        dominio: dominio
      }
    });
  }

  /*Retorna los campos de tabla cadenaskioskosapp relacionados al grupo y nit enviados como parametro*/
  getCadenaEvalXGrupoNit(grupo: string, nit: string) {
    const url = `${environment.urlEvalws}cadenasevaluaciones/${grupo}/${nit}`;
    //console.log(url);
    return this.http.get(url);
  }  

}
