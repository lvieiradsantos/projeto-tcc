import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteObjectsCatalogComponent } from './favorite-objects-catalog.component';

describe('FavoriteObjectsCatalogComponent', () => {
  let component: FavoriteObjectsCatalogComponent;
  let fixture: ComponentFixture<FavoriteObjectsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoriteObjectsCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteObjectsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
