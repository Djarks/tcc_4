import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MilitarComponent } from '../dialog/militar/militar.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { AuditoriaService } from 'src/app/services/auditoria.service';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
  //providers: [AuditoriaService]
})
export class AuditoriaComponent implements OnInit{
  displayedColumns: string[] = ['postoGrad', 'nomeCompl', 'cpf', 'curso', 'modalidade', 'beneficio', 'porcentagem', 'audit'];
  dataSource: any;
  responseMessage: any;

  constructor(private auditoriaService: AuditoriaService,
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
    this.auditoriaService.get().subscribe((response: any)=>{
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

  handleAuditAction(cpf: number){
    console.log(cpf);
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

  auditarMilitar(cpf: number){
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
}



/*
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { AuditoriaService } from 'src/app/services/auditoria.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.scss']
  //providers: [AuditoriaService] TENTEI ADICIONAR ESSE PROVIDER, NÃO DEU CERTO
})
export class AuditoriaComponent implements OnInit{
  displayedColumns: string[] = ['postoGrad', 'nomeCompl', 'cpf', 'curso', 'modalidade', 'beneficio', 'porcentagem'];
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
	  private dialog: MatDialog,
    private snackbarService: SnackbarService,
	  private router: Router,
	  private matDialogConfig: MatDialogConfig,
	  private activatedRoute: ActivatedRoute){
  }

  ngOnInit(): void {
    this.ngxService.start();
	  this.get();
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  get(){
    this.auditoriaService.get();
  }

  getData(cpf: Number){
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

	onUpload() {
		this.loading = !this.loading;
		console.log(this.file);
		this.auditoriaService.upload(this.file).subscribe(
			(event: any) => {
				if (typeof (event) === 'object') {
					// Short link via api response
					this.shortLink = event.link;
					this.loading = false; // Flag variable 
				};
			}
		);
		/*fetch("http://localhost:8080/upload/audit/5513291657")
		.then(res => {
		  return res.json()
		});
		this.fileName = "Arquivo carregado com sucesso.";
		//btnUpload?.addEventListener("click", () =>{

		//})
    }
    handleAuditAction(cpf: Number) {
      console.log(cpf);
	}
}*/