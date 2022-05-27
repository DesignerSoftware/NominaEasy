import { Injectable } from '@angular/core';
//import { preguntaList } from '../entidades/pregunta.data';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class PreguntaService {
    private url: string = '';
    constructor(private http: HttpClient) {
        this.url = environment.urlEvalws;
     }    
    
    public getPregunta(seudonimo: string, secEvalPrueba: number, secuenciaIndagacion: number,
        empresa: string, cadena: string) {
        //console.log('convo: ' , this.convo);
        let consumo = this.url+'Preguntas/pregunta'
        return this.http.get(consumo, {
            params: {
                seudonimo: seudonimo,
                evalPrueba: secEvalPrueba,
                evalIndagacion: secuenciaIndagacion,
                nit: empresa,
                cadena: cadena
            }
          });
    }
}
