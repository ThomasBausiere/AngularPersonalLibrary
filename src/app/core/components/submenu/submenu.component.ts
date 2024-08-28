import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";

@Component({
    selector: 'app-submenu',
    standalone: true,
    templateUrl: './submenu.component.html',
    styleUrls: ['./submenu.component.css'],
    imports: [LogoComponent]
})
export class SubmenuComponent implements AfterViewInit, OnDestroy {

  // Variables pour stocker les timers et les éléments
  private timers: Map<HTMLElement, number> = new Map();
  private dropdownButtons: NodeListOf<HTMLElement>;
  private eventListeners: Map<HTMLElement, { [key: string]: EventListener }> = new Map();

  ngAfterViewInit() {
    if (typeof document !== 'undefined') {
      this.initializeDropdowns();
    }
  }

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      this.cleanupDropdowns();
    }
  }

  private initializeDropdowns() {
    this.dropdownButtons = document.querySelectorAll('.dropdown-button') as NodeListOf<HTMLElement>;

    this.dropdownButtons.forEach(button => {
      const dropdownMenu = button.nextElementSibling as HTMLElement;

      const cancelScheduledClose = () => {
        const timer = this.timers.get(button);
        if (timer) {
          clearTimeout(timer);
          this.timers.delete(button);
        }
      };

      const commonMouseOutAction = () => {
        cancelScheduledClose();
        this.timers.set(button, this.scheduleDropdownClose(button));
      };

      const buttonMouseOverListener = () => {
        this.closeAllDropdowns();
        cancelScheduledClose();
        this.toggleDropdown(dropdownMenu, 'add');
      };

      const buttonMouseOutListener = commonMouseOutAction;
      const dropdownMenuMouseOverListener = cancelScheduledClose;
      const dropdownMenuMouseOutListener = commonMouseOutAction;

      button.addEventListener('mouseover', buttonMouseOverListener);
      button.addEventListener('mouseout', buttonMouseOutListener);
      dropdownMenu.addEventListener('mouseover', dropdownMenuMouseOverListener);
      dropdownMenu.addEventListener('mouseout', dropdownMenuMouseOutListener);

      this.eventListeners.set(button, {
        mouseover: buttonMouseOverListener,
        mouseout: buttonMouseOutListener
      });

      this.eventListeners.set(dropdownMenu, {
        mouseover: dropdownMenuMouseOverListener,
        mouseout: dropdownMenuMouseOutListener
      });
    });
  }

  private cleanupDropdowns() {
    this.eventListeners.forEach((listeners, element) => {
      element.removeEventListener('mouseover', listeners['mouseover']);
      element.removeEventListener('mouseout', listeners['mouseout']);
    });

    this.eventListeners.clear();
  }

  private toggleDropdown(dropdownMenu: HTMLElement, action: 'add' | 'remove') {
    dropdownMenu.classList[action]('show');
  }

  private scheduleDropdownClose(button: HTMLElement): number {
    return window.setTimeout(() => {
      const dropdownMenu = button.nextElementSibling as HTMLElement;
      this.toggleDropdown(dropdownMenu, 'remove');
    }, 300);
  }

  private closeAllDropdowns() {
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      (menu as HTMLElement).classList.remove('show');
    });
  }
}
