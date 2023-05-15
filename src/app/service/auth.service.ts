import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient ) { }

  employeeDataUrl = 'http://localhost:3000/Employee-Details';
  adminUrl = "http://localhost:3000/admin";

  getAdmin(){
    return this.http.get<any>('http://localhost:3000/admin');
  }
  
  getEmployee(){
    return this.http.get<any>('http://localhost:3000/employees');
  }

  getData(){
    return this.http.get('http://localhost:3000/employees')
  }

  //donut data

  private apiUrl = 'http://localhost:3000/employees';
  GetData(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  //add data
  addEmployee(data: any):Observable<any>{
    return this.http.post(this.apiUrl , data)
  }

  deleteEmpId(id:number):Observable<any>{
    return this.http.delete(`http://localhost:3000/employees/${id}` )

  }
  UpdateEmp(id:number , data : any):Observable<any>{
    return this.http.put(`http://localhost:3000/employees/${id}`, data )

  }
  ViewEmp(id :any):Observable<any>{
    return this.http.get(`http://localhost:3000/employees/${id}`)

  }
  //Employee DashBoard
  viewEmployeeDetails(id:number):Observable<any>{
    return this.http.get(`http://localhost:3000/employees/${id}`)
  }
  UpdateEmpStatus(id:number , data : any):Observable<any>{
    return this.http.patch(`http://localhost:3000/employees/${id}`, data )

  }
  SendLeaveData(data:any){
    return this.http.post('http://localhost:3000/Leaves' , data)
  }

  getLeaveData(){
    return this.http.get<any>('http://localhost:3000/Leaves')
  }

  

 
}
