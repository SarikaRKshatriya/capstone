import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public wishListData:any = [];  
  constructor(private router: Router,private productservice:ProductsService) { }

  ngOnInit(): void {
    this.wishListData = this.productservice.getWishList();
  }
  addToCart(id){
    this.productservice.setCart(id);
    this.wishListData = this.productservice.removeProductFromWishList(id);
   
    setTimeout(()=>{
      this.wishListData = this.productservice.getWishList();
      }, 2000);
    
  }
  cart(){
    this.router.navigate(['/cart']);
  }

}
