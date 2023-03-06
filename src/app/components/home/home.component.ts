import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/interfaces/producto';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private cartService:CartService){

  }
  ngOnInit(): void {
    this.cartNumberFunc();

  }
productAlmacen=[
  {
    prodId:1, 
    img:'./../../assets/images/t1.jpg',
   precio:400,
   
},
{
  prodId:2,
  img:'./../../assets/images/t2.jpg',
   precio:300,
  
},
{
  prodId:3,
  img:'./../../assets/images/t3.jpg',
   precio:400,
  
},
{
  prodId:4,
  img:'./../../assets/images/t4.jpg',
   precio:400,
   
}

]
productArray=this.productAlmacen.map(prod=>{ return {...prod,qty:1}});


inc(prod:Producto){
prod.qty! +=1
}
dec(prod:Producto){
  if(prod.qty !=1){
      prod.qty! -=1

  }

}
itemsCart:any[] = [];
  addCart(category:Producto){
    console.log('esto es en addCart', this.productArray)
    let cartDataNull = 
  localStorage.getItem('localCart');
    if(cartDataNull == null){
      let storeDataGet:any[] = [];
    storeDataGet.push(category);
      localStorage.setItem
        ('localCart', 
     JSON.stringify(storeDataGet));
    }
    else{
      var id = category.prodId;
      let index:number = -1;
      this.itemsCart = 
    JSON.parse
(localStorage.getItem
('localCart')!);
for
(let i=0; i<this.itemsCart.length; 
i++){
if(id === 
parseInt(this.itemsCart[i].prodId))
{
        this.itemsCart[i].qty = 
category.qty
          index = i;
          break;
        }
      }
      if(index == -1){
this.itemsCart.push(category);
        localStorage.setItem
('localCart', JSON.stringify
(this.itemsCart));
      }
      else{
        localStorage.setItem
('localCart', JSON.stringify
(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

 cartNumber:number = 0;

 cartNumberFunc(){
   var cartValue = 
JSON.parse
(localStorage.getItem
('localCart')!);
   this.cartNumber = 
cartValue.length;
   this.cartService.cartSubject.next(this.cartNumber);
}
}
