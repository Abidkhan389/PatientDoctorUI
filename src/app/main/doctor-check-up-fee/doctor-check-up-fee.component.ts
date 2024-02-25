import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, ResultMessages, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { DoctorCheckUpFeeService } from 'src/app/_services/administration/doctor-check-up-fee.service';
import { MedicineService } from 'src/app/_services/administration/medicine.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddEditDoctorCheckUpFeeComponent } from './add-edit-doctor-check-up-fee/add-edit-doctor-check-up-fee.component';

@Component({
  selector: 'app-doctor-check-up-fee',
  templateUrl: './doctor-check-up-fee.component.html',
  styleUrls: ['./doctor-check-up-fee.component.sass']
})
export class DoctorCheckUpFeeComponent implements OnInit {
  form: FormGroup;
  loading:boolean= true;
  medineList:any;
  medicine: any[] = [];
  DoctorList: any;
  MedicineTypeList: any;
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status','MedicineName','MedicineType','DoctoerName','StartingDate','ExpiryDate','actions'];
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
  constructor(private doctorCheckUpFeeService:DoctorCheckUpFeeService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router){
    
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllDoctorCheckFee();
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllDoctorCheckFee()
  }
   // Pagination with server side
   onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllDoctorCheckFee()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllDoctorCheckFee()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllDoctorCheckFee()
  }
  ViewMedicine(Id: any) {
    this.CurrentDoctorCheckUpId = Id;
    this.AddEdit(this.CurrentDoctorCheckUpId, true);
  }
  updateStatus(event, medicine) {
    this.loading = false;
    let model = {
      id: medicine.id,
      status: event ? 1 : 0
    }
    return this.doctorCheckUpFeeService.updateDoctorCheckUpFeeStatus(model)
      .pipe(
        finalize(() => {
          this.loading = false;
        }))
      .subscribe(data => {
        if (data.success) {
          showSuccessMessage(data.message)
          medicine.status = event
        }
        else {
          showErrorMessage(data.message)
          medicine.status = !event
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  validateForm(){
    this.form= this.fb.group({
      doctorName:['', Validators.compose([NoWhitespaceValidator])],
      doctorFee:['', Validators.compose([NoWhitespaceValidator])],
    })
  }
  fetchAllDoctorCheckFee(){
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.doctorCheckUpFeeService.getAllDoctorCheckUpFee(this.tableParams)
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
    const dialogref = this.dilog.open(AddEditDoctorCheckUpFeeComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        doctorCheckFeeId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllDoctorCheckFee();
        }
      },
    });
  }
}
