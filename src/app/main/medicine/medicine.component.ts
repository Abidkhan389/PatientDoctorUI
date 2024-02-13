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
import { MedicineService } from 'src/app/_services/administration/medicine.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddEditMedicineComponent } from './add-edit-medicine/add-edit-medicine.component';
import { LookupService } from 'src/app/_services/lookup.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.sass']
})
export class MedicineComponent extends DropDownUtils implements OnInit {
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
  CurrentMedicineId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  constructor(private medicineService:MedicineService,protected lookupService: LookupService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router){
    super(lookupService, router);
    this.GetAllDoctor(data => (this.DoctorList = data));
    this.GetAllMedicineType(data => (this.MedicineTypeList=data));
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllMedicine();
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllMedicine()
  }
   // Pagination with server side
   onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllMedicine()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllMedicine()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllMedicine()
  }
  ViewMedicine(Id: any) {
    this.CurrentMedicineId = Id;
    this.AddEdit(this.CurrentMedicineId, true);
  }
  updateStatus(event, medicine) {
    this.loading = false;
    let model = {
      id: medicine.id,
      status: event ? 1 : 0
    }
    return this.medicineService.updateMedicineStatus(model)
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
      medicineName:['', Validators.compose([NoWhitespaceValidator])],
      doctorId:['', Validators.compose([NoWhitespaceValidator])],
      dedicineTypeId:['', Validators.compose([NoWhitespaceValidator])],
    })
  }
  fetchAllMedicine(){
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.medicineService.getAllMedicine(this.tableParams)
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
    const dialogref = this.dilog.open(AddEditMedicineComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        medicineId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllMedicine();
        }
      },
    });
  }
}
