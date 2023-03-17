import { IProduct } from './../../Models/iproduct';
import { Component } from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent {
  products : IProduct[] = [
    {id : 1, name:"Pomme", price:0.99, promo:0.5, quantity:6}
  ];

  name! : string;
  price! : number;
  promo? : number;
  quantity! : number;

  total : number;

  constructor(){
    this.total = this.CalculTotal();
  }

  CalculTotal() : number {
    return this.products
                  .map(
                      p => p.quantity * ( (p.promo)? p.promo : p.price)
                    )
                  .reduce(
                    (sum, value) => sum + value, 0
                    )}

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
      id : (this.products.length > 0) ? Math.max(... this.products.map( p => p.id)) + 1 : 1,
      name : this.name.trim(),
      price : this.price,
      promo : this.promo,
      quantity : this.quantity
    };
    this.products.push(newProduct);
    this.clearFormular();
    this.total = this.CalculTotal();
  }

  private clearFormular(){
    this.name = "";
    this.price = 0;
    this.promo = undefined;
    this.quantity = 0;
  }

  onDelete(productId : number) : void{
    this.products = this.products.filter(p => p.id != productId);
    this.total = this.CalculTotal();
  }

  onAdd(productId : number) : void {
    let prod : IProduct | undefined = this.products.find(p => p.id == productId);
    if(prod){ prod.quantity ++; }
    this.total = this.CalculTotal();
  }

  onSub(productId : number) : void {
    let prod : IProduct | undefined = this.products.find(p => p.id == productId);
    if(prod && prod.quantity <= 1) this.onDelete(productId);
    else if(prod) prod.quantity --;
    this.total = this.CalculTotal();
  }
}
