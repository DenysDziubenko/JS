import { Component, OnInit } from '@angular/core';
import { Thing } from '../thing';
import { ThingService } from '../thing.service';
@Component({
  selector: 'app-top-things',
  templateUrl: './top-things.component.html',
  styleUrls: ['./top-things.component.css']
})
export class TopThingsComponent implements OnInit {

  things: Thing[] = [];

  constructor(private thingService: ThingService) { }

  ngOnInit() {
    this.getThings();
  }

  getThings(): void {
    this.thingService.getThings()
      .subscribe(things => this.things = things.slice(0, 9));
  }

}
