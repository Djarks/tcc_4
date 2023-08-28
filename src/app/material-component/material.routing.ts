import { Routes } from '@angular/router';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RouteGuardService } from '../services/route-guard.service';


export const MaterialRoutes: Routes = [
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],
        data:{
            expectedRole: ['admin']
        }
    }
];
