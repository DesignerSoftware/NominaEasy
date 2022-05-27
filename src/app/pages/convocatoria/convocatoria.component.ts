import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal, NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { aniPregunta, aniFormu, aniBackFormu} from './animacion';
import Swal from 'sweetalert2';

import { EvaluadoService } from '../../services/evaluado.service';
import { Evaluado } from '../../entidades/evaluado';
import { PruebaService } from '../../services/prueba.service';
import { Prueba } from '../../entidades/prueba';
import { PreguntaService } from '../../services/pregunta.service';
import { Pregunta } from '../../entidades/pregunta';
import { RespuestaService } from '../../services/respuesta.service';
import { Respuesta } from '../../entidades/respuesta';
import { RespuestaDiligenciada } from '../../entidades/respuesta';
import { ConvocatoriaService } from '../../services/convocatoria.service';
import { Convocatoria } from '../../entidades/convocatoria';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CadenasevaluacionesappService } from 'src/app/services/cadenasevalapp.service';

@Component({
  selector: 'app-convocatoria',
  templateUrl: './convocatoria.component.html',
  styleUrls: ['./convocatoria.component.scss'],
  animations: [
    aniPregunta, aniFormu, aniBackFormu
  ]
})
export class ConvocatoriaComponent implements OnInit {
  public cambio: String = 'ACTIVO';
  public cambioFormu: String = 'ACTIVO';
  public cambioBackFormu: String = 'ACTIVO';
  secIndagacion: number = 0;
  //ticketsList: Evaluado[] = this.convoService.getEvaluado();
  //pruebaList: Prueba[] = this.pruebaService.getPrueba();
  //convocatoriaList: Convocatoria[] = this.convocatoriaService.getConvocatoria();
  //preguntaList: Pregunta[] = this.preguntaService.getPregunta();
  //respuestaList: Respuesta[] = this.respuestaService.getRespuesta();
  ticketsList: any = [];
  EvaluadosList: any = [];
  evaluadosReporte: any = [];
  pruebaList: any = [];
  preguntaList: any = [];
  respuestaList: any = [];
  respuestaConsultadas: any = [];
  convocatoriaList: any = [];

  respuestaSelec: RespuestaDiligenciada[] = [];

  filterTickets: Evaluado[];
  filterPruebas: Prueba[];
  filterPreguntas: Pregunta[];
  filterRespuestas: Respuesta[];
  filterConvocatoria: Convocatoria[];
  ticketDate: string | null = null;
  ticketDetail: Evaluado | null = null;

  convoTemp: any = [];

  editTicket: FormGroup = Object.create(null);

  page = 1;
  pageSize = 5;
  pagePregunta = 1;
  pageSizePregunta = 1;
  pagText = 1;
  posConvos = 0;posEvaluados = 0;posPruebas = 0;
  formulario: FormGroup;
  estadoPrueba = false;

  createButtonClick = true;

  totalLengthOfCollection = 0;

  _searchTerm = '';
  @ViewChild("convocatoriaEvaliar", { static: false }) mymodal;


  constructor(private evaluadoService: EvaluadoService, private fb: FormBuilder, private modalService: NgbModal,
    private pruebaService: PruebaService, private preguntaService: PreguntaService,
    private respuestaService: RespuestaService, private convocatoriaService: ConvocatoriaService,
    public usuarioService: UsuarioService, private cadenasService: CadenasevaluacionesappService
    //, private datePipe: DatePipe
  ) {
    this.filterTickets = [];
    this.totalLengthOfCollection = this.filterTickets.length;
    this.filterPruebas = [];
    this.filterPreguntas = [];
    this.filterRespuestas = [];
    this.respuestaSelec = [];
    this.EvaluadosList = this.ticketsList;
    //console.log("filterPreguntas:",this.filterPreguntas.length);
    //console.log("filterRespuestas:",this.filterRespuestas.length);

  }


  ngOnInit() {
    if (this.usuarioService.cadenaConexion) {
      this.cargarDatosIniciales();
    } else {
      this.getInfoUsuario();
    }
  }

