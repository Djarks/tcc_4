import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-militar',
  templateUrl: './auditar-militar.component.html',
  styleUrls: ['./auditar-militar.component.scss']
})
export class AuditarMilitarComponent implements OnInit {
  onAuditMilitar = new EventEmitter();
  displayedColumns: string[] = ['cpf', 'maior_porcentagem', 'adic_hab'];
  dataSource: any;
  dialogAction: any = "Auditar";
  action: any = "Auditar";
  responseMessage: any;
  public get cpfAuditado(){
	  return Number(this.activatedRoute.snapshot.paramMap.get('cpf'));
  }

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private activatedRoute: ActivatedRoute,
  private auditoriaService: AuditoriaService,
  public dialogRef: MatDialogRef<AuditarMilitarComponent>,
  private snackbarService: SnackbarService){}

  ngOnInit(): void {
    this.get(5513291657);
  }

  get(cpf: Number){ 
    console.log(cpf);
    this.auditoriaService.getAuditoria(cpf).subscribe((response: any)=>{
      this.dataSource = new MatTableDataSource(response);
    }, (error: any)=>{
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
}



