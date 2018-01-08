import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ThingService } from '../thing.service';
import { ThingDetailComponent } from './thing-detail.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";

describe('ThingDetailComponent', () => {
  let component: ThingDetailComponent;
  let fixture: ComponentFixture<ThingDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThingDetailComponent ],
      providers: [ThingService],
      imports: [ RouterTestingModule, FormsModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
