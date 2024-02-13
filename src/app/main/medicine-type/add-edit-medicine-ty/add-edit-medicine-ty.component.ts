import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { MedicineTypeService } from 'src/app/_services/administration/medicine-type.service';

@Component({
  selector: 'app-add-edit-medicine-ty',
  templateUrl: './add-edit-medicine-ty.component.html',
  styleUrls: ['./add-edit-medicine-ty.component.sass']
})
export class AddEditMedicineTyComponent {
  isreadOnly: boolean = false;
  MedicineTypeForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  hide = true;
  constructor(private medicineTypeService: MedicineTypeService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddEditMedicineTyComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    this.validateform();
    if (this.data.MedicineTypeId) {
      this.GetMedicineType()
    }
  }
  GetMedicineType() {
    this.loading = true;
    let model = Object.assign({});
    model.id= this.data.MedicineTypeId;
    this.medicineTypeService.getMedicineTypeById(model).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.MedicineTypeForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.MedicineTypeForm.disable();
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
    let model = Object.assign({}, this.MedicineTypeForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.MedicineTypeId)
      model.medicineTypeId = this.data.MedicineTypeId
    this.medicineTypeService.addEditMedicineType(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  validateform() {
    this.MedicineTypeForm= this.fb.group({
      typeName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50)])],
      tabletMg: ['', Validators.compose([NoWhitespaceValidator, Validators.pattern(Patterns.greaterThanZero), this.integerOrNullValidator()])],
    })
  }
  // Custom validator for tabletMg to ensure it's null or a valid integer
integerOrNullValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value === null || value === '') {
      return null; // Allow null or empty string
    }
    const intValue = parseInt(value, 10);
    if (isNaN(intValue) || !Number.isInteger(intValue) || intValue <= 0) {
      return { invalidInteger: true }; // Return error if not a valid integer
    }
    return null; // No error, value is a valid integer
  };
}
  // tabletGramValidator(control: AbstractControl): ValidationErrors | null {
  //   const value = control.value;
  //   // Check if the value is a number
  //   if (isNaN(value)) {
  //     return { 'invalidNumber': true };
  //   }
  //   // Convert the number to a string
  //   const stringValue = value.toString();
  //   // Check if the string length is between 1 and 4
  //   if (stringValue.length < 1 || stringValue.length > 4) {
  //     return { 'invalidLength': true };
  //   }
  //   // Validation passed
  //   return null;
  // }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
