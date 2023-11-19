import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuditoriaService{
  url = environment.apiUrl;
  baseApiUrl = 'http://localhost:8080/upload/';

  constructor(private httpClient: HttpClient) { }

  getData(cpf: Number){
    return this.httpClient.get(this.url + "/auditoria/"+cpf, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }

  get() {
    return this.httpClient.get(this.url + "/auditoria/get")
  }

  upload(cpf: Number, file: any):Observable<any> {
  
    // Create form data
    const formData = new FormData();
      
    // Store form name as "file" with file data
    formData.append("uploadFile", file);

    // Make http post request over api
    // with formData as req
    return this.httpClient.post(this.baseApiUrl+cpf, formData)
  }

  getAuditoria(cpf: Number){
    return this.httpClient.get(this.url + "/auditoria/upload/audit/"+cpf, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    })
  }
}