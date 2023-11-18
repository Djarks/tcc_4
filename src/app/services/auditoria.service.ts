import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface AuditoriaData{
  postoGrad: string,
  nomeCompl: string,
  cpf: number,
  curso: string,
  modalidade: string,
  beneficio: string,
  porcentagem: number
}

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {
  url = environment.apiUrl;
  baseApiUrl = 'http://localhost:8080/upload';

  constructor(private httpClient: HttpClient) { }

  getData(cpf: number){
    return this.httpClient.get(this.url + "/auditoria/"+cpf, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  upload(file: any):Observable<any> {
  
    // Create form data
    const formData = new FormData();
      
    // Store form name as "file" with file data
    formData.append("uploadFile", file);

    // Make http post request over api
    // with formData as req
    return this.httpClient.post(this.baseApiUrl, formData)
  }

  getAuditoria(cpf: number){
    return this.httpClient.get(this.url + "/auditoria/upload/audit/"+cpf, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}