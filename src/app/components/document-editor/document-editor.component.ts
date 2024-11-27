import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { debounceTime, Subject } from 'rxjs';
import { marked } from 'marked';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {
  isSaving: any;
  saveStatus: any;
  document: any = null;
  private saveSubject = new Subject<string>();
  isLoading: boolean = true;
  isEditMode: boolean = true;
  renderedContent: string = '';
  isEditingTitle: boolean = false;  // Variável para controlar o modo de edição do título
  
  @ViewChild('titleInput') titleInput!: ElementRef;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private documentService: DocumentService
  ) {
    // Configure autosave com debounce
    this.saveSubject.pipe(
      debounceTime(1000) // Espera 1 segundo após a última mudança
    ).subscribe(content => {
      this.saveDocument(content);
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.documentService.getDocumentById(params.id).subscribe({
          next: (res) => {
            this.document = res;
            this.updatePreview();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Error loading document:', err);
            this.isLoading = false;
          }
        });
      }
    });
  }

  onContentChange(event: any) {
    if (this.document) {
      const content = event.target.value;
      this.document.content = content;
      this.saveSubject.next(content);
      this.updatePreview();
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.updatePreview();
    }
  }

  async updatePreview() {
    if (this.document && this.document.content) {
      try {
        this.renderedContent = await marked(this.document.content);
      } catch (error) {
        console.error('Error rendering markdown:', error);
        this.renderedContent = 'Error rendering content';
      }
    }
  }

  saveDocument(content: string) {
    if (this.document) {
      this.document.content = content;
      this.documentService.updateDocument(this.document.id, this.document).subscribe({
        next: () => {
          console.log('Document saved successfully!');
        },
        error: (err) => {
          console.error('Error saving document:', err);
        }
      });
    }
  }

  // Função para iniciar a edição do título
  startTitleEdit() {
    this.isEditingTitle = true;
    setTimeout(() => {
      if (this.titleInput) {
        this.titleInput.nativeElement.focus();  // Foca no campo de texto ao começar a edição
      }
    }, 0);
  }

  // Função para salvar o nome do documento após a edição
  saveDocumentName() {
    if (this.document && this.titleInput) {
      const newName = this.titleInput.nativeElement.value.trim();
      if (newName && newName !== this.document.name) {
        this.document.name = newName;  // Atualiza o nome do documento
        // Aqui, você pode adicionar uma chamada ao backend para atualizar o nome do documento
        this.documentService.updateDocument(this.document.id, this.document).subscribe({
          next: () => {
            console.log('Document name saved successfully!');
          },
          error: (err) => {
            console.error('Error saving document name:', err);
          }
        });
      }
      this.isEditingTitle = false;  // Sai do modo de edição
    }
  }

  ngOnDestroy() {
    this.saveSubject.complete();
  }
}
