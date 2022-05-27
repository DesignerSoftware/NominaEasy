import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class EvaluadoService {
    private url: string = '';
    constructor(private http: HttpClient) {
        this.url = environment.urlEvalws;
     }

    //public evaluado = evalList;
    
    public getEvaluado(seudonimo: string, secConvocatoria: number, empresa : string, cadena: string) {
        //console.log('convo: ' , this.convo);
        //return this.evaluado;
        let consumo = this.url+'Evaluados/evaluados'
        return this.http.get(consumo, {
            params: {
                seudonimo: seudonimo,
                secConvocatoria: secConvocatoria,
                nit: empresa,
                cadena: cadena
            }
          });

    }
}
