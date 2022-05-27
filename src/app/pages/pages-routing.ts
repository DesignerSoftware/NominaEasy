import { RouterModule, Routes } from '@angular/router';

import { ConvocatoriaComponent } from './convocatoria/convocatoria.component';
import { HojaVidaComponent } from './hoja-vida/hoja-vida.component';
import { LaboralComponent } from './laboral/laboral.component';

export const PagesRutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'convocatoria',
        component: ConvocatoriaComponent,
        data: {
          title: 'Convocatorias',
          urls: [
            //{ title: 'Dashboard', url: '/dashboard' },
            //{ title: 'Basic Menu' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'personal/laboral',
        component: LaboralComponent,
        data: {
          title: 'Laboral',
          urls: [
            //{ title: 'Dashboard', url: '/dashboard' },
            //{ title: 'Basic Menu' }
          ]
        }
      }
    ]
  },
  {
    path: '',
    children: [
      {
        path: 'personal/hojaVida',
        component: HojaVidaComponent,
        data: {
          title: 'hojaVida',
          urls: [
            //{ title: 'Dashboard', url: '/dashboard' },
            //{ title: 'Basic Menu' }
          ]
        }
      }
    ]
  }
];
