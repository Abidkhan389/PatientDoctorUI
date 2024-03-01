import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DropDownUtils, Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { DoctorCheckUpFeeService } from 'src/app/_services/administration/doctor-check-up-fee.service';
import { finalize } from 'rxjs/operators';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-add-edit-doctor-check-up-fee',
  templateUrl: './add-edit-doctor-check-up-fee.component.html',
  styleUrls: ['./add-edit-doctor-check-up-fee.component.sass']
})
export class AddEditDoctorCheckUpFeeComponent extends DropDownUtils implements OnInit{
  isreadOnly: boolean = false;
  DoctorCheckUpFeeForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  RolesList: any;
  hide = true;
  DoctorList:any;
  constructor(private doctorCheckUpFeeService: DoctorCheckUpFeeService,protected lookupService: LookupService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditDoctorCheckUpFeeComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
      super(lookupService, router);
      this.GetAllDoctor(data => (this.DoctorList = data));
  }
  ngOnInit(): void {
    if (this.data.doctorCheckFeeId) {
      this.GetDoctorCheckUpFeeById()
    }
    this.validateform();
  }
  //Getting By ID
  GetDoctorCheckUpFeeById() {
    this.loading = true;
    this.doctorCheckUpFeeService.getDoctorCheckUpFeeById(this.data.doctorCheckFeeId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.DoctorCheckUpFeeForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.DoctorCheckUpFeeForm.disable();
          }
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  AddEdit() {
    this.loading = true;
    let model = Object.assign({}, this.DoctorCheckUpFeeForm.getRawValue());
    if (this.data.doctorCheckFeeId)
      model.Id = this.data.doctorCheckFeeId
    this.doctorCheckUpFeeService.addEditDoctorCheckUpFee(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  validateform() {
    this.DoctorCheckUpFeeForm = this.fb.group({
      doctorFee: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.greaterThanZero), Validators.maxLength(20)])],
      doctorId: [null, Validators.required],
    });
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
