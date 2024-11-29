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
  isEditingTitle: boolean = false;

  @ViewChild('titleInput') titleInput!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private documentService: DocumentService
  ) {
    this.saveSubject.pipe(
      debounceTime(1000)
    ).subscribe(content => {
      this.saveDocument(content);
    });
  }

  ngOnInit() {
    marked.setOptions({
      breaks: true,
      gfm: true,
      pedantic: false
    });

    this.route.queryParams.subscribe((params: any) => {
      if (params.id) {
        this.documentService.getDocumentById(params.id).subscribe({
          next: (res) => {
            this.document = res;
            if (this.document.content && this.document.content.trim() !== '') {
              this.isEditMode = false;
            }
            this.updatePreview();
            this.isLoading = false;
          },
          error: (err) => {
            console.error('Erro ao carregar o documento:', err);
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

  updatePreview() {
    if (this.document && this.document.content) {
      try {
        const html = marked.parse(this.document.content, {
          breaks: true,
          gfm: true,
          pedantic: false
        }) as string;
        
        this.renderedContent = html.replace(
          /<hr>/g, 
          '<hr style="margin: 2rem 0; border: 0; border-top: 1px solid #eee;">'
        );
      } catch (error) {
        console.error('Erro ao renderizar o MK:', error);
        this.renderedContent = 'Erro ao renderizar o conteudo';
      }
    }
  }

  saveDocument(content: string) {
    if (this.document) {
      this.document.content = content;
      this.documentService.updateDocument(this.document.id, this.document).subscribe({
        next: () => {
          console.log('Documento Salvo!');
        },
        error: (err) => {
          console.error('Erro ao Salvar:', err);
        }
      });
    }
  }

  startTitleEdit() {
    this.isEditingTitle = true;
    setTimeout(() => {
      if (this.titleInput) {
        this.titleInput.nativeElement.focus();
      }
    }, 0);
  }

  saveDocumentName() {
    if (this.document && this.titleInput) {
      const newName = this.titleInput.nativeElement.value.trim();
      if (newName && newName !== this.document.name) {
        this.document.name = newName;
        this.documentService.updateDocument(this.document.id, this.document).subscribe({
          next: () => {
            console.log('Documento Salvo!');
          },
          error: (err) => {
            console.error('Erro ao salvar:', err);
          }
        });
      }
      this.isEditingTitle = false;
    }
  }

  ngOnDestroy() {
    this.saveSubject.complete();
  }
}