import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Table } from 'src/app/interfaces/ITable';
import { APIPaths, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReceptionistService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }
  getAllPatient(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllPatient,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
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
  updatePatientStatus(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updatePatient, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditPatient(model: any) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        showSuccessMessage(data.message)
        return true;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.addEditPatient, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  GetPatientById(Id: any) {
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
    return this.service(this.get(APIPaths.getPatientById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
