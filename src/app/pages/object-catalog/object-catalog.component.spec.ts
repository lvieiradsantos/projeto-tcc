import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCatalogComponent } from './object-catalog.component';

describe('ObjectCatalogComponent', () => {
  let component: ObjectCatalogComponent;
  let fixture: ComponentFixture<ObjectCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
