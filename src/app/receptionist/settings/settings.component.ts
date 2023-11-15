import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDownUtils, Messages, NoWhitespaceValidator } from 'src/app/_common';
import { ResetPasswordService } from 'src/app/_services/Auth/reset-password.service';
import { LookupService } from 'src/app/_services/lookup.service';
import { IResetPassword } from 'src/app/interfaces/auth/IResetPassword';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent extends DropDownUtils implements OnInit {
  resetPassword:IResetPassword;
  resetpasswordForm: FormGroup;
  UserDetails: any;
  PasswordButtonClicked:boolean=false;
  userId: any;
  UserFullName:string;
  validationMessages = Messages.validation_messages;
  constructor(protected lookupService: LookupService,protected router:Router,private route: ActivatedRoute,
    protected resetPasswordService:ResetPasswordService,private fb: FormBuilder){
      super(lookupService, router)
    this.userId = localStorage.getItem('userId');
    this.GetUserById(this.userId, data => this.UserDetails = data);

    this.resetPassword= {} as IResetPassword;
    this.PasswordButtonClicked=true;
    this.userId = localStorage.getItem('userId');
  }
  ngOnInit(): void {
    this.validateform() 
  }
  Submit() 
  {
    this.userId = localStorage.getItem("userId");
    this.resetPassword=this.resetpasswordForm.value;
    this.resetPassword.userId= this.userId;
    this.resetPasswordService.ResetPassword(this.resetPassword).subscribe((data:any)=>{
    //this.router.navigate(['/recommendation'], { queryParams: { courseId: this.courseId } })
    });
  }
  validateform()
   {
    this.resetpasswordForm = this.fb.group({
      OldPassword: [null, Validators.compose([NoWhitespaceValidator, Validators.required])],
      password: [null, Validators.compose([NoWhitespaceValidator, Validators.required,Validators.minLength(4)])],
      confirmPassword: [null,Validators.compose([NoWhitespaceValidator, Validators.required,Validators.minLength(4)])],
    },{ validator: this.checkPasswords });
  }
  checkPasswords(group: FormGroup) 
  {
    let password = group.controls.password.value;
    let confirmPassword = group.controls.confirmPassword.value;
    return password === confirmPassword ? null : { notSame: true };
  }
  ResetPassword()
  {
    this.PasswordButtonClicked=true;
    // this.router.navigate(['/ResetPassword']);
    // const dialogref = this.dialog.open(ResetPasswordComponent, {
    //   disableClose: true,
    //   autoFocus: false,
    //   data: {
    //     userId: this.userId,
    //   },
    // })
    // dialogref.afterClosed().subscribe({
    //   next: (value) => {
    //     if (value) {
    //       //this.GetAllCourses(data => this.recommendationArr = data);
    //       //Alerts.showInfoMessage("After Admin approval! course Will be Show in Continue Learning");
    //       // this.router.navigate(['/lecture'], { queryParams: { courseId: Id } })
    //     }
    //   },
    // });

  }
}
