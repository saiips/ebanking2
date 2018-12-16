import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services';
import { Courses } from '../../_models';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Courses[] = [];

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {}  

  ngOnInit(): void {
    console.log("ListComponent::ngOnInit");

    this.userService.getCourses()
      .subscribe(
        courses => { 
                this.courses = courses; 
        }
      );
  };    

  public refresh() {
    console.log("clicked refresh");
      this.authenticationService.refreshToken()
          .pipe(first())
          .subscribe(
              data => {
                  console.log("refresh completed "+ data);
              },
              error => {
                  console.log("refresh failed "+ error);
              });
  };

   

}
