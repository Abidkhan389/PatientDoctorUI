import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Table } from 'src/app/interfaces/ITable';
import { APIPaths, showErrorMessage } from 'src/app/_common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppoitmentsService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getAllTodeyPatientAppoitments(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllTodeyPatientAppoitments,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetPatientDescription(Id: any) {
    let params = new HttpParams().set('PatientId', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getPatientDescriptionById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
