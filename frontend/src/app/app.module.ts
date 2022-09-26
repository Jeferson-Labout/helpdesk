import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ChamadoComponent } from './chamado/chamado.component';
import { ClienteComponent } from './cliente/cliente.component';
import { LoginComponent } from './login/login.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { BodyComponent } from './body/body.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
// Para trabalhar com formulários no Angular 12
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Para realizar requisições HTTP
import { HttpClientModule } from '@angular/common/http';

// Imports para componentes do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskModule } from 'ngx-mask';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { TecnicoCreateComponent } from './tecnico/tecnico-create/tecnico-create.component';
import { ClienteCreateComponent } from './cliente/cliente-create/cliente-create.component';
import { ChamadoCreateComponent } from './chamado/chamado-create/chamado-create.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkMenuModule } from '@angular/cdk/menu';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { PaginacaoComponent } from './modalShared/paginacao/paginacao.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {PaginatorModule} from 'primeng/paginator';
import { ChartjsModule } from '@coreui/angular-chartjs';



@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    HeaderComponent,
    ChamadoComponent,
    ClienteComponent,
    LoginComponent,
    TecnicoComponent,
    BodyComponent,
    TecnicoCreateComponent,
    ClienteCreateComponent,
    ChamadoCreateComponent,
    PaginacaoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Forms
    FormsModule,
    ReactiveFormsModule,
    // Requisições http
    HttpClientModule,
    // Angular Material
    MatFormFieldModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatRadioModule,
    MatTableModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    DialogModule,
    ButtonModule,
    TableModule,
    OverlayModule,
    MenuModule,
    RippleModule,    
    CdkMenuModule,
    AngularSvgIconModule,
    NgxPaginationModule,
    PaginatorModule,
    ChartjsModule,
    PaginationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    NgxMaskModule.forRoot()

  ],
  providers: [AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