  getInfoUsuario() { // obtener la información del usuario del localStorage y guardarla en el service
    const sesion = this.usuarioService.getUserLoggedIn();
    this.usuarioService.setUsuario(sesion['usuario']);
    this.usuarioService.setEmpresa(sesion['empresa']);
    this.usuarioService.setTokenJWT(sesion['JWT']);
    this.usuarioService.setGrupo(sesion['grupo']);
    this.usuarioService.setUrlKiosco(sesion['urlKiosco']);
    //console.log('usuario: ' + this.usuarioServicio.usuario + ' empresa: ' + this.usuarioServicio.empresa);
    this.cadenasService.getCadenaEvalXGrupoNit(sesion['grupo'], sesion['empresa'])
      .subscribe(
        data => {
          ////console.log('getInfoUsuario', data);
          ////console.log(sesion['grupo']);
          for (let i in data) {
            if (data[i][3] === sesion['grupo']) { // GRUPO
              const temp = data[i];
              //console.log('cadena: ', temp[4]) // CADENA
              this.usuarioService.cadenaConexion = temp[4];
              //console.log('pages CADENA: ', this.usuarioServicio.cadenaConexion)
              this.cargarDatosIniciales();
            }
          }
        }
      );
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterTickets = this.filter(val);
  }


  ValidationMessage = {
    Status: { required: 'Status is required.' },
    ticketTitle: { required: 'Title is required.' },
    ticketDescription: { required: 'Description is required.' },
    AgentName: { required: 'Assign To is required.' },
    Date: { required: 'Date is required.' },
  };

  formsErrors = {
  };

  cargarDatosIniciales() {
    this.crearFormulario();
    this.cargarConvocatoria();
  }

  crearFormulario() {
    this.editTicket = this.fb.group({
      Id: [''],
      Status: ['', Validators.required],
      ticketTitle: ['', Validators.required],
      ticketDescription: ['', Validators.required],
      AgentName: ['', Validators.required],
      Date: ['']

    });

    this.formulario = this.fb.group({
      pagPregunta: []
    });
  }



  cargarConvocatoria() {
    this.convoTemp = this.convocatoriaService.
      getConvocatoria2(
        this.usuarioService.usuario,
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion,
        'PROCESAR').subscribe((data) => {
          //console.log('opciones Consultadas', data);
          //this.convocatoriaService.convocatoria = data;
          this.convocatoriaList = data;
          this.posConvos = 1;this.posEvaluados = 0;this.posPruebas = 0;
          //this.animacionFormu();
          //console.log('convocatoriaList', this.convocatoriaList);
        });
  }
  cargarEvaluados(secConvo: number) {
    this.convoTemp = this.evaluadoService.
      getEvaluado(this.usuarioService.usuario,
        secConvo,
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion).subscribe((data) => {
          //console.log('opciones Consultadas', data);
          //this.convocatoriaService.convocatoria = data;
          this.ticketsList = data;
          this.filterPruebas = [];
          this.filterTickets = this.ticketsList;
          this._searchTerm = '';
          //this.filterTickets = this.filterTickets.filter(ticket => ticket.evalConvocatoria === type);
          this.EvaluadosList = this.filterTickets;
          this.posConvos = 0;this.posEvaluados = 1;this.posPruebas = 0;
          this.animacionFormu();
          this.scroll('empleados');
          return this.filterTickets;

          //console.log('convocatoriaList', this.convocatoriaList);
        });
    //console.log('secEval', secEval,'secConvo',secConvo);
  }

  cargarReportes(evalReporte: any){
    this.evaluadosReporte = evalReporte;
    //console.log('this.evaluadosReporte ', this.evaluadosReporte);
    
  }
  cargarPrueba(secPruebaEmpl: number) {
    //console.log('secPruebaEmpl', secPruebaEmpl);
    this.convoTemp = this.pruebaService.
      getPrueba(this.usuarioService.usuario,
        secPruebaEmpl,
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion).subscribe((data) => {
          //console.log('opciones Consultadas Pruebas', data);
          //this.convocatoriaService.convocatoria = data;
          this.pruebaList = data;
          this.filterPruebas = this.pruebaList;
          //console.log('pruebaList', this.pruebaList);
          //this.filterPruebas = this.pruebaList.filter(prueba => prueba.evalResultadoConv === codigo);
          this.posConvos = 0;this.posEvaluados = 0;this.posPruebas = 1;
          this.animacionFormu();
          this.scroll('pruebas-1');
          return this.filterPruebas;

          //console.log('convocatoriaList', this.convocatoriaList);
        });
    //console.log('secEval', secEval,'secConvo',secConvo);
  }

