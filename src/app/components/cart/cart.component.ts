import { Component } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  constructor(private cartService: CartService) {}
  ngOnInit(): void {
    this.CartDetails();
    this.loadCart();
  }

  getCartDetails: Producto[] = [];
  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
    }
  }

  incQnt(prodId: any, qty: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        if (qty != 5) this.getCartDetails[i].qty = parseInt(qty) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  decQnt(prodId: any, qty: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prodId === prodId) {
        if (qty != 1) this.getCartDetails[i].qty = parseInt(qty) - 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  total: number = 0;
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      this.total = this.getCartDetails.reduce(function (acc: any, val: any) {
        return acc + val.precio * val.qty;
      }, 0);
    }
  }

  removeall() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  singleDelete(getCartDetail: any) {
    console.log(getCartDetail);
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].prodId === getCartDetail) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem(
            'localCart',
            JSON.stringify(this.getCartDetails)
          );
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.cartService.cartSubject.next(this.cartNumber);
  }
}
