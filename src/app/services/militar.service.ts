import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MilitarService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data: any) {
    return this.httpClient.post(this.url + "/militar/add/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  update(data: any) {
    return this.httpClient.patch(this.url + "/militar/update/", data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  getMilitares() {
    return this.httpClient.get(this.url + "/militar/get/");
  }


  delete(cpf: any) {
    return this.httpClient.delete(this.url + "/militar/delete/"+cpf, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }
}
