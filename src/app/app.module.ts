import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgbModule, NgbDropdown, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { GridModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';

import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroService } from './services/hero.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './services/message.service';
import { AppRoutingModule } from './/app-routing.module';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { TokenInterceptor } from './shared/interceptors/token-interceptor';
import { ErrorInterceptor } from './shared/interceptors/error-interceptor';
import { HeaderInterceptor } from './shared/interceptors/header-interceptor';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { LookupComponent } from './lookup/lookup.component';
import { PatientFormComponent } from './patient/patient-form/patient-form.component';
import { GeneralInfoComponent } from './patient/general-info/general-info.component';
import { AdditionalInfoComponent } from './patient/additional-info/additional-info.component';
import { GridComponent } from './grid/grid.component';
import { GridSettingsService } from './services/grid-settings.service';
import { appReducers } from './app.reducers';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { PatientEffects } from './patient/effects';
import { EffectsModule } from '@ngrx/effects';
import { storeLogger } from 'ngrx-store-logger';
import { IAppState } from './app.store';
import { ToastOptions } from 'ng2-toastr/src/toast-options';
import { CustomToastOption } from './shared/config/custom-toast-options';
import CustomErrorHandler from './shared/config/custom-error-handler';
import { oktaConfig } from './shared/config/okta-config';
import { OktaAuthModule } from '@okta/okta-angular';
import { AuthGuard } from './shared/guards/auth.guard';
import { OktaAuthService } from '@okta/okta-angular/dist/okta/okta.service';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { NgDragDropModule } from 'ng-drag-drop';
import { DashboardSettingsBarComponent } from './dashboard/dashboard-settings-bar/dashboard-settings-bar.component';
import { DashboardTableComponent } from './dashboard/dashboard-table/dashboard-table.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PermissionService } from './services/permission.service';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { ModalService } from './services/modal.service';
import { SharedModule } from './shared/shared.module';

export function logger(reducer: ActionReducer<IAppState>): any {
    // default, no options
    return storeLogger()(reducer);
}

export const metaReducers = /*environment.production ? [] :*/[logger];

@NgModule({
    declarations: [
        AppComponent,
        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent,
        DashboardComponent,
        HeroSearchComponent,
        RegisterComponent,
        LoginComponent,
        NavigationComponent,
        LookupComponent,
        PatientFormComponent,
        GeneralInfoComponent,
        AdditionalInfoComponent,
        GridComponent,
        DashboardSettingsBarComponent,
        DashboardTableComponent,
        ConfirmModalComponent
    ],
    imports: [
		SharedModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        NgbModule.forRoot(),
        GridModule,
        ExcelModule,
        StoreModule.forRoot(appReducers, { metaReducers }),
        EffectsModule.forRoot([PatientEffects]),
        ToastModule.forRoot(),
        BrowserAnimationsModule,
        OktaAuthModule.initAuth(oktaConfig),
        NgDragDropModule.forRoot()
		/*HttpClientInMemoryWebApiModule.forRoot(
			InMemoryDataService, { dataEncapsulation: false }
		)*/
    ],
    providers: [
        HeroService,
        MessageService,
        AuthService,
        GridSettingsService,
        NgbDropdown,
        PermissionService,
        ModalService,
        AuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true
        },
        {
            provide: ToastOptions,
            useClass: CustomToastOption
        },
        {
            provide: ErrorHandler,
            useClass: CustomErrorHandler
        },
        {
            provide: AuthService,
            useClass: OktaAuthService
        }
    ],
    entryComponents: [
        ConfirmModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
