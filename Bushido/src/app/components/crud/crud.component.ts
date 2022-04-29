import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { produtos } from './model/getmodel';


@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})


export class CrudComponent implements OnInit {

  display: boolean = false;
  displayBasic!: boolean;
  displayPosition!: boolean;

  messageService: any;
  position!: string;

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

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
}


  url = 'http://localhost:8080'
  produto: produtos[]
  inputProduto = "";
  inputPreco = "";
  inputDescricao = "";
  inputId!: number;


  constructor(private _route: Router, private _httpclient: HttpClient,) {
    this.produto = [];
   }

   //Função exibir produtos
  getAll() {
    return this._httpclient.get(this.url+ '/api/tutorials').subscribe((result: any) => {
      this.produto = [];
      for (var item of result){
        this.produto.push({id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
    })
  }

   //Função excluir produtos
  delete(id: number) {
     this._httpclient.delete(this.url + `/api/tutorials/${id}`,).subscribe((result: any) => {
      this.getAll();
      this.displayPosition = false;
    })
  }
  
  //Função atualizar produtos
  update(produto: string, preco: string, descricao: string, id: number) {
    this._httpclient.put<any>(this.url + `/api/tutorials/${id}`, {produto:produto, descricao: descricao, preco:preco, id:id }).subscribe((result: any) => {
      this.getAll();
      this.display = false
    })
  }

  //Função Novo Produto
  new(produto: string, preco: string, descricao: string) {
    this._httpclient.post<any>(this.url + '/api/tutorials', {produto:produto, descricao: descricao, preco:preco}).subscribe((result: any) => {
      this.produto = [];
      this.getAll();
      this.displayBasic = false;
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
    this.getAll();
    
  }

  
}
