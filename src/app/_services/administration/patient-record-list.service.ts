import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';
import { showErrorMessage, APIPaths, showInfoMessage } from 'src/app/_common';
import { Table } from 'src/app/interfaces/ITable';

@Injectable({
  providedIn: 'root'
})
export class PatientRecordListService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getAllPatientRecordList(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllPatientRecordListWithDoc,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetPatientDetailForPdf(model : any)
  {
    //let params = new HttpParams().set('Id', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showInfoMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.GetPatientDetailForPdf, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
