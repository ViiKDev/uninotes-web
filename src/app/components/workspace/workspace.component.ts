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
  documentsList: any[] = [];
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
    Promise.all([
      this.documentService.getAllDocuments().toPromise(),
      this.folderService.getAllFolders().toPromise()
    ]).then(([documents, folders]) => {
      if (Array.isArray(documents)) {
        this.documentsList = documents;
      }
      if (Array.isArray(folders)) {
        this.foldersList = folders;
        if (this.activeFolder) {
          this.activeFolder = folders.find(f => f.id === this.activeFolder.id) || null;
        }
      }
    }).catch(err => {
      console.error('Erro ao carregar dados:', err);
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
        this.loadData();
      },
      error: (err) => {
        alert(`Erro ao criar pasta: ${err.error?.message || 'Erro desconhecido'}`);
        console.error('Erro ao criar pasta:', err);
      },
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
        
        if (this.activeFolder) {
          const updatedFolder = { 
            ...this.activeFolder,
            documents: [...(this.activeFolder.documents || []), doc]
          };
          this.activeFolder = updatedFolder;
          
          this.foldersList = this.foldersList.map(folder => 
            folder.id === updatedFolder.id ? updatedFolder : folder
          );
        }
        
        this.loadData();
        
        this.router.navigate(['document-editor'], { queryParams: { id: doc.id } });
      },
      error: (err) => {
        alert(`Erro ao criar documento: ${err.error?.message || 'Erro desconhecido'}`);
        console.error('Erro ao criar documento:', err);
      },
    });
  }

  onDelete(event: { type: 'folder' | 'file'; item: any }): void {
    if (event.type === 'folder') {
      if (!confirm(`Tem certeza que deseja excluir a pasta "${event.item.name}"?`)) {
        return;
      }

      this.folderService.deleteFolder(event.item.id).subscribe({
        next: () => {
          this.foldersList = this.foldersList.filter(f => f.id !== event.item.id);
          if (this.activeFolder?.id === event.item.id) {
            this.activeFolder = null;
          }
          this.loadData(); 
        },
        error: (err) => {
          alert(`Erro ao excluir pasta: ${err.error?.message || 'Erro desconhecido'}`);
          console.error('Erro ao excluir pasta:', err);
        }
      });
    } else if (event.type === 'file') {
      if (!confirm(`Tem certeza que deseja excluir o documento "${event.item.name}"?`)) {
        return;
      }

      this.documentService.deleteDocument(event.item.id).subscribe({
        next: () => {
          this.documentsList = this.documentsList.filter(d => d.id !== event.item.id);
          if (this.activeFolder) {
            this.activeFolder = {
              ...this.activeFolder,
              documents: (this.activeFolder.documents || []).filter((d: { id: any; }) => d.id !== event.item.id)
            };
          }
          this.loadData(); 
        },
        error: (err) => {
          alert(`Erro ao excluir documento: ${err.error?.message || 'Erro desconhecido'}`);
          console.error('Erro ao excluir documento:', err);
        }
      });
    }
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  setActiveFolder(folder: any): void {
    this.activeFolder = folder;
    this.loadData();
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