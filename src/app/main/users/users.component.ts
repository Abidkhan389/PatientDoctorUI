import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { finalize } from 'rxjs/operators';
import { Messages, NoWhitespaceValidator, Patterns, ResultMessages, showErrorMessage, showSuccessMessage } from 'src/app/_common';
import { UserManagementService } from 'src/app/_services/administration/user-management.service';
import { Table } from 'src/app/interfaces/ITable';
import { AddeditcoursesComponent } from '../courses/addeditcourses/addeditcourses.component';
import { AddEditUserComponent } from './add-edit-user/add-edit-user.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  form: UntypedFormGroup;
  loading: boolean = true;
  usersList: any;
  user: any[] = [];
  modalOptions: NgbModalOptions = {};
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['sn.', 'status', 'userName','email','role','mobileNumber','cnic','city', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  totalUsers = 0;
  pageSize = 5;
  currentPage = 1;
  noData: boolean = false;
  CurrentUserId: any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  tableParams: Table;
  @ViewChild('myTable') table: any;
  isCollapsed: boolean = true;
  count: number = 0;
  validationMessages = Messages.validation_messages;
  constructor(public userManagementService: UserManagementService, private dilog: MatDialog, private fb: UntypedFormBuilder, private modalService: NgbModal, protected router: Router) {
    this.tableParams = { start: 0, limit: 5, sort: '', order: 'ASC', search: null };
  }
  ngOnInit(): void {
    this.validateForm();
    this.fetchAllUser();
  }
  validateForm() {
    this.form = this.fb.group({
      userName: ['',Validators.compose([NoWhitespaceValidator])],
      email: ['',Validators.compose([NoWhitespaceValidator])],
      cnic: ['',Validators.compose([NoWhitespaceValidator,])],
      city: ['',Validators.compose([NoWhitespaceValidator,])],
      mobileNumber: ['',Validators.compose([NoWhitespaceValidator,])],
      status: [null]
    })
  }
   // On Advance Search Submit
   onSubmit() {
    this.noData = false;
    this.tableParams.start = 0;
    this.fetchAllUser()
  }
   // Pagination with server side
   onPaginate(pageEvent: PageEvent) {
    this.tableParams.limit = pageEvent.pageSize
    this.tableParams.start = pageEvent.pageIndex * pageEvent.pageSize
    this.fetchAllUser()
  }
   //Sorting on Coloum With MatSort
   onSort(sort: Sort) {
    this.tableParams.sort = sort.active;
    this.tableParams.order = sort.direction;
    this.tableParams.start = 0;
    this.fetchAllUser()
  }
  //Reset Form Values on Advance Search
  resetTable() {
    this.noData = false;
    this.form.reset();
    this.fetchAllUser()
  }
  ViewUser(Id: any) {
    this.CurrentUserId = Id;
    this.AddEdit(this.CurrentUserId, true);
  }
   updateStatus(event, user) {
    this.loading = false;
    let model = {
      id: user.userId,
      status: event ? 1 : 0
    }
    return this.userManagementService.updateUserStatus(model)
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
  fetchAllUser() {
    this.loading = true;
    debugger;
    Object.assign(this.tableParams, this.form.value);
    this.userManagementService.getAllUsers(this.tableParams)
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
    const dialogref = this.dilog.open(AddEditUserComponent, {
      disableClose: true,
      autoFocus: false,
      data: {
        userId: Id,
        IsReadOnly: IsReadOnly
      },
    })
    dialogref.afterClosed().subscribe({
      next: (value) => {
        if (value) {
          this.fetchAllUser();
        }
      },
    });
  }
}
