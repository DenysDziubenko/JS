import { Component, OnInit } from '@angular/core';
import { Thing } from '../thing';
import { ThingService } from '../thing.service';

@Component({
  selector: 'app-things',
  templateUrl: './things.component.html',
  styleUrls: ['./things.component.css']
})
export class ThingsComponent implements OnInit {

  things: Thing[];

  constructor(private thingService: ThingService) { }

  ngOnInit() {
    this.getThings();
  }

  getThings(): void {
    this.thingService.getThings()
      .subscribe(things => this.things = things);
  }

  add(name: string, score: string, description: string): void {
    name = name.trim();
    let scores = +score.trim();
    description = description.trim();
    if (!name) { return; }
    this.thingService.addThing({ name, scores, description } as Thing)
      .subscribe(thing => {
        this.things.push(thing);
        this.things = this.things.sort((thingA, thingB) =>{ return thingB.scores - thingA.scores});
      });

  }

  delete(thing: Thing): void {
    this.things = this.things.filter(h => h !== thing);
    this.thingService.deleteThing(thing).subscribe();
  }

}
