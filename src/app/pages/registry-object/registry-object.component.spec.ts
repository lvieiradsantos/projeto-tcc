import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryObjectComponent } from './registry-object.component';

describe('RegistryObjectComponent', () => {
  let component: RegistryObjectComponent;
  let fixture: ComponentFixture<RegistryObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistryObjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistryObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
