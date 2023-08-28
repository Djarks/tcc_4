import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  onAddUser = new EventEmitter();
  onEditUser = new EventEmitter();
  userForm: any = FormGroup;
  dialogAction: any = "Adicionar";
  action: any = "Adicionar";
  responseMessage: any;
  
  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private userService: UserService,
  public dialogRef: MatDialogRef<UserComponent>,
  private snackbarService: SnackbarService){ }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: [null,[Validators.required]],
      name: [null,[Validators.required]],
      contactNumber: [null,[Validators.required]],
      email: [null,[Validators.required]],
      status: [null,[Validators.required]],
      role: [null,[Validators.required]]
    });
    if(this.dialogData.action === 'Editar'){
      this.dialogAction = "Editar";
      this.action = "Atualizar";
      this.userForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === 'Editar'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.userForm.value;
    var data = {
      id: formData.id,
      name: formData.name,
      contactNumber: formData.contactNumber,
      email: formData.email,
      status: formData.status,
      role: formData.role
    }
    this.userService.add(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onAddUser.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Usuário adicionado com sucesso.");
    }, (error: any)=>{
      this.dialogRef.close();
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
    var formData = this.userForm.value;
    var data = {
      id: formData.id,
      name: formData.name,
      contactNumber: formData.contactNumber,
      email: formData.email,
      status: formData.status,
      role: formData.role
    }
    this.userService.update(data).subscribe((response: any)=>{
      this.dialogRef.close();
      this.onEditUser.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Usuário alterado com sucesso.");
    }, (error: any)=>{
      this.dialogRef.close();
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