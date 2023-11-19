import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MilitarService } from 'src/app/services/militar.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MilitarComponent } from '../dialog/militar/militar.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.scss']
})
export class AuditarComponent implements OnInit{
  displayedColumns: string[] = ['abrev', 'qas', 'nome_compl', 'cpf', 'sigla', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private militarService: MilitarService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router){

  }

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData(){
    this.militarService.getMilitares().subscribe((response: any)=>{
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
    }, (error: any)=>{
      this.ngxService.stop();
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Adicionar'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(MilitarComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddMilitar.subscribe((response)=>{
      this.tableData();
    })
  }

  handleEditAction(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Editar',
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(MilitarComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditMilitar.subscribe((response)=>{
      this.tableData();
    })
  }

  handleDeleteAction(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message: 'excluir o militar '+values.abrev+' '+values.nome_compl
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response)=>{
      this.ngxService.start();
      this.deleteMilitar(values.cpf);
      dialogRef.close();
    })
  }

  deleteMilitar(cpf: number){
    this.militarService.delete(cpf).subscribe((response: any)=>{
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "Militar excluído com sucesso.")
    }, (error: any)=>{
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error)
    })
  }
}

