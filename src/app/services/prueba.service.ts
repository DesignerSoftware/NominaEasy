import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
export class PruebaService {
    private url: string = '';
    constructor(private http: HttpClient) {
        this.url = environment.urlEvalws;
     }
    
    public getPrueba(seudonimo: string, secEmplConvo: number, empresa: string, cadena: string) {
        //console.log('convo: ' , this.convo);
        let consumo = this.url+'pruebas/prueba'
        return this.http.get(consumo, {
            params: {
                seudonimo: seudonimo,
                secEmplConvo: secEmplConvo,
                nit: empresa,
                cadena: cadena
            }
          });
    }
}
