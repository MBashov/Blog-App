import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-header',
    imports: [RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {
    constructor(private authService: AuthService, private router: Router) { }

    protected get isLoggedIn(): boolean {
        return this.authService.isLoggedIn;
    }

    protected get firstName(): string {
        return this.authService.user?.firstName || '';
    }

    protected logout(): void {
        this.authService.logout();
        this.router.navigate(['/home']);
    }
}