  cargarPreguntas(secPrueba: number, secuenciaIndagacion: number) {
    //console.log('secPrueba', secPrueba);
    this.convoTemp = this.preguntaService.
      getPregunta(this.usuarioService.usuario,
        secPrueba,
        secuenciaIndagacion,
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion).subscribe((data) => {
          //console.log('opciones Consultadas preguntas', data);
          //this.convocatoriaService.convocatoria = data;
          this.preguntaList = data;
          this.filterPreguntas = this.preguntaList;
          //console.log("filterPreguntas2:",this.filterPreguntas.length);
          //console.log("filterRespuestas2:",this.filterRespuestas.length);
          //return this.filterPreguntas;

          //console.log('convocatoriaList', this.convocatoriaList);
        });
    //console.log('secEval', secEval,'secConvo',secConvo);
  }

  cargarRespuestas(secPrueba: number, secIndagacion: number) {
    //console.log('cargarRespuestas() ', secPrueba, ' ', secIndagacion);
    this.secIndagacion = secIndagacion;
    this.convoTemp = this.respuestaService.
      getRespuesta(this.usuarioService.usuario,
        secPrueba,
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion).subscribe((data) => {
          //console.log('opciones Consultadas Respuestas ', data);
          //this.convocatoriaService.convocatoria = data;
          this.respuestaList = data;
          this.filterRespuestas = this.respuestaList;
          this.cargarRespuestasXindagacion(secIndagacion);
          //console.log("filterPreguntas3:",this.filterPreguntas.length);
          //console.log("filterRespuesta3s:",this.filterRespuestas.length);
          return this.filterRespuestas;
        });
  }
  //CONSULTAR REPUESTAS YA DILIGENCIADAS
  cargarRespuestasXindagacion(secIndagacion: number) {
    this.respuestaService.getRespuestaXplanilla(this.usuarioService.usuario,
      secIndagacion,
      this.usuarioService.empresa,
      this.usuarioService.cadenaConexion).subscribe((data) => {
        //console.log('cargarRespuestasXindagacion ', data);
        //console.log("secIndagacion: ", secIndagacion);
        this.respuestaConsultadas = data;
        this.cargarRespuestasSeleccion(secIndagacion);
        //console.log("filterPreguntas3:",this.filterPreguntas.length);
        //console.log("filterRespuesta3s:",this.filterRespuestas.length);
      });
  }

