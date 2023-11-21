import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Helpers, Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { EyeDistance, Eyes } from 'src/app/_common/_helper/enum';
import { AppoitmentsService } from 'src/app/_services/administration/appoitments.service';
import { ReceptionistService } from 'src/app/_services/administration/receptionist.service';

@Component({
  selector: 'app-patient-discription',
  templateUrl: './patient-discription.component.html',
  styleUrls: ['./patient-discription.component.sass']
})
export class PatientDiscriptionComponent implements OnInit {
  loading: any;
  PatientDescriptionForm: FormGroup;
  MedicineOption: any = [];
  validationMessages = Messages.validation_messages;
  eyes: any;
  eyeDistance: any;
  constructor(public appoitmentsService: AppoitmentsService, public receptionistService: ReceptionistService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<PatientDiscriptionComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.eyes = Helpers.enumToArray(Eyes);
    this.eyeDistance = Helpers.enumToArray(EyeDistance);
  }
  ngOnInit(): void {
    if (this.data.IsReadOnly) {
      this.ViewPatientDescription(this.data.patientId, data => {
        this.PatientDescriptionForm.patchValue(data);
        this.PatientDescriptionForm.disable();
        debugger;
        if(data)
          this.MedicineOption=this.PatientDescriptionForm.get('medicine') as FormArray;
        while (this.MedicineOption.length);
        this.MedicineOption.removeAt(0);
        if (data.medicine.length > 0) {
          data.medicine.forEach((item, ind) => {
            this.addMedicine()
            this.MedicineOption.controls[ind].patchValue(item)
          });
        }
        this.MedicineOption.disable();
      })
    }
    this.validateform();
  }
  ViewPatientDescription(patientId: any, callback) {
    this.loading = true;
    this.appoitmentsService.GetPatientDescription(patientId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          callback(result);
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
    // this.appoitmentsService.GetPatientDescription(this.data.patientId).pipe(
    //   finalize(() => {
    //     this.loading = false;
    //   }))
    //   .subscribe(result => {
    //     if (result) {
    //       this.PatientDescriptionForm.patchValue(result);
    //       this.PatientDescriptionForm.disable();
    //     }
    //   },
    //     error => {
    //       showErrorMessage(ResultMessages.serverError);
    //     });
  }
  //Add medicine with  Option
  addMedicine(val?, type?) {
    this.MedicineOption = this.PatientDescriptionForm.get('medicine') as FormArray;
    this.MedicineOption.push(this.createMedicineForm(val, type));
  }
  createMedicineForm(item?, type?) {
    return this.fb.group({
      medicineTitle: new FormControl(
        {
          value: item ? item.value : null,
          disabled: item ? true : false
        },
        Validators.compose([
          Validators.required, Validators.maxLength(200), Validators.minLength(3),
          NoWhitespaceValidator,
        ])
      ),
      morning: [false],
      noon: [false],
      evening: [false],
    });
  }
  validateform() {
    this.PatientDescriptionForm = this.fb.group({
      description: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.nameRegex), Validators.maxLength(1000), Validators.minLength(5)])],
      medicine: this.fb.array([]),
      eye1: [null, Validators.compose([Validators.required])],
      eye2: [null, Validators.compose([Validators.required])],
      distanceEye1: [null, Validators.compose([Validators.required])],
      distanceEye2: [null, Validators.compose([Validators.required])],
      eye1SidePoint: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.decimalNum),])],
      eye2SidePoint: [null, Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.decimalNum),])],
    });
  }
  AddDescription() {
    this.loading = true;
    //this.addEdituser = this.userForm.value;
    let model = Object.assign({}, this.PatientDescriptionForm.getRawValue());
    if (this.data.patientId)
      model.patientId = this.data.patientId
    this.receptionistService.AddPatientDescription(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });
  }
  // Remove medicine at a specific index
  removeMedicine(index: number) {
    this.getMedicineArray().removeAt(index);
  }
  // Get the medicine FormArray
  getMedicineArray(): FormArray {
    return this.PatientDescriptionForm.get('medicine') as FormArray;
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
