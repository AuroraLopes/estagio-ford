import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>Header</header>
    <router-outlet />
    <footer>Footer</footer>
  `,
  styles: ``,
})
export class AppComponent {

}
