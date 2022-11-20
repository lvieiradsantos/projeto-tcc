import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostRatedComponent } from './most-rated.component';

describe('MostRatedComponent', () => {
  let component: MostRatedComponent;
  let fixture: ComponentFixture<MostRatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MostRatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostRatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
