import { Component, OnInit  , ViewChild , AfterViewInit} from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import * as d3 from 'd3';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { filter, svg } from 'd3';
import { PieArcDatum } from 'd3-shape';
import {MatDialog} from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import {MatTableDataSource} from '@angular/material/table';
import { AlertService } from 'src/app/service/alert.service';
import { EmpViewAdminComponent } from '../emp-view-admin/emp-view-admin.component';
import { Router , ActivatedRoute } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';






interface Employee {
  id: number;
  name: string;
  leaves: number;
  status: string;
  count: number;
}



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})



export class DashboardComponent implements OnInit {

  totalEmp :any

  //table variables
  public empTableData : any;
  public tableTitle : string[] = ['Id' , 'name' , 'lastName', 'email','dob','gender' ,'qualification','address','mobileNumber','position','package','username','password','status' , 'leaves', 'action' ];
  //public dataSource : any = []
  public dataSource = new MatTableDataSource()

  dataSrc= new MatTableDataSource();
  search!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  alertService 
  selectedEmployee: any;
 



  employees: any;
  empData: any
  status: any

  workinHour=8
  empActandInact:any;
  
  
  activeEmp : any;
  inactiveEmp:any;
  produtiveHrs :any;



  employeeZ: Employee[] = [];
  colorsRange: any = [];
  svg: any;

  notifications: any[] = [];
  notificationCount = 0;


  //todo-list
  
   
  





  constructor(private dataService: AuthService, private http: HttpClient , private dialogue : MatDialog ,  alertService : AlertService , private router:Router ,  private route: ActivatedRoute ,  private _snackBar: MatSnackBar) { 
    this.alertService = alertService;
  }


  //edit employee form
  addEditEmpForm(){
    this.dialogue.open(EmpAddEditComponent)
  }

  //view employee details when clicking name
  viewEmpDetailsAdmin(){
    this.dialogue.open(EmpViewAdminComponent)
    
  }

  maleEmp:any
  femaleEmp:any



  ngOnInit() {

  

    
  

    this.dataService.getEmployee().subscribe(res=>{
      this.empActandInact =res
      
     // this.dataCard = res.reduce((acc:any,Employee:any)=> acc + Employee.leaves , 0)
    this.activeEmp = res.filter((d:any) => d.status === "active").length;
     this.inactiveEmp = res.filter((d:any) => d.status === "inactive").length;
     this.produtiveHrs = this.activeEmp * this.workinHour
     this.maleEmp = res.filter((d:any)=> d.gender === "male").length
     this.femaleEmp = res.filter((d:any)=> d.gender === "female").length

    
     
     
     

      
    })
     
    
    

    

    this.chart()


    //donut
    this.dataService.GetData().subscribe(res => {
      this.employeeZ = res;
      console.log('employeeszzz',this.employeeZ);
     
      this.createChart();
    });
    
    //gauge
    


    this.http.get('http://localhost:3000/employees').subscribe((data) => {
      this.empData = data
      
      const activeUsers = this.empData.filter((element: any) => element.status === 'active');
     const totalProductiveHours =  activeUsers.length * 8
     const maxProductiveHours = 8 * this.empData.length; // 8 working hour
         // Define the SVG container
     const svg = d3.select('#gauge')
     .append('svg')
     .attr('width', 300)
     .attr('height', 200);
     
     // Define the gauge arc
     const arc = d3.arc()
     .innerRadius(60)
     .outerRadius(80)
     .startAngle(-Math.PI / 2)
     .cornerRadius(4);
     
     // Define the gauge background arc
     const bgArc = d3.arc()
     .innerRadius(60)
     .outerRadius(80)
     .startAngle(-Math.PI / 2)
     .endAngle(Math.PI / 2);
     
     // Draw the gauge background
     svg.append('path')
     .attr('class', 'background')
     .attr('d', bgArc as any)
     .attr('transform', 'translate(150, 100)')
     .style('fill', '#36A571')
     
     
     // Draw the gauge arc based on the total productive hours
     const productiveArc = svg.append('path')
     .datum({ endAngle: 0 })
     .attr('class', 'arc')
     .attr('d', arc as any)
     .attr('transform', 'translate(150, 100)')
     .style('fill', '#373c9e');
     
     // Add the text label for the total productive hours
     svg.append('text')
     .attr('class', 'label')
     .attr('x', 150)
     .attr('y', 100)
     .attr('text-anchor', 'middle')
     .text(`${totalProductiveHours} hours`);
     
     // Add the text label for the maximum productive hours
     svg.append('text')
     .attr('class', 'max-label')
     .attr('x', 150)
     .attr('y', 130)
     .attr('text-anchor', 'middle')
     .text(`Max: ${maxProductiveHours} hours`);
     // Add the indicator line
     const indicatorLine  = svg.append('line')
       .attr('class', 'indicator-line')
       .attr('x1', 150)
       .attr('y1', 100)
       .attr('x2', 150)
       .attr('y2', 60);
     
      //effect
      // Add the hover effect to the productiveArc
                
      
      
    

      
    })



    //Table
    this.dataService.getData().subscribe((res:any)=>{
      this.empTableData = res;
      //console.table(this.empTableData)
      this.dataSource =   new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
    
      
      
     
    })

   

  }


