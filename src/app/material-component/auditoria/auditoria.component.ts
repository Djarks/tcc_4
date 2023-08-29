import { Component, AfterViewInit } from '@angular/core';
import { AuditoriaService } from '../../services/auditoria.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
	selector: 'app-auditoria',
	templateUrl: './auditoria.component.html',
	styleUrls: ['./auditoria.component.scss']
})
export class AuditoriaComponent implements AfterViewInit {
	responseMessage: any;
	data: any;

	ngAfterViewInit() { }

	constructor(private auditoriaService:AuditoriaService,
		private ngxService: NgxUiLoaderService,
		private snackbarService: SnackbarService) {
			this.ngxService.start();
			this.auditoriaData();
	}
	
	auditoriaData(){
		this.auditoriaService.getDetails().subscribe((response:any)=>{
			this.ngxService.stop();
			this.data = response;
		}, (error:any)=>{
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