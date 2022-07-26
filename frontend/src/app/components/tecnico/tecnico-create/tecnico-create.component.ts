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

  nome: FormControl = new FormControl(null, Validators.minLength(3));
  cpf: FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  senha: FormControl = new FormControl(null, Validators.minLength(3));
  constructor(
    private service: TecnicoService
    , private toast: ToastrService
    , private router: Router
    , private route: ActivatedRoute
    , private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.setCurrentAction();
    this.buildTecnicoForm();
    this.findById();
  }
  findById(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.tecnico.id).subscribe(resposta => {
      this.tecnico = resposta;
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
    this.tecnico.perfis.includes(perfil) ? this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1) : this.tecnico.perfis.push(perfil);
  }
  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid
  }

  private setCurrentAction() {
    // this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.route.snapshot.url[1].path == 'update' ? this.currentAction = 'update' : this.currentAction = 'create'


  }

  private buildTecnicoForm() {
    this.tecnicoForm = this.formBuilder.group({
      id: '',
      nome: '',
      cpf: '',
      email: '',
      senha: '',
      perfis: [],
      dataCriacao: ''
    })
  }
}