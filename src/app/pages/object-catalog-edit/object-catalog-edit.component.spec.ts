import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCatalogEditComponent } from './object-catalog-edit.component';

describe('ObjectCatalogEditComponent', () => {
  let component: ObjectCatalogEditComponent;
  let fixture: ComponentFixture<ObjectCatalogEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCatalogEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectCatalogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
