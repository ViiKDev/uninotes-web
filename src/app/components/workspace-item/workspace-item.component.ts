import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-workspace-item',
  templateUrl: './workspace-item.component.html',
  styleUrls: ['./workspace-item.component.scss']
})
export class WorkspaceItemComponent {
  @Input() item: any;
  @Input() icon: string = '';
  @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

  optionsMenuActive: boolean = false;

  constructor(
    private folderService: FolderService,
    private documentService: DocumentService,
    private router: Router
  ) { }

  onClickToggleMenu(event: Event): void {
    event.stopPropagation();
    this.optionsMenuActive = !this.optionsMenuActive;
  }

  onClickDelete(event: Event): void {
    event.stopPropagation();
    const confirmDelete = confirm('Tem certeza que deseja deletar este item?');
    if (!confirmDelete) return;

    if (this.icon === "fa-folder") {
      this.folderService.deleteFolder(this.item.id).subscribe({
        next: () => {
          this.deleteEmitter.emit({ type: 'folder', item: this.item });
        },
        error: (err) => console.error('Erro ao deletar pasta:', err)
      });
    } else if (this.icon === "fa-file") {
      this.documentService.deleteDocument(this.item.id).subscribe({
        next: () => {
          this.deleteEmitter.emit({ type: 'file', item: this.item });
        },
        error: (err) => console.error('Erro ao deletar documento:', err)
      });
    }
    this.optionsMenuActive = false;
  }

  onClickOpenDocument(event: Event): void {
    event.stopPropagation();
    if (this.icon === "fa-file") {
      this.router.navigate(['document-editor'], { queryParams: { id: this.item.id } });
    }
  }
}