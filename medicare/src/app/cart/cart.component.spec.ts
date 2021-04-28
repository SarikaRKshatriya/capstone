import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule

      ],
      providers: [
        ProductsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showCart true at first', () => {
    expect(component.showCart).toBe(true);
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.cartData.length).toEqual(0);
  });

  it('ngOnInit total', () => {
    component.ngOnInit();
    expect(component.total).toEqual(0);
  });


  it('showCart data', () => {
    expect(component.cartData.length).toBe(0);
  });
  it('close checkout popup', () => {
    component.checkoutClose();
    expect(component.closeClicked).toEqual(true);
  });
  it('close delete popup', () => {
    component.deleteClose();
    expect(component.closeClicked).toEqual(true);
  });

  it('remove selected product', () => {
    component.removeProduct(1);
    expect(component.deleteItemId).toEqual(1);
  });

  it('confirm Checkout', () => {
    component.checkoutConfirm();
    expect(component.confirmCheckout).toEqual(true);
  });

  it('remove Quantity', () => {
    component.removeQuantity(1);
    expect(component.changeQuantity).toEqual(true);
  });

  it('add Quantity', () => {
    component.addQuantity(1);
    expect(component.changeQuantity).toEqual(true);
  });
    
  it('remove Quantity total', () => {
    component.removeQuantity(1);
    expect(component.total).toEqual(0);
  });

  it('add Quantity total ', () => {
    component.addQuantity(1);
    expect(component.total).toEqual(0);
  });

  it('navigate to checkout', () => {
    component.checkout();
    expect(component.navigate).toEqual(true);
  });
  
  it('navigate to wishList', () => {
    component.wishList();
    expect(component.navigate).toEqual(true);
  })

  it('deleted Successfully', () => {
    component.delete();
    expect(component.deleteSuccess).toEqual(true);
  })

  it('deleted total Successfully', () => {
    component.delete();
    expect(component.total).toEqual(0);
    })


});
