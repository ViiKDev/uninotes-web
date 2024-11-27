import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { FolderService } from 'src/app/services/folder.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  documentsList: any = [];
  foldersList: any = [];
  constructor(private documentService: DocumentService, private folderService: FolderService, private auth: AuthService) { }
  ngOnInit(): void {
    this.documentService.getAllDocuments().subscribe({
      next: (res) => { this.documentsList = res },
      error: (err) => { console.log(err.error) }
    });
    this.folderService.getAllFolders().subscribe({
      next: (res) => { this.foldersList = res },
      error: (err) => { console.log(err.error) }
    });
  }
  onClickCreateNewFolder() { 
    const folderName = prompt("Digite o nome da nova pasta: ");
    if(!folderName){
      console.error("Nome da pasta é obrigatório!");
      return;
    }

    let folder = {
      name: folderName,
      documents: []
    }
    this.folderService.createFolder(folder).subscribe({
      next: (res) => {
        this.foldersList.push(folder);
      },
      error: (err) => { console.error(err.error) }
    });
  }
  onClickCreateNewDocument() {
    const documentName = prompt("Digite o nome do documento: ");
    if(!documentName){
      console.error("Nome do documento é obrigatório!");
      return;
    }

    let document = {
      name: documentName,
      content: "",
      folderId: null
    }
    this.documentService.createDocument(document).subscribe({
      next: (res) => {
        this.documentsList.push(document);
      },
      error: (err) => { console.error(err.error) }
    });
  }

  onDelete(event: any) {
    console.log(event)
    if (event.type == 'folder') {
      this.foldersList.splice(this.foldersList.indexOf(event.item), 1)
    } else if (event.type == 'file') {
      this.documentsList.splice(this.documentsList.indexOf(event.item), 1)
    }
  }
}