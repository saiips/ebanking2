import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '../../_services';
import { Courses } from '../../_models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  courses: Courses[] = [];

  constructor(private userService: UserService) {}  

  ngOnInit(): void {
    console.log("ListComponent::ngOnInit");

    this.userService.getCourses().pipe(first()).subscribe(courses => { 
      this.courses = courses; 
    });
  };    

   

}
