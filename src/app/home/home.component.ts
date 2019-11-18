import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'tpAngular';
  change = false;
  changeTitle() {
    if (this.change === false) {
      this.title = 'changé';
      this.change = true;
    } else {
      this.title = 'tpAngular';
      this.change = false;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
