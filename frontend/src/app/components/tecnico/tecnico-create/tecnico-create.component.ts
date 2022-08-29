import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  currentAction: string;
  tecnicoForm: FormGroup;

  tecnico: Tecnico = {

  }


  constructor(
    private service: TecnicoService
    , private toast: ToastrService
    , private router: Router
    , private route: ActivatedRoute
    , private fb: FormBuilder
  ) { this.criarFormulario(); }

  ngOnInit(): void {
    this.setCurrentAction();

    this.findById();

  }
  findById(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
      this.tecnico.perfis = [];
      this.tecnicoForm.setValue(this.tecnico)



    })
  }
  submitForm() {

    if (this.currentAction == "create")
      this.create();
    else // currentAction == "edit"
      this.update();
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico cadastrado com sucesso', 'Cadastro');
      this.router.navigate(['tecnicos'])
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
    this.service.update(this.tecnico).subscribe(resposta => {
      this.toast.success('Técnico Atualizado com sucesso', 'Update');
      this.router.navigate(['tecnicos'])
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
    if (this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }

  }
  validaCampos(): boolean {
    return this.tecnico_nome.value.valid && this.tecnico_cpf.value.valid && this.tecnico_email.value.valid && this.tecnico_senha.value.valid
  }

  private setCurrentAction() {
    // this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.route.snapshot.url[1].path == 'update' ? this.currentAction = 'update' : this.currentAction = 'create'


  }

  criarFormulario() {
    this.tecnicoForm = this.fb.group({
      id: [0],
      nome: ['', [Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.email]],
      senha: ['', [Validators.minLength(3)]],
      perfis: [],
      dataCriacao: ['']


    })
  }
  get tecnico_nome() { return this.tecnicoForm.get("nome") as FormControl };
  get tecnico_cpf() { return this.tecnicoForm.get("cpf") as FormControl };
  get tecnico_email() { return this.tecnicoForm.get("email") as FormControl };
  get tecnico_senha() { return this.tecnicoForm.get("senha") as FormControl };

}