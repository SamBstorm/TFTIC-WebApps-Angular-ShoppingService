import { IProduct } from './../Models/iproduct';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  private _products : IProduct[] = [
    {id : 1, name:"Pomme", price:0.99, promo:0.5, quantity:6}
  ];
  private _idMax: number = 1;

  constructor() { }

  public getAll() : IProduct[]{
    return [...this._products];
  }

  public getOne(id : number) : IProduct{
    let product = this._products.find(p => p.id == id);
    if(!product) throw new Error(`Product with id "${id}" not found.`);
    return product;
  }

  public insert(new_product : IProduct) : number{
    if(new_product.quantity <= 0 ) throw new Error(`Quantity of product must be greather than 0 : ${new_product.quantity}`);
    // let idMax = (this._products.length <= 0)? 0 : Math.max(...this._products.map(p=>p.id));
    // new_product.id = idMax+1;
    new_product.id = this._idMax + 1;
    this._idMax = new_product.id;
    this._products.push(new_product);
    return new_product.id;
  }

  public delete(id : number) : void{
    // let index : number = this._products.indexOf(this.getOne(id));
    // this._products.splice(index,1);
    this._products = this._products.filter(p => p.id != id);
  }

  public addQuantity(id : number) : void{
    let product : IProduct = this.getOne(id);
    product.quantity += 1;
  }

  public subQuantity(id : number) : void{
    let product : IProduct = this.getOne(id);
    product.quantity -= 1;
    if(product.quantity <= 0) this.delete(id);
  }

  public calculTotal() : number{
    return this._products
                .map(
      p=> ((p.promo)?p.promo : p.price) *p.quantity
                  )
                .reduce(
                  (sum,value)=> sum + value,
                  0
                  );
  }

}
