import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  text = 'exemplo de texto para o pipe, ta minusculo'
  currentDate: Date = new Date();
}
