import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2';

import { CadenasevaluacionesappService } from 'src/app/services/cadenasevalapp.service';
import { LoginService } from 'src/app/services/login.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validaParametroGrupo = null;
  cadenasApp: any;
  formulario: FormGroup;

  inputFg: FormGroup;
  searchText: string | null = null;

  empresas;
  grupoEmpresarial = null;
  urlKiosco = "https://www.designer:8179/#/login/GrupoEmpresarial1";

  constructor(
    public fb: FormBuilder,
    public loginService: LoginService,
    public usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cadenasEval: CadenasevaluacionesappService,
    private http: HttpClient
  ) {
    //console.log('constructor login');
    this.cadenasApp = null;
    //console.log('usuario logueado', usuarioService.getUserLoggedIn());
    this.urlKiosco = usuarioService.getDominio();
    //this.infoInicio();
  }

  ngOnInit() {
    this.crearFormulario();

  }

  crearFormulario() {
    //console.log('crearFormulario()');
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required],
      //empresa: [, Validators.required]
    });

    this.inputFg = this.fb.group({
      mess: []
  });
  }


  navigate() {
    //this.router.navigate(['/home']);
    this.router.navigate(['/inicio']);
  }

  loginform = true;
  recoverform = false;

  showRecoverForm() {
    this.loginform = !this.loginform;
    this.recoverform = !this.recoverform;
  }
  
  enviar() {
    //console.log("Ingrese");
    this.navigate();
    // console.log(this.formulario);
    //this.urlKiosco = document.location.href;
    // Object.values(this.formulario.controls).forEach(control => {
    //   control.markAsTouched();
    // });
    // if (this.formulario.valid) {
    //   this.usuarioService.validarIngresoKioscoSeudonimo(this.formulario.get('usuario').value.trim().toLowerCase(),
    //     this.formulario.get('clave').value,this.formulario.get('empresa').value, this.usuarioService.cadenaConexion)
    //     .subscribe(
    //       data => {
    //         //console.log(data);
    //         //console.log('correo1:' , data['Correo']);
    //         let correoTemp = data['Correo'];
    //         if (data['ingresoExitoso']) {
    //           //console.log('ingresoExitoso: ' + data['ingresoExitoso']);
    //           this.loginService.generarToken(this.formulario.get('usuario').value.toLowerCase(),
    //             this.formulario.get('clave').value, this.formulario.get('empresa').value, this.usuarioService.cadenaConexion, this.usuarioService.grupoEmpresarial)
    //             .subscribe(
    //               res => {
    //                 //console.log('Respuesta token generado: ', res);
    //                 let jwt: any = JSON.parse(JSON.stringify(res));
    //                 //console.log('JWT Generado: ' + jwt['JWT']);
    //                 if (!res) {
    //                   swal.fire('Objeto Vacio!!!', ' :(', 'success');
    //                 } else {
    //                   let timerInterval;
    //                   swal.fire({
    //                     title: 'Bienvenido...',
    //                     html: 'Espere un momento mientras lo redireccionamos a la página de inicio',
    //                     backdrop: 'RGB(3,58,100)',
    //                     timer: 2000,
    //                     timerProgressBar: true,
    //                     onBeforeOpen: () => {
    //                       swal.showLoading();
    //                       timerInterval = setInterval(() => {
    //                         /*swal.getContent().querySelector('b')
    //                           .textContent = swal.getTimerLeft()*/
    //                       }, 100);
    //                     },
    //                     onClose: () => {
    //                       clearInterval(timerInterval);
    //                     }
    //                   }).then((result) => {
    //                     if (
    //                       /* Read more about handling dismissals below */
    //                       result.dismiss === swal.DismissReason.timer
    //                     ) {
    //                       // al cerrarse la ventana modal:
    //                       this.navigate();
    //                       // sesion guardará el arreglo que se guardará en el localStorage
    //                       const cadenaEmpresa = this.cadenasApp.filter( // consultar empresa seleccionada
    //                         //(opcKio) => opcKio['NITEMPRESA'] === this.formulario.get('empresa').value
    //                         (opcKio) => opcKio[2] === this.formulario.get('empresa').value
    //                       );
    //                       //console.log('empresa seleccionada', cadenaEmpresa);
    //                       const sesion: any = {
    //                         usuario: this.formulario.get('usuario').value.toLowerCase().trim(),
    //                         JWT: jwt['JWT'],
    //                         empresa: this.formulario.get('empresa').value,
    //                         grupo: this.grupoEmpresarial,
    //                         // cadena: cadenaEmpresa['CADENA']
    //                         cadena: cadenaEmpresa[4],
    //                         //urlKiosco: document.location.href//this.urlKiosko()//
    //                         urlKiosco: this.urlKiosco//this.urlKiosko()//
    //                       };
    //                       //console.log('cadena: ', cadenaEmpresa[4]);
    //                       this.usuarioService.setUserLoggedIn(sesion);
    //                       this.usuarioService.getUserLoggedIn(); // Mostrar por consola los datos del usuario actual

    //                     }
    //                   });
    //                 }
    //               },
    //               error => {
    //                 //console.log('Error: ' + JSON.stringify(error.statusText));
    //                 swal.fire({
    //                   icon: 'error',
    //                   title: '¡Se ha presentado un error!',
    //                   text: 'Error de conexión. Por favor intentélo de nuevo más tarde. Error: cod ' +
    //                     error.status + ' :' + error.statusText
    //                 });
    //               },
    //               () => this.navigate()
    //             );
    //         } else if (data['EstadoUsuario'] == 'P' && data['primerIngreso']) {
    //           swal.fire({
    //             icon: 'error',
    //             title: '¡Cambio de correo!',
    //             /*'¡Usuario o contraseña incorrectos!',*/
    //             text: `${data['mensaje']}`,
    //             showCancelButton: true,
    //             cancelButtonText: 'Ok',
    //             confirmButtonText: `Reenviar`
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               this.enviarCorreoConfirmaCuenta(this.usuarioService.usuario);
    //             }
    //           });
    //         } else if (data['EstadoUsuario'] == 'P' && data['ValidaEmail']) {
    //           swal.fire({
    //             icon: 'error',
    //             title: '¡Valida correo nuevo!',
    //             /*'¡Usuario o contraseña incorrectos!',*/
    //             text: `${data['mensaje']}`,
    //             showCancelButton: true,
    //             cancelButtonText: 'Ok',
    //             confirmButtonText: `Reenviar`
    //           }).then((result) => {
    //             if (result.isConfirmed) {
    //               this.enviarCorreoConfirmaCuenta(correoTemp);
    //             }
    //           });
    //         } else {
    //           swal.fire({
    //             icon: 'error',
    //             // title: '¡Usuario o contraseña incorrectos!',
    //             /*'¡Usuario o contraseña incorrectos!',*/
    //             title: `${data['mensaje']}`
    //             /*'error'*/
    //           });
    //         }

    //       },
    //       error => {
    //         swal.fire(
    //           '¡Se ha presentado un error de conexión!',
    //           'Por favor inténtelo de nuevo más tarde.',
    //           'error'
    //         );
    //       }
    //     );

    // }
  }

  enviarCorreoConfirmaCuenta(seudonimo: string) {
    //console.log('enviarCorreoConfirmación');
    //console.log('correo:' , seudonimo);
    
    swal.fire({
      title: 'Espera un momento.. Estamos enviándote el correo de confirmación',
      onBeforeOpen: () => {
        swal.showLoading();
        this.usuarioService.inactivaTokensTipo('VALIDACUENTA', seudonimo, this.formulario.get('empresa').value, this.usuarioService.cadenaConexion)
          .subscribe(
            data => {
              // console.log(data);
              
              this.loginService.enviarCorreoConfirmaCuenta(
                seudonimo,
                this.formulario.get('clave').value,
                //this.formulario.get('empresa').value, 'www.nominadesigner.co')
                this.formulario.get('empresa').value, this.usuarioService.cadenaConexion, this.usuarioService.grupoEmpresarial, this.urlKiosco
              )
                .subscribe(
                  data2 => {
                    if (data2['envioCorreo'] === true) {
                      //console.log('Por favor verifica tu cuenta de correo');
                      swal.fire({
                        icon: 'success',
                        title: '¡Revisa tu correo!',
                        text: 'Se te ha enviado un nuevo correo ' +
                          ' para que valides tu cuenta. Recuerda que tienes una hora para validarla, de lo contrario ' +
                          'deberas solicitar la generación de un nuevo correo.',
                        showConfirmButton: true
                      }).then((result) => {
                        if (result.value) {
                          // document.location.href = './login';
                          //this.router.navigate(['/login']);
                          //this.router.navigate(['/']);
                          if (this.usuarioService.grupoEmpresarial != null) {
                            this.router.navigate(['/login', this.usuarioService.grupoEmpresarial]);
                            //this.router.navigate(['/']);
                          } else {
                            this.router.navigate(['/login']);
                          }
                        }
                      });
                    } else {
                      swal.fire({
                        icon: 'error',
                        title: 'Se ha presentado un error al enviarte el correo de confirmación.',
                        text: '¡No fue posible enviarte el correo para confirmar tu cuenta, por favor intenta iniciar sesión ' +
                          'y haz clic en la opción para enviarte nuevamente el correo.',
                        showConfirmButton: true
                      }).then((result) => {
                        if (result.value) {
                          // document.location.href = './login';
                          //this.navigate(); 210603
                          if (this.usuarioService.grupoEmpresarial != null) {
                            this.router.navigate(['/login', this.usuarioService.grupoEmpresarial]);
                            //this.router.navigate(['/']);
                          } else {
                            this.router.navigate(['/login']);
                          }
                        }
                      });
                    }
                  },
                  (error) => {
                    swal.fire({
                      icon: 'error',
                      title: 'Se ha presentado un error al enviarte el correo de confirmación.',
                      text: '¡No fue posible enviarte el correo para confirmar tu cuenta, por favor intenta iniciar sesión y haz clic en la opción ' +
                        'para enviarte nuevamente el correo.',
                      showConfirmButton: true
                    });
                  }
                );
            }
          )
      },
      allowOutsideClick: () => !swal.isLoading()
    });
  }

  prueba(valor: any){
    console.log('valor:' , valor);
    

  }

}

