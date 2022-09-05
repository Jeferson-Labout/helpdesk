import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;


  constructor( private toast: ToastrService,
    private service: AuthService, private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.criarFormulario();
  }
 validaCampos(): boolean {
    return this.loginForm.get('email').valid && this.loginForm.get('senha').valid;
  }
  
  criarFormulario() {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  logar() {
    this.service.authenticate(this.loginForm.value).subscribe(resposta => {
      this.service.successfulLogin(resposta.headers.get('Authorization').substring(7));
      this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    })
  }
}
