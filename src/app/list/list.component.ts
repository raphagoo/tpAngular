import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users;
  dataSource;
  constructor(private http: HttpClient) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((response => {
      this.users = response;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    }));
  }

}
