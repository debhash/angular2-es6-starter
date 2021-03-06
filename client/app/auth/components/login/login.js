import { Component } from 'angular2/core';
import { FORM_DIRECTIVES, FormBuilder, Validators } from 'angular2/common';
import { TranslatePipe } from 'ng2-translate/ng2-translate';
import { Router } from 'angular2/router';
import template from './login.html';
import { UserService } from '../../services/user';
import { validatorFactory } from '../../../posts/validator';

@Component({
  selector: 'login',
  template: template,
  directives: [FORM_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class LoginComponent {
  static get parameters() {
    return [[UserService], [FormBuilder], [Router]];
  }

  constructor(userService, builder, router) {
    this._userService = userService;
    this._router = router;

    this.loginForm = builder.group({
      email: ['', Validators.compose([Validators.required, validatorFactory('email')])],
      password: ['', Validators.required]
    });
  }

  onSubmit(credentials) {
    this._userService.login(credentials).subscribe((result) => {
      if (result) {
        this._router.navigate(['List']);
      }
    });
  }
}
