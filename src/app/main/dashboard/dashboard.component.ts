import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { DashboardService } from 'src/app/_services/administration/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent {
  loading:boolean=true;
  dashboarddata:any;
  public barChartOptionsForAdmins: any; // Initialize as undefined
  public barChartOptionsForDoctors: any; // Initialize as undefined
  public barChartLabels: string[] =[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartDataForDoctors: number[] = [0,10,20,100,200];
  // For users
  public barChartLabelsforUsers: any; // Initialize as undefined
  constructor(private dashboardService:DashboardService){
  }
  ngOnInit(): void {
    this.getDashboardData();
  }
  getDashboardData(){
  this.loading = true;
  this.dashboardService.GetDashBoardData()
   .pipe(
     finalize(() => {
       this.loading = false;
     }))
   .subscribe(result => {
     if (result) {
       this.dashboarddata=result;
       //this.barChartcourseData=this.allCourses.map(course=> course.enrollmentCount);
       this.barChartDataForDoctors=this.dashboarddata.patientPerDoctorCount.map(doctor=> doctor.PatientCount);
       this.initializeBarChartOptions(); // Call the method to set barChartOptions
     }
   });
}
initializeBarChartOptions() {
 debugger
 // Create barChartOptions based on dashboarddata
 this.barChartOptionsForAdmins = {
   scales: {
     xAxes: [
       {
         ticks: {
           maxRotation: 90,
           minRotation: 0,
         },
       },
     ],
   },
 };
 this.barChartOptionsForDoctors = {
   scales: {
     xAxes: [
       {
         ticks: {
           maxRotation: 90,
           minRotation: 0,
         },
       },
     ],
   },
   // tooltips: {
   //   callbacks: {
   //     label: (tooltipItem, data) => {
   //       debugger
   //       const userId = this.dashboarddata.userPerCourseCount[tooltipItem.index].userId;
   //       const userName = this.dashboarddata.userPerCourseCount[tooltipItem.index].userName;
   //       const userCountData = this.dashboarddata.userPerCourseCount.find(data => data.userId === userId);
   //       const enrollmentCount = userCountData ? userCountData.enrollmentCount : 0;
   //       // Calculate the chart height for the current course individually
   //       //this.chartHeight = (enrollmentCount / this.dashboarddata.enrolledUserCount) * 400; // Adjust the maximum height as needed
   //       // Assign the height to the chart container
   //       //document.querySelector('.chart-container').style.height = courseChartHeight + 'px';

   //       //return `${userName}: Courses ${enrollmentCount}`;
   //       return `Courses ${enrollmentCount}`;
   //     },
   //   },
   // },
 };
}
}
