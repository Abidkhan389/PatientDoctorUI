import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { DropDownUtils, Messages, NoWhitespaceValidator, ResultMessages, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { ReceptionistService } from 'src/app/_services/administration/receptionist.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddeditpatientComponent } from './addeditpatient/addeditpatient.component';
import { LookupService } from 'src/app/_services/lookup.service';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent extends DropDownUtils implements OnInit{
  form: FormGroup;
  loading: boolean = true;
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status', 'name','doctor','doctorNumber','patientNumber','cnic','city','gender','bloodType','appointment','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalUsers = 0;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  bloodTypes: string[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  selectedBloodType: string | null = null;
  DoctorList: any;
  // Configuration options
  showSpinners = true; // Show spinners for hours, minutes, and seconds
  showSeconds = true; // Show seconds
  stepHour = 1; // Step value for hours
  stepMinute = 1; // Step value for minutes
  stepSecond = 1; // Step value for seconds
  touchUi = false; // Use touch-friendly UI
  color = 'primary'; // Color of the datetime picker
  enableMeridian = true; // Enable AM/PM selection
  maxDate =moment(new Date()).format('YYYY-MM-DD')
  inputFocused = false;
  inputClicked: boolean = false;
  constructor(public receptionistService: ReceptionistService,protected lookupService: LookupService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router) {
    super(lookupService, router);
    this.GetAllDoctor(data => (this.DoctorList = data));
    
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllPatient();
  }
 
  validateForm() {
    this.form = this.fb.group({
      patientName: ['',Validators.compose([NoWhitespaceValidator])],
      cnic: ['',Validators.compose([NoWhitespaceValidator,])],
      city: ['',Validators.compose([NoWhitespaceValidator,])],
      mobileNumber: ['',Validators.compose([NoWhitespaceValidator,])],
      doctorId: ['',Validators.compose([NoWhitespaceValidator,])],
      //patientAppoitmentTime: ['',Validators.compose([NoWhitespaceValidator,])],
      
    })
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllPatient()
  }
   // Pagination with server side
  pageChanged(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllPatient()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllPatient()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllPatient()
  }
  ViewPatient(Id: any) {
    this.AddEdit(Id, true);
  }
   updateStatus(event, user) {
    this.loading = false;
    let model = {
      id: user.userId,
      status: event ? 1 : 0
    }
    return this.receptionistService.updatePatientStatus(model)
      .pipe(
        finalize(() => {
          this.loading = false;
        }))
      .subscribe(data => {
        if (data.success) {
          showSuccessMessage(data.message)
          user.status = event
        }
        else {
          showErrorMessage(data.message)
          user.status = !event
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }

  //Fetching All with sorting or filtering with activeInActive
  fetchAllPatient() {
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.receptionistService.getAllPatient(this.tableParams)
      .pipe(
        finalize(() => {
          this.loading = false;
        }))
      .subscribe(result => {
        if (result) {
          debugger;
          this.count = result.totalCount;
          this.dataSource = result.dataList;
          if (this.count == 0) {
            this.noData = true;
          }
          else{
            this.noData = false
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  //Add Edit With Mat Dialoge Modal Ref
  AddEdit(Id?: any, IsReadOnly?: any) {
    const dialogref = this.dilog.open(AddeditpatientComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        patientId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllPatient();
        }
      },
    });
  }
}
