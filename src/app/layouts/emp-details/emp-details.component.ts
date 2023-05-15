import { Component , OnInit , Inject } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmpLeaveComponent } from '../emp-leave/emp-leave.component';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';




interface Employee {

  id:number,
  name:string,
  lastName:string


}

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.scss']
})
export class EmpDetailsComponent implements OnInit {

  employee !: Employee;
  test1 : any

  constructor( private _empDataService: AuthService , private route: ActivatedRoute , private dialogue : MatDialog){}

  ngOnInit() {
    
      const username :any = localStorage.getItem('emp')
      console.log(username);
      this._empDataService.viewEmployeeDetails(username).subscribe(
        res=> {
          this.test1=res
          console.log(res);

          this._empDataService.UpdateEmpStatus(this.test1.id , { status: 'active'  }).subscribe(res=>{
            this.test1.status = 'active'
            
          })
        }
        )
      
    
      
  }

  logout(){

    this._empDataService.UpdateEmpStatus(this.test1.id , { status: 'inactive'  }).subscribe(res=>{
      this.test1.status = 'inactive'
      localStorage.removeItem('emp');
      window.location.reload();
      

    })


  }


  editEmployeedetails(data:any){
    this.dialogue.open(EmpAddEditComponent , {
      data,
    })
  }


  leaveApplication(){
    this.dialogue.open(EmpLeaveComponent)

  }
  



}

