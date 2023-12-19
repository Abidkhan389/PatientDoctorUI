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
import { Table } from 'src/app/interfaces/ITable';
import { PatientDiscriptionComponent } from '../patient/patient-discription/patient-discription.component';
import { AddeditpatientComponent } from '../patient/addeditpatient/addeditpatient.component';
import { AppoitmentsService } from 'src/app/_services/administration/appoitments.service';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-appoitments',
  templateUrl: './appoitments.component.html',
  styleUrls: ['./appoitments.component.sass']
})
export class AppoitmentsComponent  implements OnInit{
  form: FormGroup;
  loading: boolean = true;
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'name','doctor','doctorNumber','patientNumber','cnic','city','gender','bloodType','appointment','CheckUpStatus','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  DoctorList: any;
  currentDate: Date;
  constructor(private appoitmentsService:AppoitmentsService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router)
  {
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
      todeydatetime:[''],
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
  OnPatientDescriptionView(Id: any){
    this.AddViewPatientDescription(Id,true);
  }
  //Fetching All with sorting or filtering with activeInActive
  fetchAllPatient() {
    this.loading = true;
    debugger;
    this.handleDateTimeSelection();
    Object.assign(this.tableParams, this.form.value);
    this.appoitmentsService.getAllTodeyPatientAppoitments(this.tableParams)
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
  handleDateTimeSelection() {
    const userSelectedDate = new Date();
    // Convert the user-selected date to local DateTime
    userSelectedDate.setMinutes(userSelectedDate.getMinutes() - userSelectedDate.getTimezoneOffset());
    // Format the date as an ISO string
    const isoDateTimeString = userSelectedDate.toISOString();
    // Now, you can assign the formatted date to your FormGroup
    this.form.patchValue({ todeydatetime: isoDateTimeString });
  }
  AddViewPatientDescription(Id?: any, IsReadOnly?: any){
    debugger;
    const dialogref = this.dilog.open(PatientDiscriptionComponent, {
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
