import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SidebarComponent} from "./shared/sidebar/sidebar.component";
import {HeaderComponent} from "./shared/header/header.component";
import {DashboardContentComponent} from "./shared/dashboardContent/dashboardContent.component";
import {DashboardLayoutComponent} from "./layout/dashboard-layout/dashboard-layout.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, DashboardContentComponent, DashboardLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gestion_stock_angular';
}
