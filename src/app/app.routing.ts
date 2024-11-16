import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);