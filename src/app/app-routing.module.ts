import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'heroes', component: HeroesComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: HeroDetailComponent },
    { path: 'home', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'patient', component: PatientFormComponent },
    { path: 'implicit/callback', component: OktaCallbackComponent },
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
    declarations: []
})
export class AppRoutingModule { }
