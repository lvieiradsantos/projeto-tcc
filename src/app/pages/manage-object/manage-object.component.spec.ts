import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageObjectComponent } from './manage-object.component';

describe('ManageObjectComponent', () => {
  let component: ManageObjectComponent;
  let fixture: ComponentFixture<ManageObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
