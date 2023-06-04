import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import { Usuario } from 'src/app/shared/modelo/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import { MensagemService } from 'src/app/shared/services/mensagem.service';


@Component({
  selector: 'app-listagem-tabela',
  templateUrl: './listagem-usuario-tabela.component.html',
  styleUrls: ['./listagem-usuario-tabela.component.css'],
})
export class ListagemUsuarioTabelaComponent {

  colunas:string[] = ['id','nome','idade','cpf','acoes']
  usuarios: Usuario[] = [];
  tabelaDeUsuarios = new MatTableDataSource(this.usuarios);

  constructor(private usuarioService: UsuarioService, private messagemService: MensagemService) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuariosRetornados =>{
        this.usuarios = usuariosRetornados;
        this.tabelaDeUsuarios = new MatTableDataSource(this.usuarios)}
    );
  }

  aplicarFiltro(evento: Event) {
    const valorFiltro = (evento.target as HTMLInputElement).value;
    this.tabelaDeUsuarios.filter = valorFiltro.trim().toLowerCase();
  }

  excluir(usuarioARemover: Usuario): void {
    if (usuarioARemover.id) {
      this.usuarioService.apagar(usuarioARemover.id).subscribe(
        usuarioRemovido => {
          const indx = this.usuarios.findIndex(usuario =>
            usuario.id === usuarioARemover.id);
          this.usuarios.splice(indx, 1);
          this.messagemService.sucesso("Usuário excluido com Sucesso.")
          this.tabelaDeUsuarios = new MatTableDataSource(this.usuarios)

        }
      );
    }
  }
}