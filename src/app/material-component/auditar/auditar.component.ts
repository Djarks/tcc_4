import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuditarMilitarComponent } from '../dialog/auditar-militar/auditar-militar.component';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.scss']
})

export class AuditarComponent implements OnInit{
  displayedColumns: string[] = ['postoGrad', 'nomeCompl', 'cpf', 'curso', 'modalidade', 'beneficio', 'porcentagem', 'audit'];
  dataSource: any;
  responseMessage: any;
  public get cpfAuditado(){
	  return Number(this.activatedRoute.snapshot.paramMap.get('cpf'));
  }
  requiredFileType: string = '';
  data: any;
  fileName = '';
  shortLink: string = "";
  loading: boolean = false; // Flag variable
  file: File | any = null;

  constructor(private auditoriaService: AuditoriaService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
	  private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router){
  }

  ngOnInit(): void {
    this.ngxService.start();
	  this.getData(this.cpfAuditado);
    this.tableData(this.cpfAuditado);
  }

  getData(cpf: number){
	  this.auditoriaService.getData(cpf);
  }

  tableData(cpf: Number){
    this.auditoriaService.getData(cpf).subscribe((response: any)=>{
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

	onChange(event: any) {
		this.file = event.target.files[0];
		this.fileName = this.file.name;
	}

	onUpload(cpf: Number) {
		this.loading = !this.loading;
		console.log(this.file);
		this.auditoriaService.upload(cpf, this.file).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {
					this.shortLink = event.link;
					this.loading = false;
				};
			}
		);		
    this.fileName = "Arquivo carregado com sucesso.";
    /*fetch("http://localhost:8080/upload/audit/"+this.cpfAuditado)
		.then(res => {
		  return res.json()
		});*/
  }

  handleAuditAction(values: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Auditar',
      data: values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(AuditarMilitarComponent, dialogConfig);
    this.router.events.subscribe(()=>{
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAuditMilitar.subscribe((response)=>{
      this.tableData(this.cpfAuditado);
    })
  }
}