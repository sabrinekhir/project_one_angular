import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  redirectUrl: string;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
    // this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectTo'];
  }

  ngOnInit(): void {
    console.log(this.redirectUrl);
    this.userService.logout();
  }

  login() {
    this.loading = true;

    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      result => {
        this.loading = false;

        if (result) {
          this.userService.login(result);
          this.navigateAfterSuccess();
        } else {
          this.error = 'Username or password is incorrect';
        }
      },
      error => {
        this.error = 'Username or password is incorrect';
        this.loading = false;
      }
      );
  }

  private navigateAfterSuccess() {
     this.router.navigate(['first']);

//        if (this.redirectUrl) {
//          this.router.navigateByUrl(this.redirectUrl);
//        } else {
//          this.router.navigate(['/']);
//        }
  }
}

// export class LoginComponent implements OnInit {
//  model: any = {};
//  loading = false;
//  error = '';
//
//
//  constructor(private router: Router,
//     private authenticationService: AuthenticationService,
//   private userService: UserService) {
//
//  }
//
//  ngOnInit() {
//
//  }
//    login() {
//    this.loading = true;
//
//    this.authenticationService.login(this.model.username, this.model.password)
//      .subscribe(
//        result => {
//          this.loading = false;
//
//          if (result) {
//            this.userService.login(result);
//            this.navigateAfterSuccess();
//          } else {
//            this.error = 'Username or password is incorrect';
//          }
//        },
//        error => {
//          this.error = 'Username or password is incorrect';
//          this.loading = false;
//        }
//      );
//  }
//
//  private navigateAfterSuccess() {
//   this.router.navigate(['/first']);
//
//
// }
// }
