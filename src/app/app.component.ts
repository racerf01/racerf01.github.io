import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  cards = [
    { title: 'Card 1', selected: false },
    { title: 'Card 2', selected: false },
    { title: 'Card 3', selected: false },
    { title: 'Card 4', selected: false },
    { title: 'Card 5', selected: false },
    { title: 'Card 6', selected: false },
    { title: 'Card 7', selected: false },
    { title: 'Card 8', selected: false },
    { title: 'Card 9  ', selected: false },
    // Add more cards as needed
  ];

  constructor(private cdr: ChangeDetectorRef) {}
  selectedCardIndices: number[] = [];

  toggleSelect(index: number): void {
    this.cards[index].selected = !this.cards[index].selected;
    if (this.cards[index].selected) {
      this.selectedCardIndices.push(index);
    } else {
      const selectedIndex = this.selectedCardIndices.indexOf(index);
      if (selectedIndex !== -1) {
        this.selectedCardIndices.splice(selectedIndex, 1);
      }
    }
    // Sort selectedCardIndices to ensure they are in ascending order based on their position in the cards array
    this.selectedCardIndices.sort((a, b) => a - b);
  }

  isFirstSelected(index: number): boolean {
    // Check if this card is the first in the sorted list of selected indices
    return this.selectedCardIndices[0] === index;
  }

  isLastSelected(index: number): boolean {
    // Check if this card is the last in the sorted list of selected indices
    return this.selectedCardIndices[this.selectedCardIndices.length - 1] === index;
  }

  deleteSelectedCards(): void {
    console.log('Deleting selected cards', this.selectedCardIndices);
    this.cards = this.cards.filter((_, index) => !this.selectedCardIndices.includes(index));
    this.selectedCardIndices = [];
    console.log('Remaining cards:', this.cards);
  }
  
  drop(event: CdkDragDrop<string[]>) {
    // Reorder the cards array
    moveItemInArray(this.cards, event.previousIndex, event.currentIndex);
  
    // Update selectedCardIndices to reflect the new order of selected cards
    this.selectedCardIndices = this.selectedCardIndices.map(index =>
      index === event.previousIndex
        ? event.currentIndex
        : index > event.previousIndex && index <= event.currentIndex
        ? index - 1
        : index < event.previousIndex && index >= event.currentIndex
        ? index + 1
        : index
    );
  
    this.cdr.detectChanges(); // Manually trigger change detection
  }
  
  
  

  onDrop(event: CdkDragDrop<string[]>) {
    console.log('Card dropped:', event);
  }
  
  
}
