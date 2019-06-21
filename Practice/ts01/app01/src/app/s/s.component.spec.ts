import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SComponent } from './s.component';

describe('SComponent', () => {
  let component: SComponent;
  let fixture: ComponentFixture<SComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
