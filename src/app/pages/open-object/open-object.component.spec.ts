import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenObjectComponent } from './open-object.component';

describe('OpenObjectComponent', () => {
  let component: OpenObjectComponent;
  let fixture: ComponentFixture<OpenObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