  //cargarrespuestas local storage
  cargarRespuestasSeleccion(secIndagacion: number) {
    this.pagePregunta = 1;
    let agregar = 0;
    let agregaInicial = 0;
    this.respuestaSelec = this.convocatoriaService.getRespuesta();
    if (this.respuestaConsultadas.length > 0) {
      this.respuestaSelec = [];
      if (this.respuestaSelec.length > 0 ) {
        for (let i = 0; i < this.respuestaSelec.length; i++) {
          for (let j = 0; j < this.respuestaConsultadas.length; j++) {
            //console.log('this.filterPreguntas[i]["planillas"] , ',this.filterPreguntas[i]["planillas"]);
            if (this.respuestaConsultadas[j][0] == this.respuestaSelec[i]["indagacion"]) {
              //console.log('la indagación es igual');
              agregaInicial += 1;
              if (this.respuestaConsultadas[j][1] == this.respuestaSelec[i]["secPregunta"]) {
                //console.log('la pregunta es igual');
                if (this.respuestaConsultadas[j][2] != this.respuestaSelec[i]["secRespuesta"]) {
                  //console.log('se actualizo correctamente');
                  this.respuestaSelec[j]["secRespuesta"] = this.respuestaConsultadas[i][2];
                }
              }
            }
          }
        }        
      }
      //console.log('agregaInicial: ', agregaInicial);
      if (agregaInicial == 0) {
        this.respuestaSelec = [];
        for (let i = 0; i < this.respuestaConsultadas.length; i++) {
          this.respuestaSelec.push({
            indagacion: this.respuestaConsultadas[i][0],//EVALINDAGACION
            planilla: null,
            secPregunta: this.respuestaConsultadas[i][1], //EVALPREGUNTA
            secRespuesta: this.respuestaConsultadas[i][2] // EVALRESPUESTA
          });
        }
      }
    }
    if (this.respuestaSelec.length <= 0) {
      //this.respuestaSelec = this.convocatoriaService.getRespuesta();
      if (this.respuestaSelec == null) {
        this.respuestaSelec = [];
        //console.log('this.filterRespuestas en local: ', this.filterRespuestas);
        for (let i = 0; i < this.filterPreguntas.length; i++) {
          //console.log('this.filterPreguntas[i]["planillas"] , ',this.filterPreguntas[i]["planillas"]);
          this.respuestaSelec.push({
            indagacion: secIndagacion,
            planilla: this.filterPreguntas[i]["planillas"],
            secPregunta: this.filterRespuestas[i]["evalPreguntas"]["secuencia"],
            secRespuesta: null //this.filterRespuestas[i]["secuencia"]
          });
        }
        //console.log('carga de respuestas' , this.respuestaSelec)
      } else {
        //console.log('Se ha recuperdo respuestas: ', this.respuestaSelec);
        for (let i = 0; i < this.respuestaSelec.length; i++) {
          if (secIndagacion == this.respuestaSelec[i]["indagacion"]) {
            agregar += 1;
          }
        }
        //console.log('agregar:' , agregar );
        if (agregar >= 1) {
          //console.log('la prueba ya esta cargada' , agregar);
        } else {
          for (let i = 0; i < this.filterPreguntas.length; i++) {
            //console.log('this.filterPreguntas[i]["planillas"] , ',this.filterPreguntas[i]["planillas"]);
            this.respuestaSelec.push({
              indagacion: secIndagacion,
              planilla: this.filterPreguntas[i]["planillas"],
              secPregunta: this.filterRespuestas[i]["evalPreguntas"]["secuencia"],
              secRespuesta: null //this.filterRespuestas[i]["secuencia"]
            });
          }
        }
      }
    } else {
      //console.log('ya tengo respuestas, ', this.respuestaSelec);
      for (let i = 0; i < this.respuestaSelec.length; i++) {
        if (secIndagacion == this.respuestaSelec[i]["indagacion"]) {
          agregar += 1;
        }
      }
      //console.log('agregar:' , agregar );

      if (agregar >= 1) {
        //console.log('la prueba ya esta cargada', agregar);
      } else {
        for (let i = 0; i < this.filterPreguntas.length; i++) {
          //console.log('this.filterPreguntas[i]["planillas"] , ',this.filterPreguntas[i]["planillas"]);
          this.respuestaSelec.push({
            indagacion: secIndagacion,
            planilla: this.filterPreguntas[i]["planillas"],
            secPregunta: this.filterRespuestas[i]["evalPreguntas"]["secuencia"],
            secRespuesta: null //this.filterRespuestas[i]["secuencia"]
          });
        }
      }
      //console.log('pruebas cargadas', this.respuestaSelec)
      //this.respuestaSelec = this.filterRespuestas
    }

    this.convocatoriaService.setRespuesta(this.respuestaSelec);
  }

  filter(v: string) {
    return this.EvaluadosList.filter(x => x.nombrePersona?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      || x.empleado.toString()?.toLowerCase().indexOf(v.toLowerCase()) !== -1 //|| x.Status?.toLowerCase().indexOf(v.toLowerCase()) !== -1
    );
  }

  logValidationErrors(group: FormGroup) {
  }


  // openModal(targetModal: NgbModal, ticket: Convocatoria | null) {

  //   this.modalService.open(targetModal, {
  //     centered: true,
  //     //backdrop: 'static',
  //     size: 'xl',
  //   });
  //   if (ticket == null) {
  //     this.createButtonClick = false;
  //   }
  //   if (ticket != null) {
  //     // this.ticketDate = this.datePipe.transform(new Date(ticket.Date), 'yyyy-MM-dd');
  //     this.ticketDetail = ticket;
  //     this.editTicket.patchValue({
  //       Id: ticket.Id,
  //       Nombre: ticket.Nombre,
  //       Codigoempleado: ticket.Codigoempleado,
  //       CodigoConvocatoria: ticket.CodigoConvocatoria,
  //       Puntaje: ticket.Puntaje
  //     });
  //   }
  // }
  openModal(targetModal: NgbModal, modal: string) {  
    //evaluar  ,,reportes
    this.modalService.open(targetModal, {
      centered: true,
      //backdrop: 'static',
      size: 'xl',
    });
    //console.log('id_pregunta:', id);
    this.filterPreguntas = this.preguntaList;
    //this.filterPreguntas = this.preguntaList.filter(pregunta => pregunta.Prueba === id);
    //console.log('filterPreguntas: ', this.filterPreguntas);
    this.filterRespuestas = this.respuestaList;
    //console.log('respuestas: ', this.filterRespuestas);

    //this.filterRespuestas = this.respuestaList.filter(respuesta => respuesta.Pregunta === this.filterPreguntas.);
    return this.filterPruebas
  }

