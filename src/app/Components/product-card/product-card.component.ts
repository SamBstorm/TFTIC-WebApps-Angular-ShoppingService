import { IProduct } from './../../Models/iproduct';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product! : IProduct;
  @Output() deleteEmitter : EventEmitter<number>;
  @Output() addEmitter : EventEmitter<number>;
  @Output() subEmitter : EventEmitter<number>;

  constructor(){
    this.deleteEmitter = new EventEmitter<number>();
    this.addEmitter = new EventEmitter<number>();
    this.subEmitter = new EventEmitter<number>();
  }

  delete() : void{
    this.deleteEmitter.next(this.product.id);
  }

  addOne() : void{
    this.addEmitter.next(this.product.id);

  }

  subOne() : void{
    this.subEmitter.next(this.product.id);
  }
}
