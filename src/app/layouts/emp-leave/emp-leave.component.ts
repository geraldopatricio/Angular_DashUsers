import { Component , Inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MatDialog  , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButton } from '@angular/material/button';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-emp-leave',
  templateUrl: './emp-leave.component.html',
  styleUrls: ['./emp-leave.component.scss']
})
export class EmpLeaveComponent implements OnInit {
  leaveForm !: FormGroup;
  status: string = 'pending';
  button!:any
  formDisable = false
  isSubmitted = false;

  constructor(private _fB : FormBuilder , private dataService: AuthService,private snackBar: MatSnackBar, public dialog:DialogRef ,@Inject(MAT_DIALOG_DATA) public data : any){
    this.leaveForm = _fB.group({

      fullName:['', Validators.required],
      userId:['', Validators.required],
      password:['', Validators.required],
      mobileNo:['', Validators.required],
      startDate:['', Validators.required],
      endDate:['', Validators.required],
      days:['', Validators.required],
      reason:['', Validators.required]



    });

}

  ngOnInit() {
    this.leaveForm.patchValue(this.data)
      
  }

  onSubmit(Form:FormGroup){
    

      if ( Form.valid ){
        

        //console.table(this.leaveForm.value);
        this.dataService.SendLeaveData(this.leaveForm.value).subscribe(res=>{

        this.snackBar.open('Data sent successfully', 'Close', { duration: 3000 });
        const button = document.getElementById('btn') as HTMLButtonElement;

        if (button) {
          button.disabled = true;
          button.innerText = 'Requested';
          button.style.backgroundColor = 'lightgrey';
        }
        this.formDisable = true
        this.isSubmitted = true

        this.dialog.close()
      
        

      })



      }else {

        this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
  
        
        
      }

      
      
      
    
  }


}