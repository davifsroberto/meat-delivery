import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from "@angular/forms";

import { RadioOption } from "app/shared/radio/radio-option.model";
import { OrderService } from "./order.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Order, OrderItem } from "./order.model";

@Component({
  selector: "mt-order",
  templateUrl: "./order.component.html",
})
export class OrderComponent implements OnInit {
  numberPatern = /^[0-9]*$/;
  emailPatern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  orderForm: FormGroup;

  delivery: number = 8;

  paymentOptions: RadioOption[] = [
    { label: "Dinheiro", value: "MON" },
    { label: "Cartão de Débito", value: "DEB" },
    { label: "Cartão Refeição", value: "REF" },
  ];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.orderForm = this.formBuilder.group(
      {
        name: this.formBuilder.control("", [
          Validators.required,
          Validators.minLength(5),
        ]),

        email: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.emailPatern),
        ]),

        emailConfirmation: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.emailPatern),
        ]),

        address: this.formBuilder.control("", [
          Validators.required,
          Validators.minLength(5),
        ]),

        number: this.formBuilder.control("", [
          Validators.required,
          Validators.pattern(this.numberPatern),
        ]),

        paymentOption: this.formBuilder.control("", [Validators.required]),

        optionalAddress: this.formBuilder.control(""),
      },
      { validator: OrderComponent.equalsTo }
    );
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get("email");
    const emailConfirmation = group.get("emailConfirmation");

    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (email.value !== emailConfirmation.value) {
      return { emailsNoMatch: true };
    }

    return undefined;
  }

  itemsValue(): number {
    return this.orderService.itemsValue();
  }

  cartItems() {
    return this.orderService.cartItems();
  }

  increaseQty(item: CartItem) {
    this.orderService.increaseQty(item);
  }

  decreaseQty(item: CartItem) {
    this.orderService.decreaseQty(item);
  }

  remove(item: CartItem) {
    this.orderService.remove(item);
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems().map(
      (item: CartItem) => new OrderItem(item.quantity, item.menuItem.id)
    );
    this.orderService.checkOrder(order).subscribe((orderId: string) => {
      this.router.navigate(["/order-sumary"]);

      this.orderService.clear();
    });
    console.log(order);
  }
}
