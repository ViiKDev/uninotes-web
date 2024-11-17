import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;

  showPassword: Boolean = false;

  constructor(private auth: AuthService, private fb: FormBuilder, private router: Router) { }
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onClickLogin(): void {
    this.auth.login(this.loginForm.value).subscribe(
      {
        next: (res: any) => {
          this.auth.storeToken(res.token);
          this.loginForm.reset();
          this.router.navigate(['workspace']);
        },
        error: (err: any) => { console.error(err.error.message) }
      }
    );
  }

  showPasswordClick(event: any): void {
    this.showPassword = !this.showPassword;
  }
}
