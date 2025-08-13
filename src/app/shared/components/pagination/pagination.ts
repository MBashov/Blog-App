import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-pagination',
    imports: [],
    templateUrl: './pagination.html',
    styleUrl: './pagination.css'
})
export class Pagination {
    @Input() currentPage = 1;
    @Input() totalBlogs = 0;
    @Input() blogsPerPage = 12;

    @Output() pageChange = new EventEmitter<number>();

    get totalPages(): number {
        return Math.ceil(this.totalBlogs / this.blogsPerPage);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.pageChange.emit(this.currentPage);
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.pageChange.emit(this.currentPage);
        }
    }
}
