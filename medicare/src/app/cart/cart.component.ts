import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public showCart:boolean = true;
  public cartData:any = [];  
  public total = 0;
  public deleteItemId;
  public closeClicked:boolean = false;
  public confirmCheckout:boolean = false;
  public changeQuantity:boolean = false;
  public navigate:boolean = false;
  public deleteSuccess:boolean = false;
  constructor(private router: Router,private productservice:ProductsService) { }

  ngOnInit(): void {
    this.cartData = this.productservice.getCart();
    this.cartData.forEach((item) => {
     this.total =this.total + (item.price * item.quantity);
    });
  
  }
  wishList(){
    this.navigate = true;
    this.router.navigate(['/wishList']);
  }
  addQuantity(id){
    this.changeQuantity = true;
    this.cartData.forEach((item,index) => {
      if(item.id == id){
        if(item.quantity >= 0){
          this.cartData[index].quantity = this.cartData[index].quantity + 1 ;
            this.total = this.total + item.price;
        }
      }
    });
    this.cartData = this.productservice.getCart();
  
  }
  removeQuantity(id){
    this.changeQuantity = true;
    this.cartData.forEach((item,index) => {
      if(item.id == id){
        if(item.quantity >= 1){
          this.cartData[index].quantity = this.cartData[index].quantity - 1 ;
            this.total = this.total - item.price;
        }
      }
    });
    this.cartData = this.productservice.getCart();
   }
   removeProduct(id){
    this.deleteItemId = id;
    document.getElementById('delete-confirm').style.display = 'block';

   }
   delete(){
     this.deleteSuccess = true;
    this.productservice.removeProductFromCart(this.deleteItemId);
    setTimeout(()=>{
      this.cartData = this.productservice.getCart();
    }, 2000);
   
    document.getElementById('delete-confirm').style.display = 'none';
   }
   deleteClose() {
    this.closeClicked = true;
    document.getElementById('delete-confirm').style.display = 'none';
  }
  checkoutConfirm(){
    this.confirmCheckout = true;
    document.getElementById('checkout-confirm').style.display = 'block';
  }
  checkout(){
    this.navigate = true;
    document.getElementById('delete-confirm').style.display = 'none';
    this.router.navigate(['/checkout']);
    this.productservice.clearCart();
  }
  checkoutClose(){
    this.closeClicked = true;
    document.getElementById('delete-confirm').style.display = 'none';
  }

}
