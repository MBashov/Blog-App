import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { User } from '../../models/user';
import { AuthService } from '../../core/services';

@Component({
    selector: 'app-header',
    imports: [RouterLink, CommonModule],
    templateUrl: './header.html',
    styleUrl: './header.css'
})
export class Header {
    constructor(private authService: AuthService, private router: Router) { }

    protected isProfileVisible: boolean = false;

    @HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent): void {
        const target = event.target as HTMLElement;

        if (!target.closest('.profile-wrapper')) {
            this.isProfileVisible = false;
        }
    }

    protected get isLoggedIn(): boolean {
        return this.authService.isLoggedIn();
    }

    protected get currentUser(): User | null {
        return this.authService.currentUser();
    }

    protected logout(): void {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/home']);
            },
            error: (err) => {
                console.log('Logout Failed', err);
            }
        });
    }

    protected toggleProfileModal(): void {
        this.isProfileVisible = !this.isProfileVisible;
    }
}
