import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentEditorComponent } from './document-editor.component';

describe('DocumentEditorComponent', () => {
  let component: DocumentEditorComponent;
  let fixture: ComponentFixture<DocumentEditorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DocumentEditorComponent]
    });
    fixture = TestBed.createComponent(DocumentEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
