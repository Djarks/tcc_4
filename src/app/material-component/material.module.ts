import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserComponent } from './dialog/user/user.component';
import { ManageMilitarComponent } from './manage-militar/manage-militar.component';
import { MilitarComponent } from './dialog/militar/militar.component';
import { AuditoriaComponent } from './auditoria/auditoria.component';
import { ResultadoComponent } from './dialog/resultado/resultado.component';
import { AuditarMilitarComponent } from './dialog/auditar-militar/auditar-militar.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [],
  declarations: [
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageUserComponent,
    UserComponent,
    ManageMilitarComponent,
    MilitarComponent,
    AuditoriaComponent,
    ResultadoComponent,
    AuditarMilitarComponent
  ]
})
export class MaterialComponentsModule {}
