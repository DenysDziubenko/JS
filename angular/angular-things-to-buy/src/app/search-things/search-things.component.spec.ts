import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { SearchThingsComponent } from './search-things.component';
import { ThingService } from '../thing.service';
import { HttpClientModule} from '@angular/common/http';

describe('SearchThingsComponent', () => {
  let component: SearchThingsComponent;
  let fixture: ComponentFixture<SearchThingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchThingsComponent ],
      providers: [ThingService],
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchThingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
