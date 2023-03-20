import { ShoppingService } from './../../Services/shopping.service';
import { IProduct } from './../../Models/iproduct';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  products : IProduct[] = [];

  name! : string;
  price! : number;
  promo? : number;
  quantity! : number;

  total! : number;

  constructor(private _service: ShoppingService){}

  ngOnInit(): void {
    this.onRefresh();
  }

  AddProduct(): void{
    if(!this.name || this.name.trim().length <= 0 ) {
      this.clearFormular();
      return;
    }
    if(!this.price || this.price <= 0 ) {
      this.clearFormular();
      return;
    }
    if(this.promo && this.promo >= this.price ) {
      this.clearFormular();
      return;
    }
    if(!this.quantity || this.quantity <= 0 ) {
      this.clearFormular();
      return;
    }
    let newProduct : IProduct = {
      id : 0,
      name : this.name.trim(),
      price : this.price,
      promo : this.promo,
      quantity : this.quantity
    };
    this._service.insert(newProduct);
    this.clearFormular();
    this.onRefresh();
  }

  private clearFormular(){
    this.name = "";
    this.price = 0;
    this.promo = undefined;
    this.quantity = 0;
  }
  public onRefresh():void{
    this.products = this._service.getAll();
    this.total = this._service.calculTotal();
  }
}
