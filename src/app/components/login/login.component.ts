import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  showPassword: Boolean = false;

  constructor(private auth: AuthService, private fb: FormBuilder, private doc: DocumentService) {
    this.doc.getAllDocuments().subscribe({
      next: (data) => { console.log(data) },
      error: (err) => {
        console.error(err)
      }
    })
  }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onClickLogin(): void {
    this.auth.login(this.loginForm.value).subscribe(
      {
        next: (res: any) => { console.log(res) },
        error: (err: any) => { console.error(err.error.message) }
      }
    );
  }

  showPasswordClick(event: any): void {
    this.showPassword = !this.showPassword;
  }
}
