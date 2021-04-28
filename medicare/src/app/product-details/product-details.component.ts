import { Component, OnInit,ViewChild } from '@angular/core';
import { Router} from "@angular/router";
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastyService } from 'ng2-toasty';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public loggiedIn:boolean = false;
  public productList = [];
  public productListData = [];
  public products = [];
  public searchInput:string ="";
  public usersCart = [];
  public currentPage =0;
  public total = 0;
  public pageSize=8;
  public userLoggedIn;
  public navigateSuccess:boolean = false;
  public categorySearchSuccess:boolean = false;
  public closeClicked:boolean =false;
  public askLogin:boolean =false;

  addForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPwd: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });
  @ViewChild('addForm') form: FormGroup;

  constructor( 
    private toastyService:ToastyService,
    private router: Router,private productservice:ProductsService) { }

  ngOnInit(): void {
    this.products = this.productservice.getProductDetails();
    this.userLoggedIn = this.productservice.getUserLoggedIn();
    if(this.userLoggedIn){
      this.loggiedIn = true;
    }
    this.productListData = this.products;
    this.productList = this.products;
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    }
  }
  login(){
    this.navigateSuccess = true;
    this.router.navigate(['/login']);
  }
  navigateToregister(){
    this.navigateSuccess = true;
    this.router.navigate(['/register']);
  }
  wishList(){
    this.navigateSuccess = true;
    this.router.navigate(['/wishList']);
  }
  cart(){
    this.navigateSuccess = true;
    this.router.navigate(['/cart']);
  }
  addToCart(id){
    this.askLogin = true;
    if(this.loggiedIn){
      let currentCart = this.productservice.getCart();
      let alreadyAdded = currentCart.filter(item => item.id === id);
      if(alreadyAdded.length > 0){
        this.toastyService.error({
          title: 'Item already added to cart.',
          showClose: false,
          timeout: 5000,
          theme: "bootstrap"
        });
      }
      else{
      this.toastyService.success({
        title: 'Successfully added item to cart...',
        showClose: false,
        timeout: 5000,
        theme: 'bootstrap',
      });
        this.productservice.setCart(id);
      }
    }
    else{
      this.askLogin = true;
      document.getElementById('ask-login').style.display = 'block';
    }
  }
  modalClose(){
    this.closeClicked = true;
    document.getElementById('ask-login').style.display = 'none';
  }
  addToWishlist(id){
    if(this.loggiedIn)   
    {
      this.productservice.setWishList(id);
    }
    else{
      this.askLogin = true;
      document.getElementById('ask-login').style.display = 'block';
    }
  }
  covidSpecials(){
    this.categorySearchSuccess = true;
    let tempData = this.productListData.filter(item=> item.category == "covid");
    this.productList = tempData;
  }
  vitamins(){
    this.categorySearchSuccess = true;
    let tempData = this.productListData.filter(item=> item.category == "vitamin");
    this.productList =  tempData;
  }
  diebetes(){
    this.categorySearchSuccess = true;
    let tempData = this.productListData.filter(item=> item.category == "diebetes");
    this.productList = tempData;
  }
  all(){
    this.categorySearchSuccess = true;
    this.productList = this.productListData;
  }
  searchProduct(){
    if(this.searchInput == ''){
      this.productList = this.productListData;
    }
    else{
      let tempData = this.products.filter(item=> item.name.toUpperCase() === this.searchInput.toUpperCase());
      this.productList = tempData;
    }
   
  }
  

}
