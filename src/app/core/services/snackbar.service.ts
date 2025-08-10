import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnagBar } from '../../shared/components/custom-snag-bar/custom-snag-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
    constructor(private snackBar: MatSnackBar) { }

    show(message: string, type: 'success' | 'error', duration: number = 3000) {
        this.snackBar.openFromComponent(CustomSnagBar, {
            data: { message, type },
            duration,
            panelClass: ['custom-snackbar-panel'],
            horizontalPosition: 'right',
            verticalPosition: 'top',
        });
    }
}
