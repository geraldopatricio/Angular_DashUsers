import { Component , Inject , OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import {  MatDialog  , MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit{
  public education : string [] =
  [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate'
  ]

  public stat : string [] =
  [
    'active',
    'inactive'
  ]

  empForm : FormGroup
  selectedFile: File | undefined;
 



  constructor( private _fB : FormBuilder , private _empService :AuthService , private _dialogRef : MatDialogRef<EmpAddEditComponent> ,  @Inject(MAT_DIALOG_DATA) public data : any , private _snackBar: MatSnackBar){
    this.empForm = _fB.group({

      name:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      qualification:'',
      address:'',
      mobileNumber:'',
      position:'',
      package:'',
      username:'',
      password:'',
      status:'',
      leaves:Number,
       image:['']
     

    });

   
  }

  ngOnInit() {
      this.empForm.patchValue(this.data)
  }

  onFormSubmit(){

    if(this.empForm.valid){

      if (this.data) {

        this._empService.UpdateEmp(this.data.id , this.empForm.value).subscribe({
          next :(val:any)=>{
  
            //alert('Details Updated');
            this._snackBar.open('Data Added Successfully','X',{
             
              duration: 2000,
              panelClass: ['my-custom-snackbar'],
            })
            this._dialogRef.close(true)
  
          },
          error(err) {
              console.log(err);
              
          },
        })
        
      } else {

        
      this._empService.addEmployee(this.empForm.value).subscribe({
        next :(val:any)=>{

          //alert('Details added Successfully');
          this._snackBar.open('Data Added Successfully','X',{
            duration: 2000
          })
          this._dialogRef.close(true)

        },
        error(err) {
            console.log(err);
            
        },
      })
        
      }


    }
    
    
   
    
      
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
   // const reader =  new FileReader();
    this.empForm.get('image')?.setValue(file)
  }


}
