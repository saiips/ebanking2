import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  courses: string[];
  token: string;

  ngOnInit(): void {
    console.log("ngOnInit");
  }  

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute, 
              private http: Http) {
                
    console.log(http);
    
    let headers = new Headers();
    this.http.get('/api/courses', { headers : headers})
      .pipe(map(res => res.json()))
      .subscribe(
        courses => this.courses = courses,
        err => console.log(err)
      );

  }


}
