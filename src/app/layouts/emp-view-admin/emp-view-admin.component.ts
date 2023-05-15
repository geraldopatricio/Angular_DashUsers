import { Component , OnInit , Inject} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-emp-view-admin',
  templateUrl: './emp-view-admin.component.html',
  styleUrls: ['./emp-view-admin.component.scss']
})
export class EmpViewAdminComponent implements OnInit {

  public value : any
  public employees: any;
  public details: any;
  selectedEmployee: any;


  constructor(private _data:AuthService ,private _http:HttpClient , @Inject(MAT_DIALOG_DATA) public data : any){}

  ngOnInit(){


  
      
  }

  showDetails(){

    this._data.GetData().subscribe((res)=>{

      this.value=res;
      console.log(this.value);
      

     
      
    })


  }

  showDetail(employeeId: number) {
    this._data.GetData().subscribe((res) => {
      this.value = res;
      console.log(this.value);
      this.selectedEmployee = this.value.find((e:any) => e.id === employeeId);
    });
  }
  

}
