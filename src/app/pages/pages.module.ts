import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { PagesRutes } from './pages-routing';
import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { LaboralComponent } from './laboral/laboral.component';
import { HojaVidaComponent } from './hoja-vida/hoja-vida.component';

@NgModule({
  imports: [
    RouterModule.forChild(PagesRutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  declarations: [ 
    ConvocatoriaComponent, 
    LaboralComponent,
    HojaVidaComponent,
  ],
  providers: [
  ]
})
export class PagesModule { }
