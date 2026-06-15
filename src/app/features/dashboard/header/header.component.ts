import { Component, inject } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  imports: [ButtonModule, PanelModule],
})
export class HeaderComponent {
  themeService = inject(ThemeService);
}
