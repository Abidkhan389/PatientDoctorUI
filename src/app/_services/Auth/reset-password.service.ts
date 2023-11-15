import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { APIPaths } from 'src/app/_common';
import { showInfoMessage, showSuccessMessage } from 'src/app/_common/messages';
import { IResetPassword } from 'src/app/interfaces/auth/IResetPassword';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends ApiService{

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  } 
  ResetPassword(resetPassword:IResetPassword) {
    let onSuccess = (value) => {
      let data = value;
      if (data.success) {
        showSuccessMessage("Password Update Successfully")
      } else if(!data.success) {
        showInfoMessage(data.message)
        return data;
      }
    };
    return this.service(this.post(APIPaths.ResetPassword,resetPassword)).pipe(
      map(value => this.processPayload(value)),
      map(onSuccess)
    );
  }
}
