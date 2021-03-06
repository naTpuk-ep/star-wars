import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { LayoutRoutingModule } from './layout-routing.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LayoutComponent } from './layout.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { JwtInterceptor } from '../auth/services/jwt-interceptor/jwt.interceptor';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { SideNavService } from './services/sidenav/side-nav.service';

@NgModule({
  declarations: [LayoutComponent, ToolbarComponent, SpinnerComponent, SideNavComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    SideNavService,
  ],
})
export class LayoutModule {}
