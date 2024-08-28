import { bootstrapApplication } from '@angular/platform-browser';
import { MainComponent } from './app/core/components/main/main.component';

bootstrapApplication(MainComponent).catch(err => console.error(err));