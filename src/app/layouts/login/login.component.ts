import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'd3';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  adminData: any;

  loginForm !: FormGroup;

  constructor(private formBuilder: FormBuilder, private toater: ToastrService, private authService: AuthService, private router: Router , private http : HttpClient) { 
    sessionStorage.clear()
  }
  

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      name: [''],
      password: ['']
    })

  }


  onSubmit(form: FormGroup) {


   this.authService.getAdmin().subscribe(res => {
      this.adminData = res;

      const adminUser = res.find((a: any) => {

        console.log(a.username);
        
       
         return a.username === form.value.name && a.password === form.value.password

      });

      if (adminUser) {
       let isAdminUser = true;
        localStorage.setItem('admin','123')
        this.toater.success('Welcome Back')
        this.loginForm.reset();
        this.router.navigate(['admin'])
        
        
      }
   
    })

  this.authService.getEmployee().subscribe(res=>{


      const empUser = res.find((a:any)=>{

        
       // console.log(a.username, form.value.name, a.password, form.value.password);
           
             return a.username === form.value.name && a.password === form.value.password;
            
                
        

      });
   
      if (empUser) {
        let isempUser = true
        
        localStorage.setItem('emp',empUser.id);
        this.toater.success('Welcome Back Employee')
        this.loginForm.reset();
        this.router.navigate(['employee'])
        //console.log(empUser);
        
        
      } 
    })



  

   



  }


}