    logout(){
      localStorage.removeItem('admin');
      window.location.reload()
    }
  

 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
  }
 

//////Bar Chart////
  chart() {

    this.http.get('http://localhost:3000/employees').subscribe((data: any) => {
      const employees: { id: number, name: string, leaves: number }[] = data;
      //console.log(employees);

      //setting diamensions
      const margin = { top: 20, right: 30, bottom: 40, left: 90 }
      const width = 350
      const height = 340

      // setting up svg object to body
      const svg = d3.select('#d3')
        .append('svg')
        .attr('width', 470)
        .attr('height', 400)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      //x axis
      const x = d3.scaleLinear()
        .domain([0, 10])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      //y axis
      const y = d3.scaleBand()
        .range([0, height])
        .domain(employees.map((d) => d.name))
        .padding(0.1);
      svg.append("g")
        .call(d3.axisLeft(y))

      //setting bars
      svg.selectAll("myRect")
        .data(employees)
        .join("rect")
        .attr("x", x(0))
        .attr("y", (d) => y(d.name)!)
        .attr("width", 0)

        .attr("height", y.bandwidth() - 10)
        .attr("fill", (d) => {
          if (d.leaves >= 4) {
            return "#FF0800";
          } else {
            return "#373c9e";
          }
        })
        .transition()
        .duration(1000)
        .attr("width", (d) => x(d.leaves))


      // Add x-axis title
      svg.append("text")
        .attr("transform", "translate(" + (180) + " ," + (380) + ")")
        .style("text-anchor", "middle")
        .text("Number of Leaves");


    })

  }



  ////////Donut Chart////////
  createChart() {
    const width = 500;
    const height = 500;
    const margin = 50;
   


    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const radius = Math.min(width, height) / 2 - margin;

    const pie = d3.pie<Employee>()
      //.value(d => d.count);
      .value(10);

    const arc = d3.arc<any, PieArcDatum<Employee>>()
      .innerRadius(100)
      .outerRadius(radius);

    const color = d3.scaleOrdinal()
      .domain(this.employeeZ.map(d => d.status))
      //.range(d3.schemeCategory10);
      .range(['#ED5F00' , '#FFCE00'])

    const arcs = svg.selectAll("arc")
      .data(pie(this.employeeZ))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

      arcs.append("path")
          .attr("d", arc)
          .attr("fill", (d: PieArcDatum<Employee>) => color(d.data.status) as string);

    arcs.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => d.data.name);

      
    // Filter active and inactive employees
    const activeEmployees = this.employeeZ.filter(d => d.status === "active");
    const inactiveEmployees = this.employeeZ.filter(d => d.status === "inactive");
        // Display counts of active and inactive employees
        svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 20)
        .attr("text-anchor", "middle")
        .text(`Active: ${activeEmployees.length}, Inactive: ${inactiveEmployees.length}`);

      

     

      
  }


  ////A table displaying the list of all employees





  deleteEmployee(id:number){
    let msg = this._snackBar.open('Data Deleted From Record','OK',{
      duration: 2000
    })
    this.dataService.deleteEmpId(id).subscribe({
      
      next() {
        //alert('Data Deleted');
        msg
       
        
        window.location.reload()
       
        
          
      },
      error(err) {
        console.log(err);
        
          
      },
    })
  }



  editform(data : any){
    this.dialogue.open(EmpAddEditComponent , {
      data,
    })
  }

  view(id:number){

    // this.dataService.ViewEmp(id).subscribe((res)=>{
    //   this.dialogue.open(EmpViewAdminComponent)
      
      
      

    // })

    this.dataService.ViewEmp(id).subscribe((res)=>{
      const dialogRef = this.dialogue.open(EmpViewAdminComponent, {
        data: res // Pass the employee data to the EmpViewAdminComponent
      });
    })

  }



 


  showLeaveDetails(){
    this.dataService.getLeaveData().subscribe(res=>{
      res
      this.notifications =res
      this.notificationCount++
    
  })




  

}

}
