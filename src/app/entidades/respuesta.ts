export class Respuesta {
    secuencia: number | null;
    evalPreguntas: number | null;
    descripcion: string | null;
    cuantitativo: number | null;
    cualitativo: string | null;
}

export class RespuestaDiligenciada {
    indagacion: number | null;
    planilla: string | null;
    secPregunta: number | null;
    secRespuesta: number | null;
}