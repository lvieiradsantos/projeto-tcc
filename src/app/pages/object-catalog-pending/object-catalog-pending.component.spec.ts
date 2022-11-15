import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCatalogPendingComponent } from './object-catalog-pending.component';

describe('ObjectCatalogPendingComponent', () => {
  let component: ObjectCatalogPendingComponent;
  let fixture: ComponentFixture<ObjectCatalogPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCatalogPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectCatalogPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
