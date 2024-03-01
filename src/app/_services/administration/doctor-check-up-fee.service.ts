import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Table } from 'src/app/interfaces/ITable';
import { APIPaths, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorCheckUpFeeService extends ApiService {

  constructor(public httpClient: HttpClient) { 
    super(httpClient)
  }
  getAllDoctorCheckUpFee(model:Table){
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllDoctorCheckUpFee,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateDoctorCheckUpFeeStatus(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateDoctorCheckUpFee, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditDoctorCheckUpFee(model: any) {
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
    return this.service(this.post(APIPaths.addEditDoctorCheckUpFee, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getDoctorCheckUpFeeById(model: any) {
    //let params = new HttpParams().set('MedicineTypeId', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getDoctorCheckUpFeeById, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