  onSubmit() {

    if (this.ticketDetail != null) {

      const index = this.ticketsList.indexOf(this.ticketDetail);

      this.ticketDetail.secuencia = this.editTicket?.get('Status')?.value;
      this.ticketDetail.nombrePersona = this.editTicket?.get('ticketTitle')?.value;
      this.ticketDetail.empleado = this.editTicket?.get('ticketDescription')?.value;
      this.ticketDetail.puntajeObtenido = this.editTicket?.get('AgentName')?.value;
      /*switch (this.ticketDetail.Status) {
        case 'Pending':
          this.ticketDetail.Label = 'warning';
          break;

        case 'Open':
          this.ticketDetail.Label = 'success';
          break;

        case 'Closed':
          this.ticketDetail.Label = 'danger';
          break;

        default:
      }*/
      this.ticketsList[index] = this.ticketDetail;
    } else {
      this.ticketDetail = new Evaluado();

      this.ticketDetail.secuencia = Math.max.apply(Math, this.ticketsList.map(function (o) { return o.secuencia; })) + 1;

      this.ticketDetail.secuencia = this.editTicket?.get('Status')?.value;
      this.ticketDetail.nombrePersona = this.editTicket?.get('ticketTitle')?.value;
      this.ticketDetail.evalConvocatoria = this.editTicket?.get('ticketDescription')?.value;
      this.ticketDetail.puntajeObtenido = this.editTicket?.get('AgentName')?.value;
      /*switch (this.ticketDetail.Status) {
        case 'Pending':
          this.ticketDetail.Label = 'warning';
          break;

        case 'Open':
          this.ticketDetail.Label = 'success';
          break;

        case 'Closed':
          this.ticketDetail.Label = 'danger';
          break;

        default:
      }*/
      this.ticketsList.push(this.ticketDetail);
    }
    this.modalService.dismissAll();
    this.ticketDate = '';
    this.ticketDetail = null;
    this.ngOnInit();
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    //this.ngOnInit();
  }

  deleteTicket(id: number): void {
    //debugger;
    this.filterTickets = this.filterTickets.filter(ticket => ticket.secuencia !== id);
    this.ticketsList = this.ticketsList.filter(ticket => ticket.secuencia !== id);

    if (this.evaluadoService) {
      //this.open = this.filterTickets.filter(x => x.evalConvocatoria === 1).length;
      /*this.pending = this.filterTickets.filter(x => x.Status === 'Pending').length;
      this.closed = this.filterTickets.filter(x => x.Status === 'Closed').length;*/
    }

    this.totalLengthOfCollection = this.filterTickets.length;
  }

  backText() {
    //console.log("backText()");
    document.getElementById("pagText").hidden = false;
    document.getElementById("pag").hidden = true;

  }
  cambioPag() {
    //console.log("pagePregunta: ", this.pagePregunta , " filterPreguntas: ", this.filterPreguntas.length);
    if (this.pagText <= this.filterPreguntas.length) {
      //console.log("cambioPag()");
      this.pagePregunta = this.pagText;
      //console.log("pagPregunta()", this.pagePregunta);
      //document.getElementById("pagText").hidden = true;
      //document.getElementById("pag").hidden = false;
      this.animacion();
    } else {
      this.pagePregunta = this.filterPreguntas.length
      this.pagText = this.pagePregunta;
      document.getElementById("pagText").hidden = true;
      document.getElementById("pag").hidden = false;
    }
  }
  seleccionRes(secIndagacion: number, secPregunta: number, secRespuesta: number) {
    //console.log('secIndagacion: ', secIndagacion, ' secPregunta: ', secPregunta, ' secRes: ', secRespuesta);
    for (let i = 0; i < this.respuestaSelec.length; i++) {
      if (secIndagacion == this.respuestaSelec[i]["indagacion"]) {
        //console.log('la indagación es igual');
        if (secPregunta == this.respuestaSelec[i]["secPregunta"]) {
          //console.log('la pregunta es igual');
          if (secRespuesta == this.respuestaSelec[i]["secRespuesta"]) {
            //console.log('no se actualio es la misma respuesta');
          } else {
            this.respuestaSelec[i]["secRespuesta"] = secRespuesta
            //console.log('se actualizo correctamente');
          }
        }
      }
    }
    this.convocatoriaService.setRespuesta(this.respuestaSelec);
    this.cambioPreg();
  }

