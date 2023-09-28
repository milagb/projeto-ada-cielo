import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture } from '@angular/core/testing';
import { of } from "rxjs";
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { WebService } from './web.service';
import { AppModule } from './app.module';


describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let webService: jasmine.SpyObj<WebService>; 

  const serviceMock = {
    getPayment: () => of([{"id":"114606514478703", 
    "merchantId":"2000463023",
    "paymentNode":485173,
    "cnpjRoot":485116,
    "date":"2021-05-26T12:12:55",
    "paymentType":"Crédito à vista",
    "cardBrand":"Mastercard",
    "authorizationCode":"378216",
    "truncatedCardNumber":"1014",
    "grossAmount":80.0,
    "netAmount":76.88,
    "terminal":"00032668",
    "administrationFee":3.9,
    "channelCode":15,
    "channel":"Super Link / Digitada",
    "withdrawAmount":0.0,
    "minimumMDRAmmount":-3.12,
    "mdrTaxAmount":0.0,
    "mdrFeeAmount":-3.12,
    "status":"Aprovada"
  },
  {
    "id":"114606514478704",
    "merchantId":"2000463023",
    "paymentNode":485173,
    "cnpjRoot":485116,
    "date":"2021-05-26T12:12:55",
    "paymentType":"Crédito à vista",
    "cardBrand":"Mastercard",
    "authorizationCode":"378218",
    "truncatedCardNumber":"1014",
    "grossAmount":80.0,
    "netAmount":76.88,
    "terminal":"00032668",
    "administrationFee":3.9,
    "channelCode":15,
    "channel":"Super Link / Digitada",
    "withdrawAmount":0.0,
    "minimumMDRAmmount":-3.12,
    "mdrTaxAmount":0.0,
    "mdrFeeAmount":-3.12,
    "status":"Aprovada"
  }]),
    isFirstPage: true,
    goToNextPage: () => {},
    goToPreviousPage: () => {}
  }  
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ ],
        imports: [
          AppModule,
          HttpClientModule,
        ],
        providers: [
          {provide: WebService, useValue: serviceMock}
        ]
      });
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it("on click next it should increment page", () => {
      const spyNext = spyOn(serviceMock, "goToNextPage");
      const spyPayments = spyOn(serviceMock, "getPayment").and.returnValue(of([]));
  
      component.moveNextPage();
  
      expect(spyNext).toHaveBeenCalled();
      expect(spyPayments).toHaveBeenCalled();
    })
  
    it("on click next it should decrement page", () => {
      const spyPrev = spyOn(serviceMock, "goToPreviousPage");
      const spyProdutos = spyOn(serviceMock, "getPayment").and.returnValue(of([]));
  
      component.movePreviousPage();
  
      expect(spyPrev).toHaveBeenCalled();
      expect(spyProdutos).toHaveBeenCalled();
    })
  
    it("should disble prev button", () => {
      const buttonPrev: HTMLButtonElement = fixture.debugElement.query(By.css("#prev-button")).nativeElement;
  
      expect(buttonPrev).not.toBeNull();
      expect(buttonPrev.disabled).toBe(true);
    })
  
    it("should render no cards", () => {
      const cards: DebugElement[] = fixture.debugElement.queryAll(By.css(".card"));
  
      expect(cards).not.toBeNull();
      expect(cards).toHaveSize(0);
    })
  })

