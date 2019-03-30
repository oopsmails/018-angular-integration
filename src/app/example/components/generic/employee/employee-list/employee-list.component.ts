import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '@app/example/model/employee';
import { OauthToken } from '@app/shared/model/oauthToken';
import { ClientType } from '@app/shared/services/user-token/user-token.service';

import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  public mockFisrt = new Employee('-1', 'mock first');
  public employees = new Array<Employee>();
  private resourceUrl = '/employee/';
  loading = true;

  oauthToken: OauthToken;

  constructor(private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    if (!window.sessionStorage.getItem('token')) {
      this.router.navigate(['example/sc/login']);
      return;
    }
    this.getInitData();
  }

  getInitData(): void {
    const userToken = this.employeeService.getUserToken(ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE);
    userToken.subscribe(
      (oauthToken) => {
        window.sessionStorage.setItem('token', JSON.stringify(oauthToken));
        this.employeeService.getEmployeeList(this.resourceUrl).subscribe(
          (employees) => {
            this.employees = employees;
            this.mockFisrt = this.employees[0];
            this.loading = false;
          },
          error => {
            console.log("Error: ", error);
            this.router.navigate(['example/sc/login']);
          }
        );
      }
    );
  }

}
