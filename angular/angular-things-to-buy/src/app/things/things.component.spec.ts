import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ThingService } from '../thing.service';
import { ThingsComponent } from './things.component';
import {HttpClientModule} from "@angular/common/http";

describe('ThingsComponent', () => {
  let component: ThingsComponent;
  let fixture: ComponentFixture<ThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingsComponent ],
      providers: [ThingService],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
