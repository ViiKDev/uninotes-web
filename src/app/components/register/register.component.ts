import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class RegisterComponent {
  registerForm!: FormGroup;

  showPassword: Boolean = false;

  constructor(private auth: AuthService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onClickRegister(): void {
    this.auth.register(this.registerForm.value).subscribe(
      {
        next: (res: any) => { this.registerForm.reset(); alert("Usuario registrado! Por favor faca o login") },
        error: (err: any) => { console.error(err.error.message) }
      }
    );
  }

  showPasswordClick(event: any): void {
    this.showPassword = !this.showPassword;
  }
}
