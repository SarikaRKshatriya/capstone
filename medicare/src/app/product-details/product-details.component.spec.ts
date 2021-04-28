import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductDetailsComponent } from './product-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../products.service';
import { ToastyModule } from 'ng2-toasty';
import { Router } from '@angular/router';
import {Location } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { WishlistComponent } from '../wishlist/wishlist.component';
import { CartComponent } from '../cart/cart.component';
import {NgxPaginationModule} from 'ngx-pagination';

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let router: Router;
  let location: Location;
  const windowMock = jasmine.createSpyObj(['addEventListener']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailsComponent,
        LoginComponent,
        RegisterComponent,
        WishlistComponent,
        CartComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'login', pathMatch: 'full', component: LoginComponent },
          { path: 'register', pathMatch: 'full', component: RegisterComponent },
          { path: 'wishList', pathMatch: 'full', component: WishlistComponent },
          { path: 'cart', pathMatch: 'full', component: CartComponent }
        ]),
        ToastyModule,
        NgxPaginationModule
      ],
      providers: [
        ProductsService,
        Location
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//   it('should navigate to register ', inject([Router], (router: Router) => {
//     component.navigateToregister();
//     router.navigate(['/register']).then(() => {
//         expect(location.path()).toBe("register");
//     });
// }));
// it('should navigate to wishList ', inject([Router], (router: Router) => {
//   component.wishList();
//   router.navigate(['/wishList']).then(() => {
//       expect(location.path()).toBe("wishList");
//   });
// }));

// it('should navigate to cart ', inject([Router], (router: Router) => {
//   component.cart();
//   router.navigate(['/cart']).then(() => {
//       expect(location.path()).toBe("cart");
//   });
// }));

// it('should navigate to login ', inject([Router], (router: Router) => {
//   component.login();
//   router.navigate(['/login']).then(() => {
//       expect(location.path()).toBe("login");
//   });
// }));

it('ngOnInit', () => {
  component.ngOnInit();
  expect(component.products.length).toEqual(0);
  expect(component.loggiedIn).toEqual(false);
});

it('accordion', () => {
  event = new Event('accordion');
  component.ngOnInit();
  window.dispatchEvent(event);

});

it('ngOnInit', () => {
  component.ngOnInit();
  component.userLoggedIn = "sarika.kshatriya@gmail.com";
  expect(component.loggiedIn).toEqual(false);
});

it('login navigate Success', () => {
  component.login();
  expect(component.navigateSuccess).toEqual(true);
});

it('register navigate Success', () => {
  component.navigateToregister();
  expect(component.navigateSuccess).toEqual(true);
});

it('wishList navigate Success', () => {
  component.wishList();
  expect(component.navigateSuccess).toEqual(true);
});

it('cart navigate Success', () => {
  component.cart();
  expect(component.navigateSuccess).toEqual(true);
});

it('covid category Search Success ', () => {
  component.covidSpecials();
  expect(component.categorySearchSuccess).toEqual(true);
});

it('vitamins category Search Success ', () => {
  component.vitamins();
  expect(component.categorySearchSuccess).toEqual(true);
});

it('diebetes category Search Success ', () => {
  component.diebetes();
  expect(component.categorySearchSuccess).toEqual(true);
});

it('all category Search Success ', () => {
  component.all();
  expect(component.categorySearchSuccess).toEqual(true);
});

it('closed model ', () => {
  component.modalClose();
  expect(component.closeClicked).toEqual(true);
});

it('search Product length', () => {
  component.searchProduct();
  expect(component.productList.length).toEqual(0);
});

it('search Product null', () => {
  component.searchProduct();
  component.searchInput = '';
  expect(component.productList.length).toEqual(0);
});
it('search Product by value ', () => {
  component.searchProduct();
  component.searchInput = 'dolo';
  expect(component.productList.length).toEqual(0);
});

it('addToCart askLogin ', () => {
  component.addToCart(1);
  expect(component.askLogin).toEqual(true);
  expect(component.loggiedIn).toEqual(false);
});

it('addToWishlist  ', () => {
  component.addToWishlist(1);
  expect(component.askLogin).toEqual(true);
  //expect(component.loggiedIn).toEqual(false);
});




});
