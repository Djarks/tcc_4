import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-militar',
  templateUrl: './auditar-militar.component.html',
  styleUrls: ['./auditar-militar.component.scss']
})
export class AuditarMilitarComponent implements OnInit {
  onAuditMilitar = new EventEmitter();
  onEditMilitar = new EventEmitter();
  auditoriaForm: any = FormGroup;
  dialogAction: any = "Auditar";
  action: any = "Auditar";
  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private auditoriaService: AuditoriaService,
  public dialogRef: MatDialogRef<AuditarMilitarComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.auditoriaForm = this.formBuilder.group({
      cpf:[null,[Validators.required]],
      maior_porcentagem:[null,[Validators.required]],
      adic_hab:[null,[Validators.required]]
    });
    this.get();
  }

  get(){
    var formData = this.auditoriaForm.value;
    var dialogData = {
      cpf:formData.cpf,
      maior_porcentagem:formData.maior_porcentagem,
      adic_hab:formData.adic_hab,
      }
    this.auditoriaService.getAuditoria(dialogData.cpf).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAuditMilitar.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Militar auditado com sucesso");
    }, (error: any)=>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
}
}



