import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() card: any;
  @Input() isFirstSelected!: Function;
  @Input() isLastSelected!: Function;
  @Output() toggle = new EventEmitter<number>();
  @Output() deleteSelected = new EventEmitter<void>();

  toggleSelect(event: Event): void {
    event.stopPropagation(); // Prevent event bubbling
    this.toggle.emit(); // Emit toggle event
  }

  handleDragButtonClick(event: MouseEvent): void {
    console.log('Drag button clicked');
    event.stopPropagation();  // If you want to prevent event propagation
  }

  handleDeleteButtonClick(event: MouseEvent): void {
    console.log('Delete button clicked');
    this.deleteSelected.emit();  // Emit the delete event
    event.stopPropagation();  // Prevent further propagation of the event
  }
}
