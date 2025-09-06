import { Component } from '@angular/core';
import {SidebarComponent} from "../../shared/sidebar/sidebar.component";
import {HeaderComponent} from "../../shared/header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
