import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Eb2LoginComponent } from './eb2login.component';

describe('Eb2LoginComponent', () => {
  let component: Eb2LoginComponent;
  let fixture: ComponentFixture<Eb2LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Eb2LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Eb2LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
