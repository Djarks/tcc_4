import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageMilitarComponent } from './manage-militar/manage-militar.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';

export const MaterialRoutes: Routes = [
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'militar',
        component: ManageMilitarComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    },
    {
        path: 'auditoria/:cpf',
        component: AuditoriaComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin', 'user']
        }
    }
];
