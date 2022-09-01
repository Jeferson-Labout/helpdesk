import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  currentAction: string;
  clienteForm: FormGroup;

  cliente: Cliente = {
    perfis: []
  }

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));

  constructor(
    private service: ClienteService
    , private toast: ToastrService
    , private router: Router
    , private route: ActivatedRoute
    , private fb: FormBuilder
  ) { this.criarFormulario(); }

  ngOnInit(): void {
    this.setCurrentAction();
    if (this.route.snapshot.url[1].path != 'create') {
      this.findById();
      if (this.route.snapshot.url[1].path == 'delete') {
        this.clienteForm.disable();
      }
    }
  }
  findById(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.cliente.id).subscribe(resposta => {
      this.cliente = resposta;
      this.cliente.perfis = [];
      this.clienteForm.setValue(this.cliente)
    })
  }
  submitForm() {

    if (this.currentAction == "create")
      this.create();
    else 
      this.update();
  }

  create(): void {

    this.cliente = this.clienteForm.value
    this.service.create(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);

        });

      } else {
        this.toast.error(ex.error.message);
      }

    })
  }

  update(): void {
    this.cliente = this.clienteForm.value
    this.service.update(this.cliente).subscribe(resposta => {
      this.toast.success('Cliente Atualizado com sucesso', 'Update');
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);

        });

      } else {
        this.toast.error(ex.error.message);
      }

    })
  }
  delete(): void {
    this.service.delete(this.cliente.id).subscribe(resposta => {
      this.toast.success('Cliente Deletado com sucesso', 'delete');
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);

        });

      } else {
        this.toast.error(ex.error.message);
      }

    })
  }

  addPerfil(perfil: any): void {

    if (this.cliente.perfis.includes(perfil)) {

      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);


    } else {

      this.cliente.perfis.push(perfil);
    }

  }
  validaCampos(): boolean {
    return this.cliente_nome.value.valid && this.cliente_cpf.value.valid && this.cliente_email.value.valid && this.cliente_senha.value.valid
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[1].path   
  }

  criarFormulario() {
    this.clienteForm = this.fb.group({
      id: [0],
      nome: ['', [Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.email]],
      senha: ['', [Validators.minLength(3)]],
      perfis: [this.cliente.perfis],
      dataCriacao: ['']


    })
  }
  get cliente_nome() { return this.clienteForm.get("nome") as FormControl };
  get cliente_cpf() { return this.clienteForm.get("cpf") as FormControl };
  get cliente_email() { return this.clienteForm.get("email") as FormControl };
  get cliente_senha() { return this.clienteForm.get("senha") as FormControl };

}