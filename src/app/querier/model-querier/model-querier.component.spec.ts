import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelQuerierComponent } from './model-querier.component';

describe('ModelQuerierComponent', () => {
  let component: ModelQuerierComponent;
  let fixture: ComponentFixture<ModelQuerierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelQuerierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelQuerierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
