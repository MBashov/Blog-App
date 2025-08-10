import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
    selector: 'app-custom-snag-bar',
    imports: [CommonModule],
    templateUrl: './custom-snag-bar.html',
    styleUrl: './custom-snag-bar.css'
})
export class CustomSnagBar {
    constructor(
        public snackBarRef: MatSnackBarRef<CustomSnagBar>,
        @Inject(MAT_SNACK_BAR_DATA) public data: { message: string; type?: 'success' | 'error' }
    ) { }

    close() {
        this.snackBarRef.dismiss();
    }
}