  cambioPreg() {
    //console.log("pagePregunta: ", this.pagePregunta , " filterPreguntas: ", this.filterPreguntas.length);
    if (this.pagePregunta < this.filterPreguntas.length) {
      //console.log('pagePregunta', this.pagePregunta);
      this.pagePregunta = this.pagePregunta + 1;
      this.animacion();
    }
  }

  animacion() {
    this.cambio = this.cambio === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    //console.log('cambio; ' , this.cambio);    
    setTimeout(() => {
      this.cambio = this.cambio === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
      //console.log('cambio; ' , this.cambio);    
    }, 200);
  }

  animacionFormu() {
    //console.log('posConvos: ', this.posConvos , 'posEvaluados : ', this.posEvaluados, ' posPruebas: ' , this.posPruebas );    
    this.cambioFormu = this.cambioFormu === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    //console.log('posConvos: ', this.posConvos, 'posEvaluados : ', this.posEvaluados, ' posPruebas: ' , this.posPruebas);
    //console.log('cambioFormu; ' , this.cambioFormu);    
    setTimeout(() => {
      this.cambioFormu = this.cambioFormu === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
      //console.log('cambioFormu; ' , this.cambioFormu);
    }, 250);
  }
  cambioEstado(){
    this.cambioFormu = this.cambioFormu === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    //console.log('cambioFormu; ' , this.cambioFormu);    
  }

  animacionBackFormu() {
    this.cambioBackFormu = this.cambioBackFormu === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
    //console.log('cambioBackFormu; ' , this.cambioBackFormu);    
    setTimeout(() => {
      this.cambioBackFormu = this.cambioBackFormu === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
      //console.log('cambioBackFormu; ' , this.cambioBackFormu);
    }, 200);
  }

  enviarResp() {
    //console.log('Se envio la respuesta');
    let respuesta = [];
    respuesta = this.respuestaSelec.filter(x => x['indagacion'] === this.secIndagacion);
    //console.log('respuesta:' , respuesta);
    //EVIAR POR WEB SERVICE
    let estado = [];
    for (let i = 0; i < respuesta.length; i++) {
      this.respuestaService.insertRespuesta(
        this.usuarioService.usuario,
        respuesta[i]['indagacion'],
        respuesta[i]['secPregunta'],
        respuesta[i]['secRespuesta'],
        this.usuarioService.empresa,
        this.usuarioService.cadenaConexion
      ).subscribe(
        data => {
          estado.push(data);
        }
      );
    }
  }
  next(){
    if (this.pagePregunta < this.filterPreguntas.length) {
      this.pagePregunta += 1;
      //this.pagText = 0;
      document.getElementById("pagText").hidden = true;
      document.getElementById("pag").hidden = false;
      this.animacion();
    }
  }

  previous(){
    if (this.pagePregunta > 1) {
      this.pagePregunta -= 1;
      //this.pagText = 0;
      document.getElementById("pagText").hidden = true;
      document.getElementById("pag").hidden = false;
      this.animacion();
    }
  }

  scroll(el){
    //console.log(el);
    const element = document.getElementById('pruebas-1')
    element.scrollIntoView({ behavior: 'smooth'});
  }

  previusScreen(){
    this.animacionBackFormu();
    if (this.posPruebas == 1) {
      this.posConvos = 0;this.posEvaluados = 1;this.posPruebas = 0;      
    } else if (this.posEvaluados == 1) {
      this.posConvos = 1;this.posEvaluados = 0;this.posPruebas = 0;      
    }
  }

  
  /*filterByStatus(type: number) {
    //console.log('type', type);
    this.filterPruebas = [];
    this.filterTickets = this.ticketsList;
    this._searchTerm = '';
    this.filterTickets = this.filterTickets.filter(ticket => ticket.evalConvocatoria === type);
    this.EvaluadosList = this.filterTickets;
    return this.filterTickets;
  }*/

  /*filterByEmpleado(codigo: number) {
    this.filterPruebas = this.pruebaList;
    this.filterPruebas = this.pruebaList.filter(prueba => prueba.evalResultadoConv === codigo);
    this.totalLengthOfCollection = this.pruebaList.length;
    return this.filterPruebas;
    //}

  }*/
}
