import { NgModule, LOCALE_ID, ErrorHandler } from "@angular/core";
import { RouterModule, PreloadAllModules } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  LocationStrategy,
  HashLocationStrategy,
  registerLocaleData,
} from "@angular/common";
import localePt from "@angular/common/locales/pt";

registerLocaleData(localePt, "pt");

import { AplicationErrorHandler } from "./app.error-handler";
import { ROUTES } from "./app.routes";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantComponent } from "./restaurants/restaurant/restaurant.component";

import { RestaurantDetailComponent } from "./restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurant-detail/menu/menu.component";
import { ShoppingCartComponent } from "./restaurant-detail/shopping-cart/shopping-cart.component";
import { MenuItemComponent } from "./restaurant-detail/menu-item/menu-item.component";
import { ReviewsComponent } from "./restaurant-detail/reviews/reviews.component";

import { OrderSumaryComponent } from "./order-sumary/order-sumary.component";
import { SharedModule } from "./shared/shared.module";
import { NotFoundComponent } from "./not-found/not-found.component";
import { LoginComponent } from "app/security/login/login.component";
import { UserDatailComponent } from "app/header/user-datail/user-datail.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSumaryComponent,
    NotFoundComponent,
    LoginComponent,
    UserDatailComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
  ],
  providers: [
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: LOCALE_ID, useValue: "pt" },
    { provide: ErrorHandler, useClass: AplicationErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
