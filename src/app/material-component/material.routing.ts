import { Routes } from '@angular/router';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageMilitarComponent } from './manage-militar/manage-militar.component';
import { AuditarComponent } from './auditar/auditar.component';
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
        path: 'auditoria',
        component: AuditarComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin', 'user']
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
