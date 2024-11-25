import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss']
})
export class DocumentEditorComponent implements OnInit {
  document: any;
  constructor(private route: ActivatedRoute, private documentService: DocumentService) { }
  ngOnInit() {
    this.route.queryParams
      .subscribe((params: any) => {
        this.documentService.getDocumentById(params.id).subscribe({ next: (res) => { this.document = res } });
      });
  }
}
