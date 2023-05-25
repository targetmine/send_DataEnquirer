import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationPreviewTableComponent } from './relation-preview-table.component';

describe('RelationPreviewTableComponent', () => {
  let component: RelationPreviewTableComponent;
  let fixture: ComponentFixture<RelationPreviewTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelationPreviewTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelationPreviewTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
