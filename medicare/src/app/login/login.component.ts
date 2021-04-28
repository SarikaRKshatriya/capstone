import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public error:string = "";
  public user=[];
  public isPresent:boolean = true;
  public isAdmin = [];
  public loginSuccess:boolean = false;

  signinForm = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  });
  @ViewChild('signinForm') form: FormGroup;
  constructor(private router: Router,private productservice:ProductsService) { }

  ngOnInit(): void {
      this.isAdmin = this.productservice.getAdminDetails();
  }
  signin(form) {
    this.loginSuccess = true;
    if(form.value.email == "admin" && form.value.password == "admin123"){
        if(this.isAdmin[0].email == form.value.email && this.isAdmin[0].password == form.value.password){
          this.router.navigate(['/admin']);
      }
    }
    else{
      this.productservice.clearCart();
      this.productservice.clearWishList();
      this.user = this.productservice.getUsersDetails();
      this.user.forEach(item=>{
        if(item.email === form.value.email){
          if(item.password === form.value.password){
            this.productservice.setUserLoggedIn(form.value.email);
            this.router.navigate(['/home']);
          }
        }
        else{
          this.isPresent = false;
        }
      });
    }

  }

}
