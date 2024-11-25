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
  constructor(private folderService: FolderService, private documentService: DocumentService, private router: Router) { }

  onClickToggleMenu() {
    this.optionsMenuActive = !this.optionsMenuActive;
  }
  onClickDelete() {
    if (this.icon == "fa-folder") {
      this.folderService.deleteFolder(this.item.id).subscribe({
        next: () => {
          this.deleteEmitter.emit({ type: 'folder', item: this.item })
        }
      });
    } else if (this.icon == "fa-file") {
      this.documentService.deleteDocument(this.item.id).subscribe({
        next: () => {
          this.deleteEmitter.emit({ type: 'file', item: this.item })
        }
      });
    }
    this.onClickToggleMenu();
  }
  onClickOpenDocument() {
    if (this.icon == "fa-file") {
      this.router.navigate([`document-editor`], { queryParams: { id: this.item.id } })
    }
  }
}
