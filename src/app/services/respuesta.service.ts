import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class RespuestaService {
    private url: string = '';
    constructor(private http: HttpClient) {
        this.url = environment.urlEvalws;
    }

    public getRespuesta(seudonimo: string, secEvalPrueba: number, empresa: string, cadena: string) {
        //console.log('convo: ' , this.convo);
        let consumo = this.url + 'Respuestas/respuesta'
        return this.http.get(consumo, {
            params: {
                seudonimo: seudonimo,
                evalPrueba: secEvalPrueba,
                nit: empresa,
                cadena: cadena
            }
        });
    }

    public getRespuestaXplanilla(seudonimo: string, secIndagacion: number, empresa: string, cadena: string) {
        //console.log('convo: ' , this.convo);
        let consumo = this.url + 'Respuestas/consultarrespuesta'
        return this.http.get(consumo, {
            params: {
                seudonimo: seudonimo,
                evalindagacion: secIndagacion,
                nit: empresa,
                cadena: cadena
            }
        });
    }

    public insertRespuesta(seudonimo: string, secIndagacion: string,
        secPregunta: string, secRespuesta: string, empresa: string, cadena: string) {
        //console.log('seudonimo: ' , seudonimo , 'secIndagacion: ', secIndagacion ,
        //    'secPregunta: ' , secPregunta , 'secRespuesta: ' , secRespuesta);
        let consumo = this.url + 'Respuestas/registrarRespuesta'
        console.log('consumo:', consumo);

        return this.http.post(consumo, '', {
            params: {
                nit: empresa,
                cadena: cadena,
                evalRespuesta: secRespuesta,
                evalIndagacion: secIndagacion,
                evalPregunta: secPregunta
            }
        });
    }
}
