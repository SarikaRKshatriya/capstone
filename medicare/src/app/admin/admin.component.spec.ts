import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormGroup} from '@angular/forms';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  var productDetails = [
    Object({
     "id":1,
     "name":"Revital",
     "description":"Revital H Health Supplement Bottle Of 60 Capsules",
     "category":"vitamin",
     "quantity":1,
     "price":440,
     }),
     Object({
     "id":2,
     "name":"Savlon Disinfectant",
     "description":"Savlon Antiseptic Disinfectant Liquid 1000 Ml",
     "category":"covid",
     "quantity":1,
     "price":276
    }),
     Object({
     "id":3,
     "name":"Dettol Disinfectant",
     "description":"Dettol Multi-use Lime & Lemon Disinfectant Liquid Bottle Of 200 Ml",
     "category":"covid",
     "quantity":1,
     "price":86
    }),
     Object({
     "id":4,
     "name":"Dolo",
     "description":"Dolo 650mg Strip Of 15 Tablets | Micro Labs Limited",
     "category":"none",
     "quantity":1,
     "price":26
    }),

      
     
   ];
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        RouterTestingModule,
        NgxPaginationModule

      ],
      providers: [
        ProductsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isProduct true at first', () => {
    expect(component.isProduct).toBe(true);
  });

  it('isProduct false on change', () => {
    component.users();
    expect(component.isProduct).toBe(false);
  });
  it('Product total changed ', () => {
    component.products();
    expect(component.total).toEqual(0);
  });

  it('removeProduct', () => {
    component.removeProduct(1);
    expect(component.deleteItemId).toEqual(1);
  });

  it('removeUser', () => {
    component.removeUser("aa@abc.com");
    expect(component.deleteUserEmail).toEqual("aa@abc.com");
  });

  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.total).toEqual(0);
  });

  it('SearchByCategory', () => {
    var covidData = [
       Object({
       "id":2,
       "name":"Savlon Disinfectant",
       "description":"Savlon Antiseptic Disinfectant Liquid 1000 Ml",
       "category":"covid",
       "quantity":1,
       "price":276
      }),
       Object({
       "id":3,
       "name":"Dettol Disinfectant",
       "description":"Dettol Multi-use Lime & Lemon Disinfectant Liquid Bottle Of 200 Ml",
       "category":"covid",
       "quantity":1,
       "price":86
      }),
    ];
     var vitamin = [
      Object({
       "id":1,
       "name":"Revital",
       "description":"Revital H Health Supplement Bottle Of 60 Capsules",
       "category":"vitamin",
       "quantity":1,
       "price":440,
       }),
       
     ];
    component.SearchByCategory("covid");
    //expect(component.productData).toEqual(covidData);
    expect(component.productData.length).toEqual(0);
    // component.SearchByCategory("vitamin");
    // expect(component.productData).toEqual(vitamin);
    // component.SearchByCategory(0);
    // expect(component.productData.length).toEqual(0);
  });
  
  it('SearchByCategory', () => {
    component.SearchByCategory(0);
    expect(component.productData.length).toEqual(0);
  });

  it('searchByName', () => {
    component.searchByName();
    expect(component.searchValue).toEqual('');
  });

  it('searchByName', () => {
    component.searchByName();
    expect(component.productData.length).toEqual(0);
  });

  it('pageChange', () => {
    component.pageChange(1);
    expect(component.currentPage).toEqual(1);
  });

  it('delete Product', () => {
    component.delete();
    expect(component.deletedProduct).toEqual(true);
    expect(component.productData.length).toEqual(0);
  });

  it('delete deleteClose', () => {
    component.deleteClose();
    expect(component.closeClicked).toEqual(true);
    expect(component.productData.length).toEqual(0);
  });

  it('delete deleteSelectedUser', () => {
    component.deleteSelectedUser();
    expect(component.closeClicked).toEqual(true);
  });

  it('delete deleteUserClose', () => {
    component.deleteUserClose();
    expect(component.closeClicked).toEqual(true);
  });

  it('addedProduct', () => {
    component.addProducts();
    expect(component.addedProduct).toEqual(false);
  });

  it('add form', () => {
    component.add();
    expect(component.addedProduct).toEqual(true);
    expect(component.productData.length).toEqual(0);
  });

  it('edit Product', () => {
    var data = 
      Object({
        "id":9,
        "name":"Zincovit",
        "description":"Zincovit Bottle Of 200ml Syrup (Green)",
        "category":"vitamin",
        "quantity":1,
        "price":115
      })
    
    component.edit(data);
    expect(component.editedProduct).toEqual(true);
    expect(component.productData.length).toEqual(0);
  });

  it('editProduct form', () => {
    //component.editProduct(undefined);
    expect(component.selectedID).toEqual(undefined);
    expect(component.selectedName).toEqual(undefined);
    expect(component.selectedDescription).toEqual(undefined);
    expect(component.selectedCategory).toEqual(undefined);
    expect(component.selectedPrice).toEqual(undefined);
    expect(component.editForm instanceof FormGroup).toBe(false);

  });
  
});
