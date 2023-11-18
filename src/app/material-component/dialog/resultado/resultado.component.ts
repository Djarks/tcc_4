import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.scss']
})
export class ResultadoComponent implements OnInit {
  onAuditMilitar = new EventEmitter();
  resultadoForm: any = FormGroup;
  dialogAction: any = "Auditar";
  action: any = "Auditar";
  responseMessage: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private auditoriaService: AuditoriaService,
  public dialogRef: MatDialogRef<ResultadoComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.resultadoForm = this.formBuilder.group({
      cpf:[null,[Validators.required]],
      maior_porcentagem:[null,[Validators.required]],
      adic_hab:[null,[Validators.required]]
      })

    if(this.dialogData.action === 'Auditar'){
      this.dialogAction = "Auditar";
      this.action = "Auditar";
      this.resultadoForm.patchValue(this.dialogData.data);
    }
    this.get()
  }
  
  get(){
    var formData = this.resultadoForm.value;
    var data = {
      cpf:formData.cpf,
      maior_porcentagem:formData.maior_porcentagem,
      adic_hab:formData.adic_hab
    }
    this.auditoriaService.getAuditoria(data.cpf).subscribe((response: any)=>{
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

