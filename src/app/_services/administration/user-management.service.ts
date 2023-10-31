import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ICourse } from 'src/app/interfaces/Courses/ICourse';
import { Table } from 'src/app/interfaces/ITable';
import { APIPaths } from 'src/app/_common/constant';
import { showErrorMessage, showSuccessMessage } from 'src/app/_common/messages';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends ApiService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  } 
  getAllUsers(model:Table) {
    let onSuccess = (value) => {
      let data = value;
      if (data.totalCount != 0) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.post(APIPaths.getAllUsers,model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  getAllRoles() {
    let onSuccess = (value) => {
      let data = value;
      if (data) {
        return data.data;
      } else {
        showErrorMessage(data.message)
        return false;
      }
    };
    return this.service(this.get(APIPaths.getAllRoles)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  updateUserStatus(model: any) {
    let onSuccess = (value) => {
      let data = value;
      return data
    };
    return this.service(this.post(APIPaths.updateUser, model)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
  addEditUser(model: any) {
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
    return this.service(this.post(APIPaths.addEditUSer, model)).pipe(
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

