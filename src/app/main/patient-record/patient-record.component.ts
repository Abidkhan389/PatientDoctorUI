import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator } from 'src/app/_common';
import { PatientRecordListService } from 'src/app/_services/administration/patient-record-list.service';
import { Table } from 'src/app/interfaces/ITable';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-patient-record',
  templateUrl: './patient-record.component.html', // Correct path
  styleUrls: ['./patient-record.component.sass']
})
export class PatientRecordComponent {
  form: FormGroup;
  loading:boolean= true;
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'PatientName','PatientCnic','PatientCheckUpDate','PatientCheckUpDoctorFee','DoctorName','DoctorEmail','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  CurrentDoctorCheckUpId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  patientReportPdf:any;
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
  constructor(private patientRecordListService:PatientRecordListService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router){
    
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllPatientRecord();
  }
  validateForm() {
    this.form = this.fb.group({
      doctorName: ['',Validators.compose([NoWhitespaceValidator])],
      patientName: ['',Validators.compose([NoWhitespaceValidator])],
      PatientCnic: ['',Validators.compose([NoWhitespaceValidator,])],
      patientCheckUpDateFrom : [null,Validators.compose([])],
      patientCheckUpDateTo : [null,Validators.compose([])],
    })
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllPatientRecord()
  }
  // Pagination with server side
  onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllPatientRecord()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllPatientRecord()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllPatientRecord()
  }
  //Fetching All with sorting or filtering with activeInActive
  fetchAllPatientRecord() {
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.patientRecordListService.getAllPatientRecordList(this.tableParams)
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
  ViewPatientRecordPdf(content, patientId, doctorId) {
    let model = Object.assign({});
    model.patientId= patientId;
    model.doctorId= doctorId
    return this.patientRecordListService.GetPatientDetailForPdf(model)
      .subscribe(result => {
        if (result) {
          this.patientReportPdf = result;
          //let u = result.userName
          //this.user = u.split('@')[0]
          //  if (result.grade != "F") {
          this.openDetailModal(content);
          // }
          // else
          //   showInfoMessage("No Certificate issue Yet")
        }
      });
  }
  openDetailModal(content) {
    this.modalOptions.backdrop = 'static';
    this.modalOptions.keyboard = false;
    this.modalOptions.size = 'lg';
    this.modalOptions.centered = true;
    this.modalService.open(content, this.modalOptions);
  }
  onPrint() {
    let data = document.getElementById('print');

    const doc = new jsPDF();
    // let data = document.getElementById('print');
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')

      let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save(this.patientReportPdf.patientName + '  Report.pdf');
    }).catch(function (error) {
      console.error('oops, something went wrong!', error);
    });

  }
}
