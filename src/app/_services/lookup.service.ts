import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIPaths } from '../_common/constant';
import { showErrorMessage, showInfoMessage } from '../_common/messages';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LookupService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getAllDoctors() {
    let onSuccess = (value) => {
      let data = value;
      if (data) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getAllDoctors)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetUserById(Id: any) {
    let params = new HttpParams().set('UserId', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getUserById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
