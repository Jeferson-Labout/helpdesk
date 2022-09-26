import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  loginForm!: FormGroup;


  constructor( private toast: ToastrService,
    private service: AuthService, private router: Router,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.logout();
    this.criarFormulario();
  }
 validaCampos(): boolean {
    return 1==1
  }
  
  criarFormulario() {
    
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
    });
  }

  logar() {
    this.service.authenticate(this.loginForm.value).subscribe(resposta => {
    
    
      this.service.successfulLogin(resposta.token, resposta.email, resposta.id);
      
      this.router.navigate([''])
    }, () => {
      this.toast.error('Usuário e/ou senha inválidos');
    })
  }
  logout() {
    this.router.navigate(['login'])
    this.service.logout();
  }

}
