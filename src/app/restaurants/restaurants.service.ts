import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable";

import { Restaurant } from "./restaurant/restaurant.model";
import { MenuItem } from "app/restaurant-detail/menu-item/menu-item.model";

import { MEAT_API, MEAT_API_PARAM_QUERY } from "../app.api";

@Injectable()
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  restaurants(search?: string): Observable<Restaurant[]> {
    let params: HttpParams = undefined;
    if (search) {
      params = new HttpParams().append(MEAT_API_PARAM_QUERY, search);
    }

    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {
      params: params,
    });
  }

  restaurantById(id: string): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`);
  }

  reviewsOfRestaurants(id: string): Observable<any> {
    return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`);
  }

  menuOfRestaurants(id: string): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
  }
}
