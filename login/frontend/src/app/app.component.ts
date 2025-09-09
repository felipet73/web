import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login.service';
import { IUsuario } from './Interface/IUsuario.Interface';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  loginform: FromGroup = new FormGroup({
    email: new FormControl('', Validators.required, Validators.email),
    conatrsenia: new FormControl(
      '',
      Validators.required,
      Validators.minLength(8),
      Validators.password
    ),
  });
  constructor(private loginService: Login, private router: Router) {}

  login() {
    this.loginService.login(this.loginform).subscribe(
      (data: IUsuario) => {
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
