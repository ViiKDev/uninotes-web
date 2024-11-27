import { Component, OnInit, TrackByFunction } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  documentsList: any[] = []; // Certifique-se de que os serviços retornem um array
  foldersList: any[] = [];
  searchQuery: string = '';
  isGridView: boolean = true;
  activeFolder: any = null;

  constructor(
    private documentService: DocumentService,
    private folderService: FolderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (documents) => {
        if (Array.isArray(documents)) {
          this.documentsList = documents; // Garantindo que seja array
        } else {
          console.error('Dados de documentos não são um array:', documents);
        }
      },
      error: (err) => console.error('Erro ao carregar documentos:', err),
    });
  
    this.folderService.getAllFolders().subscribe({
      next: (folders) => {
        if (Array.isArray(folders)) {
          this.foldersList = folders; // Garantindo que seja array
        } else {
          console.error('Dados de pastas não são um array:', folders);
        }
      },
      error: (err) => console.error('Erro ao carregar pastas:', err),
    });
  }

  onClickCreateNewFolder(): void {
    const folderName = prompt('Digite o nome da pasta:');
    if (!folderName?.trim()) return;

    const newFolder = {
      name: folderName.trim(),
      userId: this.authService.getUserId(),
      documents: [],
    };

    this.folderService.createFolder(newFolder).subscribe({
      next: (folder: any) => {
        this.foldersList = [...this.foldersList, folder];
      },
      error: (err) => alert(`Erro ao criar pasta: ${err.error.message}`),
    });
  }

  onClickCreateNewDocument(): void {
    const docName = prompt('Digite o nome do documento:');
    if (!docName?.trim()) return;

    const newDocument = {
      name: docName.trim(),
      content: '',
      userId: this.authService.getUserId(),
      folderId: this.activeFolder?.id || null,
    };

    this.documentService.createDocument(newDocument).subscribe({
      next: (doc: any) => {
        this.documentsList = [...this.documentsList, doc];
        this.router.navigate(['document-editor'], { queryParams: { id: doc.id } });
      },
      error: (err) => alert(`Erro ao criar documento: ${err.error.message}`),
    });
  }

  onDelete(event: { type: 'folder' | 'file'; item: any }): void {
    if (event.type === 'folder') {
      this.foldersList = this.foldersList.filter(f => f.id !== event.item.id);
      if (this.activeFolder?.id === event.item.id) {
        this.activeFolder = null;
      }
    } else if (event.type === 'file') {
      this.documentsList = this.documentsList.filter(d => d.id !== event.item.id);
    }
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  setActiveFolder(folder: any): void {
    this.activeFolder = folder;
  }

  getFilteredFolders(): any[] {
    return this.searchQuery
      ? this.foldersList.filter(folder =>
          folder.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : this.foldersList;
  }

  getFilteredDocuments(): any[] {
    let filteredDocs = this.activeFolder
      ? this.documentsList.filter(doc => doc.folderId === this.activeFolder.id)
      : this.documentsList;

    return this.searchQuery
      ? filteredDocs.filter(doc =>
          doc.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : filteredDocs;
  }

  openDocument(doc: any): void {
    this.router.navigate(['document-editor'], { queryParams: { id: doc.id } });
  }

  trackById(index: number, item: any): number {
    return item.id;
  }
}
