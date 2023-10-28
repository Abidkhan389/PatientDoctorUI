import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { UserManagementService } from 'src/app/_services/administration/user-management.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {

  isreadOnly: boolean = false;
  UserForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  userList: any;
  RolesList: any;
  constructor(public userManagementService: UserManagementService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditUserComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllRoles();
  }
  ngOnInit(): void {
    if (this.data.userId) {
      this.GetUser()
    }
    this.validateform();
  }
  //Getting Roles
  getAllRoles() {
    this.loading = true;
    this.userManagementService.getAllRoles().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.RolesList = result;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  //Getting By ID
  GetUser() {
    this.loading = true;
    this.userManagementService.GetUserById(this.data.userId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.UserForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.UserForm.disable();
          }
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  AddEdit(){
    this.loading = true;
    // this.addEdituser = this.userForm.value;
    let model = Object.assign({}, this.UserForm.getRawValue());
    if (this.data.userId)
      model.Id = this.data.userId
    this.userManagementService.addEditUser(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });

  }
  validateform() {
    this.UserForm = this.fb.group({
      email: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.emailRegex), Validators.maxLength(80)])],
      firstName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      lastName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      password: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.minLength(8), Validators.maxLength(20)])],
      mobileNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(9), Validators.maxLength(9)])],
      cnic: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.CnicPattern), Validators.minLength(13), Validators.maxLength(13)])],
      city: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(20)])],
      roleId: ['', Validators.required],
    });
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
