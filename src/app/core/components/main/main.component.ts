import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../menu/menu.component';
import { SubmenuComponent } from '../submenu/submenu.component';
import { LogoComponent } from "../logo/logo.component";
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    imports: [CommonModule, MenuComponent, SubmenuComponent, LogoComponent, CardComponent]
})
export class MainComponent {}
