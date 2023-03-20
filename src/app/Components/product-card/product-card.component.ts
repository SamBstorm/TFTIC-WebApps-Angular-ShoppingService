import { ShoppingService } from './../../Services/shopping.service';
import { IProduct } from './../../Models/iproduct';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() id! : number;
  product! : IProduct;
  @Output() refreshEvent : EventEmitter<null> = new EventEmitter();

  constructor(private _service : ShoppingService){}

  ngOnInit(): void {
    this.product = this._service.getOne(this.id);
  }

  delete() : void{
    this._service.delete(this.id);
    this.refreshEvent.next(null);
  }

  addOne() : void{
    this._service.addQuantity(this.id);
    this.refreshEvent.next(null);
  }

  subOne() : void{
    this._service.subQuantity(this.id);
    this.refreshEvent.next(null);
  }
}
