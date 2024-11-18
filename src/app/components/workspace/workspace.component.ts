import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {

  ngOnInit(): void {
    //recarrega a pagina
    if (!localStorage.getItem('workspaceLoaded')) {
      localStorage.setItem('workspaceLoaded', 'true');
      window.location.reload();
    }
  }

}
