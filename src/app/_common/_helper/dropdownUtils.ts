import { select } from "@angular-redux/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { LookupService } from "src/app/_services/lookup.service";
import { ResultMessages } from "../constant";
import { showErrorMessage, showInfoMessage } from "../messages";

export class DropDownUtils {
    permissions: any = {}
    @select('config') public config$: Observable<any>;
    checkPermissions: any[] = [];
    loading: boolean;
    constructor(protected lookupService: LookupService,
        protected router: Router) {

    }
    protected GetAllDoctor(callback: (data) => void) {
        this.lookupService.getAllDoctors()
            .subscribe(
                result => {
                    if (result)
                        callback(result);
                },
                error => {
                    showErrorMessage(ResultMessages.serverError)
                });
    }
    protected GetUserById(val, callback: (data) => void) {
        return this.lookupService.GetUserById(val)
            .subscribe(
                result => {
                    if (result) {
                        callback(result);
                    }
                },
                error => {
                    showErrorMessage(ResultMessages.serverError)
                });
    }
    protected GetAllMedicineType(callback: (data) => void) {
        this.lookupService.getAllMedicineType()
            .subscribe(
                result => {
                    if (result)
                        callback(result);
                },
                error => {
                    showErrorMessage(ResultMessages.serverError)
                });
    }
}