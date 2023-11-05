import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { Helpers, Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage } from 'src/app/_common';
import { Gendertype, MaterialType } from 'src/app/_common/_helper/enum';
import { ReceptionistService } from 'src/app/_services/administration/receptionist.service';

@Component({
  selector: 'app-addeditpatient',
  templateUrl: './addeditpatient.component.html',
  styleUrls: ['./addeditpatient.component.sass']
})
export class AddeditpatientComponent implements OnInit{
  isreadOnly: boolean = false;
  PatientForm: FormGroup;
  loading: any;
  validationMessages = Messages.validation_messages;
  PatientList: any;
  DoctorList: any;
  hide = true;
  bloodTypes: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-','Others'];
  genderType: Object[] = [];
  materialType: Object[] = [];
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
  constructor(public receptionistService: ReceptionistService, private fb: FormBuilder, protected router: Router, private dialogref: MatDialogRef<AddeditpatientComponent>,
    private dilog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
      this.getAllDoctor();
    this.genderType = Helpers.enumStringToArray(Gendertype);
    this.materialType = Helpers.enumStringToArray(MaterialType);
    
  }
  ngOnInit(): void {
    if (this.data.patientId) {
      this.GetPatient()
    }
    this.validateform();
  }
  validateform() {
    this.PatientForm = this.fb.group({
      firstName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
      lastName: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(30),Validators.minLength(3)])],
      gender: [null, Validators.required],
      doctoerId : [null, Validators.required],
      dateofBirth : ['', Validators.required],
      appoitmentTime : ['', Validators.required],
      phoneNumber: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.Num), Validators.minLength(11), Validators.maxLength(11)])],
      cnic: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.CnicPattern), Validators.minLength(13), Validators.maxLength(13)])],
      city: ['', Validators.compose([NoWhitespaceValidator, Validators.required, Validators.pattern(Patterns.titleRegex), Validators.maxLength(50),Validators.minLength(3)])],
      bloodType: [null, Validators.required],
      maritalStatus: [null, Validators.required],
    });
  }
  GetPatient(){
    this.loading = true;
    this.receptionistService.GetPatientById(this.data.patientId).pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.PatientForm.patchValue(result);
          if (this.data.IsReadOnly) {
            this.isreadOnly = true;
            this.PatientForm.disable();
          }
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  getAllDoctor(){
    this.loading = true;
    this.receptionistService.getAllDoctors().pipe(
      finalize(() => {
        this.loading = false;
      }))
      .subscribe(result => {
        if (result) {
          this.DoctorList = result;
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  AddEdit(){
    this.loading = true;
    // this.addEdituser = this.userForm.value;
    this.handleDateTimeSelection();
    let model = Object.assign({}, this.PatientForm.getRawValue());
    // let phn=Helpers.appendPhoneNumber(this.UserForm.get("mobileNumber").value)
    // if(phn){
    //   model.mobileNumber = phn;
    // }
    if (this.data.userId)
      model.Id = this.data.userId
    this.receptionistService.addEditPatient(model).subscribe((data: any) => {
      this.dialogref.close(true);
    });

  }
  handleDateTimeSelection() {
    const userSelectedDate = new Date(this.PatientForm.get("appoitmentTime").value);
    
    // Convert the user-selected date to local DateTime
    userSelectedDate.setMinutes(userSelectedDate.getMinutes() - userSelectedDate.getTimezoneOffset());

    // Format the date as an ISO string
    const isoDateTimeString = userSelectedDate.toISOString();

    // Now, you can assign the formatted date to your FormGroup
    this.PatientForm.patchValue({ appoitmentTime: isoDateTimeString });
  }
  //Its Close The DialogRef Modal
  closeClick() {
    this.dialogref.close();
  }
}
