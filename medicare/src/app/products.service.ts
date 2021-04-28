import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public cartInfo:any = [];
  public wishListInfo:any = [];
  public currentUserEmail:string;
  public productDetails:any =[];
  public userinfo:any = [];
  public adminInfo:any =[];
  public getData:boolean = false;

  constructor(private http: HttpClient) { 
  this.adminDetails();
  this.showProductsDetails();
  this.usersDetails();
  this.cartDetails();
  this.wisListDetails();
  }
  adminDetails(){
    this.http.get('http://localhost:3000/api/admin').subscribe(res=>{
    this.adminInfo = res;
    });
   // return this.adminInfo;
   
  }
  getAdminDetails(){
    this.getData = true;
    return this.adminInfo;
  }
 showProductsDetails(){
  this.http.get('http://localhost:3000/api/products').subscribe(res=>{
    this.productDetails = res;
    });
  }
  getProductDetails(){
    this.getData = true;
    return this.productDetails;
  }
  addProduct(data){
    let temp = this.http.post('http://localhost:3000/api/products', data).subscribe(res=>{
      return res;
      });
     
    }
    deleteProduct(id){
    this.http.delete('http://localhost:3000/api/products/'+ id).subscribe(res=>{
        });
    }
  
    editProductDetails(data){
       let temp = this.http.put('http://localhost:3000/api/products/'+ data.id, data).subscribe(res=>{
        return res;
        });
      }
  usersDetails(){
    this.http.get('http://localhost:3000/api/users').subscribe(res=>{
    this.userinfo = res;
    });
  }
  getUsersDetails(){
    this.getData = true;
    return this.userinfo;
  }
  setUsersDetails(data){
    this.http.post('http://localhost:3000/api/users', data).subscribe(res=>{
    });
  }
  deleteUserData(email){
    this.http.delete('http://localhost:3000/api/users/'+ email).subscribe(res=>{
      });
  }
  getUserLoggedIn(){
    return this.currentUserEmail;
  }
  setUserLoggedIn(email){
    this.currentUserEmail = email;
  }
  setCart(id){
    let data = this.productDetails.filter(item=> item.id == id);
    data[0].email = this.currentUserEmail;
    this.http.post('http://localhost:3000/api/cart', data[0]).subscribe(res=>{
    this.cartInfo = res;
    });
  }
  cartDetails(){
    this.http.get('http://localhost:3000/api/cart').subscribe(res=>{
      this.cartInfo = res;
      });
      return this.cartInfo;
  }
  getCart(){
    return this.cartInfo;
  }
  removeProductFromCart(id){
    this.http.delete('http://localhost:3000/api/cart/'+ id).subscribe(res=>{
      this.cartInfo = res;
      });
  }
  clearCart(){
    this.http.delete('http://localhost:3000/api/cart/'+ 0).subscribe(res=>{
      this.cartInfo = res;
      });
  }
  clearWishList(){
    this.http.delete('http://localhost:3000/api/wishlist/'+ 0).subscribe(res=>{
      this.cartInfo = res;
      });
  }
  setWishList(id){
    let data = this.productDetails.filter(item=> item.id == id);
    data[0].email = this.currentUserEmail;
    this.http.post('http://localhost:3000/api/wishlist', data[0]).subscribe(res=>{
      this.wishListInfo = res;
      });
   }
   wisListDetails(){
    this.http.get('http://localhost:3000/api/wishlist').subscribe(res=>{
      });
      return this.wishListInfo;
  }
  getWishList(){
    return this.wisListDetails();
  }
  removeProductFromWishList(id){
    this.http.delete('http://localhost:3000/api/wishlist/'+ id).subscribe(res=>{
     // this.wishListInfo = res;
      });
     }

}

