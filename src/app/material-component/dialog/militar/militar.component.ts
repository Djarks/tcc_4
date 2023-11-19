import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MilitarService } from 'src/app/services/militar.service';
/*import { OmService } from 'src/app/services/om.service';*/
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-militar',
  templateUrl: './militar.component.html',
  styleUrls: ['./militar.component.scss']
})
export class MilitarComponent implements OnInit {
  onAddMilitar = new EventEmitter();
  onEditMilitar = new EventEmitter();
  militarForm: any = FormGroup;
  dialogAction: any = "Adicionar";
  action: any = "Adicionar";
  responseMessage: any;
  //om: any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private militarService: MilitarService,
  public dialogRef: MatDialogRef<MilitarComponent>,
  /*private omService: OmService,*/
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.militarForm = this.formBuilder.group({
      cpf:[null,[Validators.required]],
      nome_compl:[null,[Validators.required]],
      nome_guerra:[null,[Validators.required]],
      data_nasc:[null,[Validators.required]],
      sexo:[null,[Validators.required]],
      situacao:[null,[Validators.required]],
      data_praca:[null,[Validators.required]],
      qas:[null,[Validators.required]],
      tipo:[null,[Validators.required]],
      ev:[null,[Validators.required]],
      preccp:[null,[Validators.required]],
      om:[null,[Validators.required]],
      cod_posto_grad:[null,[Validators.required]],
      data_ult_prom:[null,[Validators.required]]
    })

    if(this.dialogData.action === 'Editar'){
      this.dialogAction = "Editar";
      this.action = "Atualizar";
      this.militarForm.patchValue(this.dialogData.data);
    }

    /*this.getOm();*/
  }
/*
  getOm(){
    this.omService.getOm().subscribe((response: any)=>{
      this.om = response;
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
*/
  handleSubmit(){
    if(this.dialogAction === 'Editar'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.militarForm.value;
    var data = {
      cpf:formData.cpf,
      nome_compl:formData.nome_compl,
      nome_guerra:formData.nome_guerra,
      data_nasc:formData.data_nasc,
      sexo:formData.sexo,
      situacao:formData.situacao,
      data_praca:formData.data_praca,
      qas:formData.qas,
      tipo:formData.tipo,
      ev:formData.ev,
      preccp:formData.preccp,
      om:formData.om,
      cod_posto_grad:formData.cod_posto_grad,
      data_ult_prom:formData.data_ult_prom
    }
    this.militarService.add(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddMilitar.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Militar adicionado com sucesso");
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

  edit(){    
    var formData = this.militarForm.value;
    var data = {
      cpf:formData.cpf,
      nome_compl:formData.nome_compl,
      nome_guerra:formData.nome_guerra,
      data_nasc:formData.data_nasc,
      sexo:formData.sexo,
      situacao:formData.situacao,
      data_praca:formData.data_praca,
      qas:formData.qas,
      tipo:formData.tipo,
      ev:formData.ev,
      preccp:formData.preccp,
      om:formData.om,
      cod_posto_grad:formData.cod_posto_grad,
      data_ult_prom:formData.data_ult_prom
    }
    this.militarService.update(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditMilitar.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Militar atualizado com sucesso");
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

