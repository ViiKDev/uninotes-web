import { RouterModule, Routes } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { WorkspaceComponent } from "./components/workspace/workspace.component";
import { AuthGuard } from "./guards/auth.guard";

const APP_ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'workspace', component: WorkspaceComponent, canActivate: [AuthGuard] },
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(APP_ROUTES);