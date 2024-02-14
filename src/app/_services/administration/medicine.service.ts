import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIPaths, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { Table } from 'src/app/interfaces/ITable';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineService extends ApiService{
 
 
  constructor(public httpClient: HttpClient) { 
    super(httpClient)
  }
  getAllMedicine(model:Table){
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0)
      {
        return data.data;
      }
      else
      {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllMedicine,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateMedicineStatus(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateMedicine, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditMedicine(model: any) {
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
    return this.service(this.post(APIPaths.addEditMedicine, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getMedicineById(model: any) {
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
    return this.service(this.post(APIPaths.getMedicineById, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
