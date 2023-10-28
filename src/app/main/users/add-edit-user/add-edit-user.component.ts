import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup,   } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Messages } from 'src/app/_common';
import { UserManagementService } from 'src/app/_services/administration/user-management.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.sass']
})
export class AddEditUserComponent {
  
  isreadOnly: boolean = false;
  CourseForm: FormGroup;
  validationMessages = Messages.validation_messages;
  userList:any;
  constructor(public userManagementService: UserManagementService,private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditUserComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    
  }
  ngOnInit(): void {
    if (this.data.courseId) {
      this.GetUser()
    }
    this.validateform();
  }
  GetUser(){

  }
  validateform(){
    
  }
}
