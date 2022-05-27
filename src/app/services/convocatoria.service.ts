import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
    providedIn: 'root'
  })
export class ConvocatoriaService {

    private urlEval: string = '';
    private url: string = '';
    public convocatoria = null; 
    //public convo = convoList;

    constructor(private http: HttpClient) {
        this.url = environment.urlEvalws;
     }

     /*public getConvocatoria() {
        //console.log('convo: ' , this.convo);
        return this.convo;
     }*/

    public getConvocatoria2(usuario: string, empresa: string, cadena: string, estado: string) {
        let consumo;
        if (estado=='PROCESAR') {
            consumo = this.url+'Convocatorias/convocatoriaProcesar'    
        } else if (estado=='ALCANCE') {
            consumo = this.url+'Convocatorias/convocatoriaAlcance'
        }
        //console.log('consumo: ' , consumo);
        return this.http.get(consumo, {
            params: {
                seudonimo: usuario,
                nit: empresa,
                cadena: cadena
            }
          });

    }

    setRespuesta(respuesta: any) {
        localStorage.setItem('respuestas', JSON.stringify(respuesta));
    }

    getRespuesta() {
        //const obj: any = JSON.parse(localStorage.getItem('respuestas')) ;
        //console.log('getUserLoggedIn()', obj);
        return JSON.parse(localStorage.getItem('respuestas'));
    }
    setPaginaPregunta(pagPregunta: any){
        localStorage.setItem('pagPregunta', JSON.stringify(pagPregunta));
    }
    getPaginaPregunta() {
        return JSON.parse(localStorage.getItem('pagPregunta'));
    }
}
