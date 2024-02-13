import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { DropDownUtils, Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { MedicineService } from 'src/app/_services/administration/medicine.service';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-add-edit-medicine',
  templateUrl: './add-edit-medicine.component.html',
  styleUrls: ['./add-edit-medicine.component.sass']
})
export class AddEditMedicineComponent extends DropDownUtils implements OnInit {
  isreadOnly: boolean = false;
  MedicineForm: FormGroup;
  loading: any;
  DoctorList:any;
  MedicineTypeList:any;
  validationMessages = Messages.validation_messages;
  hide = true;
  // Configuration options
  showSpinners = true; // Show spinners for hours, minutes, and seconds
  showSeconds = true; // Show seconds
  stepHour = 1; // Step value for hours
  stepMinute = 1; // Step value for minutes
  stepSecond = 1; // Step value for seconds
  touchUi = false; // Use touch-friendly UI
  color = 'primary'; // Color of the datetime picker
  enableMeridian = true; // Enable AM/PM selection
 minDate = moment().format('YYYY-MM-DDTHH:mm:ss');
 maxDate =moment(new Date()).format('YYYY-MM-DD')
  constructor(private medicineService: MedicineService,protected lookupService: LookupService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditMedicineComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
      super(lookupService, router);
      this.GetAllDoctor(data => (this.DoctorList = data));
      this.GetAllMedicineType(data => (this.MedicineTypeList=data));
  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.medicineId) {
      this.GetMedicine()
    }
  }
  GetMedicine() {
    this.loading = true;
    let model = Object.assign({});
    model.id= this.data.MedicineTypeId;
    this.medicineService.getMedicineById(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.MedicineForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.MedicineForm.disable();
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
    let model = Object.assign({}, this.MedicineForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.medicineId)
      model.id = this.data.medicineId
    this.medicineService.addEditMedicine(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  validateform() {
    this.MedicineForm= this.fb.group({
      medicineName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      medicineTypeId : [null, Validators.required],
      doctorId : [null, Validators.required],
      startingDate : ['', Validators.required],
      experiyDate : ['', Validators.required],
    })
  }
   //Its Close The DialogRef Modal
   closeClick() {
    this.dialogref.close();
  }
}
