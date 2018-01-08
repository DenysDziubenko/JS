import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {TopThingsComponent } from './top-things.component';
import {ThingService} from "../thing.service";
import {RouterTestingModule} from "@angular/router/testing";
import {SearchThingsComponent} from "../search-things/search-things.component";
import {HttpClientModule} from "@angular/common/http";

describe('TopThingsComponent', () => {
  let component: TopThingsComponent;
  let fixture: ComponentFixture<TopThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopThingsComponent, SearchThingsComponent ],
      providers: [ ThingService ],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
