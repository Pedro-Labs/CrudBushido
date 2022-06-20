import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { produtos, users } from './model/getmodel';
import { MenuItem, MessageService } from 'primeng/api';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css'],
  providers: [MessageService]
})


export class CrudComponent implements OnInit {
  isButtonVisible!: boolean;

  items!: MenuItem[];

  display!: boolean;
  displayBasic!: boolean;
  displayPosition!: boolean;

  displayMaximizable!: boolean;
  // messageService!: MessageService

  // messageService: any;
  position!: string;
  value3!: string;

  token!: string
  message!: boolean;

  buttonVisible!: boolean

  showButton() {
    this.buttonVisible = true
  }

  showMessage() {
    this.display = true;
  }

  showDialog(produto: string, preco: string, descricao: string, id: number) {
    this.inputProduto = produto;
    this.inputPreco = preco;
    this.inputDescricao = descricao;
    this.inputId = id;

    this.display = true;
  }

  showBasicDialog() {

    this.displayBasic = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showPositionDialog(position: string, id: number) {

    this.inputId = id;
    this.displayPosition = true;
    this.position = position;
  }


  url = 'http://localhost:8080'
  //  email: email;
  //  password: password;

  usuario: users[]
  produto: produtos[];
  inputProduto = "";
  inputPreco = "";
  inputDescricao = "";
  inputId!: number;

  inputEmail = "";
  inputPassword = "";

  inputProduto2 = "";

  inputPreco2 = "";
  inputDescricao2 = "";

  searchInput = "";

  //Paginação
  totalRecords!: number;
  cols!: any[];

  loginVisible!: boolean;

  //ERRO DE USUÁRIO
  displayError!: boolean;
  showError(position: string) {
    this.displayPosition = true;
    this.position = position;
  }

  //  loginOff() {
  //   this.loginVisible = false
  //   this.loginSuccess()
  //  }

  constructor(private _route: Router, private _httpclient: HttpClient, private messageService: MessageService) {
    this.usuario = [];
    this.produto = [];
  }

  onReject() {
    this.messageService.clear('d');
  }

  loginSuccess() {
    this.messageService.add({ key: 'a', severity: 'success', summary: 'Logado com sucesso!', detail: 'Bem Vindo!' });
  }

  loginFail() {
    this.messageService.add({ key: 'f', severity: 'error', summary: 'Usuário não encontrado.', detail: 'Acesso Negado!' });
  }

  expiredSession() {
    this.messageService.add({ key: 'g', severity: 'error', summary: 'Sessão Expirada!', detail: 'Faça o login novamente.' });
  }

  createSuccess() {
    this.messageService.add({ key: 'b', severity: 'info', summary: 'Produto criado com sucesso!', detail: 'Adicionado na tabela.' });
  }

  updateSuccess() {
    this.messageService.add({ key: 'c', severity: 'info', summary: 'Produto atualizado com sucesso!', detail: 'Editado na tabela.' });
  }

  showConfirm(produto: string, preco: string, id: number) {
    this.inputProduto = produto;
    this.inputPreco = preco;
    this.inputId = id;
    this.messageService.clear();
    this.messageService.add({ key: 'd', sticky: true, severity: 'error', summary: 'Tem Certeza que deseja excluir o produto:', detail: 'Após a exclusão o produto não poderá ser restaurado!' });
  }

  deleteSuccess() {
    this.messageService.add({ key: 'e', severity: 'info', summary: 'Produto excluído com sucesso!', detail: 'Removido da tabela.' });
  }

  Search() {
    if (this.searchInput == "") {
      this.getAll(); //this.ngOnInit()
    } else {
      this.produto = this.produto.filter(res => {
        return res.produto.toLowerCase().match(this.searchInput.toLowerCase());
      })
    }
  }


  //Função exibir produtos por Ordem Alfabética
  getAll() {
    return this._httpclient.get(this.url + '/api/tutorials', { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result) {

        this.produto.push({
          id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
      // this.isButtonVisible = true;
      // this.loginVisible = false;
    })
  }


  //Exibir preço MAIOR
  getExp() {
    return this._httpclient.get(this.url + '/api/tutorials/exp', { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result) {

        this.produto.push({
          id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
    })
  }


  //Exibir preço MENOR
  getCheap() {
    return this._httpclient.get(this.url + '/api/tutorials/cheap', { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result) {

        this.produto.push({
          id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
    })
  }


  //Função excluir produtos
  delete(id: number) {
    this._httpclient.delete(this.url + `/api/tutorials/${id}`, { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
      // if(!result.ok) {
      // alert('Sessão expirada.. ou token inválido!')
      // }else{

      // }
      this.deleteSuccess()
      this.getAll();
      this.displayPosition = false;
    })

  }


  //Função atualizar produtos
  update(produto: string, preco: string, descricao: string, id: number) {
    this._httpclient.put<any>(this.url + `/api/tutorials/${id}`, { produto: produto, descricao: descricao, preco: preco, id: id }, { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {
      // if(!result.ok) {
      // alert("Sessão expirada.. ou token inválido!")
      //   }else{

      //   }
      this.updateSuccess()
      this.getAll();
      this.display = false
    })
  }


  //Função Novo Produto
  new(produto: string, preco: string, descricao: string) {
    this._httpclient.post<any>(this.url + '/api/tutorials', { produto: produto, descricao: descricao, preco: preco }, { headers: new HttpHeaders({ 'x-auth-token': this.token }) }).subscribe((result: any) => {

      this.produto = [];
      this.getAll();
      this.inputProduto2 = "";
      this.inputPreco2 = "";
      this.inputDescricao2 = "";
      this.displayBasic = false;
      this.createSuccess();
    })
  }


  //Função Login
  login(email: string, password: string) {
    this._httpclient.post<any>(this.url + '/api/auth', { email: email, password: password }).subscribe((result: any) => {
      this.token = result.token;
      this.usuario = [];
      this.inputEmail = "";
      this.inputPassword = "";
      this.displayMaximizable = false;
      this.getAll();
      
      //VALIDAÇÃO E MENSAGENS
      if(!result.token) {
        this.loginFail()
      } else {
        setTimeout(function(){
          location.reload();
        },1,8e+6 );
        this.loginSuccess();
        this.isButtonVisible = true;
        this.loginVisible = false;
      }
    })
  }


  //Funções de navegação (desuso)
  navigateTo() {
    this._route.navigate(['/create-product'])
  }

  navigateTo2() {
    this._route.navigate(['/update-product'])
  }



  ngOnInit(): void {

    this.loginVisible = true

    this.items = [
      {
        label: 'Maior preço', icon: 'pi pi-dollar', command: () => {
          this.getExp();
        }
      },

      {
        label: 'Menor preço', icon: 'pi pi-dollar', command: () => {
          this.getCheap();
        }
      },
    ];


    // this.getAll();
    this.cols = [
      { field: 'produto', header: 'produto' },
      { field: 'preco', header: 'preco' },
      { field: 'descricao', header: 'descricao' }
    ];
    this.totalRecords = this.produto.length
  }


}
