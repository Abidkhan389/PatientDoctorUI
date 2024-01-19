import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    this.medicineTypeService.getMedicineTypeById(this.data.MedicineTypeId).pipe(
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
    })
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
