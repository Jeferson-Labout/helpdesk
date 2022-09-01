import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Chamado } from 'src/app/models/chamado';
import { Cliente } from 'src/app/models/cliente';
import { Tecnico } from 'src/app/models/tecnico';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-chamado-create',
  templateUrl: './chamado-create.component.html',
  styleUrls: ['./chamado-create.component.css']
})
export class ChamadoCreateComponent implements OnInit {
  currentAction: string;
  chamadoForm: FormGroup;
  chamado: Chamado = {

  }

  clientes: Cliente[] = []
  tecnicos: Tecnico[] = []

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status: FormControl = new FormControl(null, [Validators.required]);
  titulo: FormControl = new FormControl(null, [Validators.required]);
  observacoes: FormControl = new FormControl(null, [Validators.required]);
  tecnico: FormControl = new FormControl(null, [Validators.required]);
  cliente: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    
  ) { this.criarFormulario(); }

  ngOnInit(): void {
    this.setCurrentAction();
    if (this.route.snapshot.url[1].path != 'create') {
      this.findById();
      if (this.route.snapshot.url[1].path == 'read') {
        this.chamadoForm.disable();
      }
    }
    this.findAllClientes();
    this.findAllTecnicos();
  }


  submitForm() {

    if (this.currentAction == "create")
      this.create();
    else 
      this.update();
  }

  create(): void {

    this.chamado = this.chamadoForm.value
    this.chamadoService.create(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso', 'Novo chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      console.log(ex);

      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }
  findById() {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta; 
      this.chamadoForm.setValue(this.chamado)

    });
  }
  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid && this.titulo.valid
      && this.observacoes.valid && this.tecnico.valid && this.cliente.valid
  }

  private setCurrentAction() {
    this.currentAction = this.route.snapshot.url[1].path
  }

  update(): void {

    this.chamado = this.chamadoForm.value
      this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado atualizado com sucesso', 'Atualizar chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }
  criarFormulario() {
    this.chamadoForm = this.fb.group({
      id: 0,
      prioridade: [''],
      status: [''],
      titulo: [''],
      observacoes: [''],
      tecnico: [''],
      cliente: [''],
      nomeCliente: [''],
      nomeTecnico: [''],
      dataAbertura: [''],
      dataFechamento: ['']
    })
  }

}
