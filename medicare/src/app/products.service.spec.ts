import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ProductsService
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it(`should fetch admin details`, async(inject([HttpTestingController, ProductsService],
    (httpClient: HttpTestingController, postService: ProductsService) => {
    let req = httpMock.expectOne('http://localhost:3000/api/admin');
    expect(req.request.method).toBe("GET");
    expect(service.adminInfo.length).toEqual(0);
    })));
    it(`should fetch products details`, async(inject([HttpTestingController, ProductsService],
      (httpClient: HttpTestingController, postService: ProductsService) => {
      let req = httpMock.expectOne('http://localhost:3000/api/products');
      expect(req.request.method).toBe("GET");
      expect(service.productDetails.length).toEqual(0);
      })));
      it(`should fetch users details`, async(inject([HttpTestingController, ProductsService],
        (httpClient: HttpTestingController, postService: ProductsService) => {
        let req = httpMock.expectOne('http://localhost:3000/api/users');
        expect(req.request.method).toBe("GET");
        expect(service.userinfo.length).toEqual(0);
        })));
        it(`should fetch cart details`, async(inject([HttpTestingController, ProductsService],
          (httpClient: HttpTestingController, postService: ProductsService) => {
          let req = httpMock.expectOne('http://localhost:3000/api/cart');
          expect(req.request.method).toBe("GET");
          })));
          it(`should fetch wishlist details`, async(inject([HttpTestingController, ProductsService],
            (httpClient: HttpTestingController, postService: ProductsService) => {
            let req = httpMock.expectOne('http://localhost:3000/api/wishlist');
            expect(req.request.method).toBe("GET");
            })));

            it(`should remove wishlist details`, async(inject([HttpTestingController, ProductsService],
              (httpClient: HttpTestingController, postService: ProductsService) => {
              service.removeProductFromWishList(1);
              let req = httpMock.expectOne('http://localhost:3000/api/wishlist/1');
              expect(req.request.method).toBe("DELETE");
              })));

              it(`should remove cart details`, async(inject([HttpTestingController, ProductsService],
                (httpClient: HttpTestingController, postService: ProductsService) => {
                service.removeProductFromCart(1);
                let req = httpMock.expectOne('http://localhost:3000/api/cart/1');
                expect(req.request.method).toBe("DELETE");
                })));

                it(`should remove user details`, async(inject([HttpTestingController, ProductsService],
                  (httpClient: HttpTestingController, postService: ProductsService) => {
                  service.deleteUserData("sarika.kshatriya@gmail.com");
                  let req = httpMock.expectOne('http://localhost:3000/api/users/sarika.kshatriya@gmail.com');
                  expect(req.request.method).toBe("DELETE");
                  })));
                  it(`should product details`, async(inject([HttpTestingController, ProductsService],
                    (httpClient: HttpTestingController, postService: ProductsService) => {
                    service.deleteProduct(1);
                    let req = httpMock.expectOne('http://localhost:3000/api/products/1');
                    expect(req.request.method).toBe("DELETE");
                    })));

              it(`clear wishlist details`, async(inject([HttpTestingController, ProductsService],
                (httpClient: HttpTestingController, postService: ProductsService) => {
                service.clearWishList();
                let req = httpMock.expectOne('http://localhost:3000/api/wishlist/0');
                expect(req.request.method).toBe("DELETE");
                })));

                it(`clear cart details`, async(inject([HttpTestingController, ProductsService],
                  (httpClient: HttpTestingController, postService: ProductsService) => {
                  service.clearCart();
                  let req = httpMock.expectOne('http://localhost:3000/api/cart/0');
                  expect(req.request.method).toBe("DELETE");
                  })));

                  // it(`editProductDetails`, async(inject([HttpTestingController, ProductsService],
                  //   (httpClient: HttpTestingController, postService: ProductsService) => {
                  //     var data = 
                  //     Object({
                  //       "id":9,
                  //       "name":"Zincovit",
                  //       "description":"Zincovit Bottle Of 200ml Syrup (Green)",
                  //       "category":"vitamin",
                  //       "quantity":1,
                  //       "price":115
                  //     });
                  
                  //   service.editProductDetails(data);
                  //   let req = httpMock.expectOne('http://localhost:3000/api/products/',data);
                  //   expect(req.request.body).toEqual(data);
                  //   expect(req.request.method).toBe("PUT");
                  //   })));

                  it('clear cart ', () => {
                    service.clearCart();
                    expect(service.cartInfo.length).toEqual(0);
                  });

                  it('getAdminDetails', () => {
                    service.getAdminDetails();
                    expect(service.adminInfo.length).toEqual(0);
                  });

                  it('getProductDetails', () => {
                    service.getProductDetails();
                    expect(service.productDetails.length).toEqual(0);
                  });

                  it('usersDetails', () => {
                    service.usersDetails();
                    expect(service.userinfo.length).toEqual(0);
                  });

                  it('adminDetails', () => {
                    service.adminDetails();
                    expect(service.adminInfo.length).toEqual(0);
                  });

                  it('getAdminDetails data', () => {
                    service.adminDetails();
                    expect(service.getData).toEqual(false);
                  });
                  it('getProductDetails data', () => {
                    service.getProductDetails();
                    expect(service.getData).toEqual(true);
                  });
                  it('getUsersDetails data', () => {
                    service.getUsersDetails();
                    expect(service.getData).toEqual(true);
                  });

                  it('cartDetails', () => {
                    service.cartDetails();
                    expect(service.cartInfo.length).toEqual(0);
                  });

                  it('setUserLoggedIn', () => {
                    service.setUserLoggedIn("admin");
                    expect(service.currentUserEmail).toEqual("admin");
                  });


});

