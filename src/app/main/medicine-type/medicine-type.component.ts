import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, ResultMessages, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { MedicineTypeService } from 'src/app/_services/administration/medicine-type.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddEditMedicineTyComponent } from './add-edit-medicine-ty/add-edit-medicine-ty.component';

@Component({
  selector: 'app-medicine-type',
  templateUrl: './medicine-type.component.html',
  styleUrls: ['./medicine-type.component.sass']
})
export class MedicineTypeComponent implements OnInit {
  form: FormGroup;
  loading:boolean= true;
  medineTypeList:any;
  medicineType: any[] = [];
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status','type','actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  CurrentMedicineTypeId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  constructor(private medicineTypeService:MedicineTypeService, private dilog: MatDialog, private fb: FormBuilder, private modalService: NgbModal, protected router: Router){
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllMedicineType();
  }
  // On Advance Search Submit
  onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllMedicineType()
  }
   // Pagination with server side
   onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllMedicineType()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllMedicineType()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllMedicineType()
  }
  ViewmedicineType(Id: any) {
    this.CurrentMedicineTypeId = Id;
    this.AddEdit(this.CurrentMedicineTypeId, true);
  }
  updateStatus(event, medicinetype) {
    this.loading = false;
    let model = {
      id: medicinetype.id,
      status: event ? 1 : 0
    }
    return this.medicineTypeService.updateMedicineTypeStatus(model)
      .pipe(
        finalize(() => {
          this.loading = false;
        }))
      .subscribe(data => {
        if (data.success) {
          showSuccessMessage(data.message)
          medicinetype.status = event
        }
        else {
          showErrorMessage(data.message)
          medicinetype.status = !event
        }
      },
        error => {
          showErrorMessage(ResultMessages.serverError);
        });
  }
  validateForm(){
    this.form= this.fb.group({
      typeName:['', Validators.compose([NoWhitespaceValidator])],
    })
  }
  fetchAllMedicineType(){
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.medicineTypeService.getAllMedicineType(this.tableParams)
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
    const dialogref = this.dilog.open(AddEditMedicineTyComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        MedicineTypeId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllMedicineType();
        }
      },
    });
  }
}
