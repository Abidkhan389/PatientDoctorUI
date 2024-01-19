import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Table } from 'src/app/interfaces/ITable';
import { APIPaths, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicineTypeService extends ApiService {

  constructor(public httpClient: HttpClient) { 
    super(httpClient)
  }
  getAllMedicineType(model:Table){
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllMedicineType,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateMedicineTypeStatus(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateMedicinetype, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditMedicineType(model: any) {
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
    return this.service(this.post(APIPaths.addEditMedicineType, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getMedicineTypeById(Id: any) {
    let params = new HttpParams().set('MedicineTypeId', Id);
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getMedicineTypeById, params)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
