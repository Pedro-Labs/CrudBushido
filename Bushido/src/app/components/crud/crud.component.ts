import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { produtos, users } from './model/getmodel';
import { MenuItem } from 'primeng/api';


@Component({ 
 selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})


export class CrudComponent implements OnInit {
  isButtonVisible!: boolean;
  
  items!: MenuItem[];

  display!: boolean ;
  displayBasic!: boolean;
  displayPosition!: boolean;
  displayMaximizable!: boolean;
  
  messageService: any;
  position!: string;
  value3!: string;
  
  token!: string
  message!: boolean;

  buttonVisible!: boolean

  showButton(){
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
    
    showPositionDialog(position: string , id: number) {
  
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
  
  loginVisible!: boolean



  constructor(private _route: Router, private _httpclient: HttpClient,) {
    this.usuario = [];
    this.produto = [];
   }


  Search(){
    if(this.searchInput == ""){
      this.getAll(); //this.ngOnInit()
    }else{
      this.produto = this.produto.filter(res => {
        return res.produto.toLowerCase().match(this.searchInput.toLowerCase());
      })
    }
  }


   //Função exibir produtos por Ordem Alfabética
  getAll() {
    return this._httpclient.get(this.url+ '/api/tutorials', {headers: new HttpHeaders({'x-auth-token': this.token}) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result){
        
        this.produto.push({id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
      this.isButtonVisible = true;
      this.loginVisible = false;
    })
  }

  //Exibir preço MAIOR
  getExp() {
    return this._httpclient.get(this.url+ '/api/tutorials/exp', {headers: new HttpHeaders({'x-auth-token': this.token}) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result){
        
        this.produto.push({id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
    })
  }

  //Exibir preço MENOR
  getCheap() {
    return this._httpclient.get(this.url+ '/api/tutorials/cheap', {headers: new HttpHeaders({'x-auth-token': this.token}) }).subscribe((result: any) => {
      this.produto = [];
      for (var item of result){
        
        this.produto.push({id: item.id, produto: item.produto, descricao: item.descricao, preco: item.preco
        })
      }
    })
  }

   //Função excluir produtos
  delete(id: number) {
     this._httpclient.delete(this.url + `/api/tutorials/${id}`,  {headers: new HttpHeaders({'x-auth-token': this.token}) }).subscribe((result: any) => {
      // if(!result.ok) {
      // alert('Sessão expirada.. ou token inválido!')
      // }else{
        
      // }
      this.getAll();
      this.displayPosition = false;
    })
    
  }
  
  //Função atualizar produtos
  update(produto: string, preco: string, descricao: string, id: number) {
    this._httpclient.put<any>(this.url + `/api/tutorials/${id}`, {produto:produto, descricao: descricao, preco:preco, id:id }, {headers: new HttpHeaders({'x-auth-token': this.token}) }).subscribe((result: any) => {
      // if(!result.ok) {
      // alert("Sessão expirada.. ou token inválido!")
      //   }else{
          
      //   }
      this.getAll();
      this.display = false
    })
  }

  //Função Novo Produto
  new(produto: string, preco: string, descricao: string) {
    this._httpclient.post<any>(this.url + '/api/tutorials', {produto:produto, descricao: descricao, preco:preco},{headers: new HttpHeaders({'x-auth-token': this.token}) } ).subscribe((result: any) => {
      
      this.produto = [];
      this.getAll();
      this.inputProduto2 = "";
      this.inputPreco2 = "";
      this.inputDescricao2 = "";
      this.displayBasic = false;
    })
  }
  
  //Função Login
  login(email: string, password: string) {
    this._httpclient.post<any>(this.url + '/api/auth', {email:email, password: password }).subscribe((result:any) => {
      this.token = result.token;
      this.usuario = [];
      this.inputEmail = "";
      this.inputPassword = "";
      this.displayMaximizable = false;
      this.getAll();
      
      
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
      {label: 'Maior preço', icon: 'pi pi-dollar', command: () => {
          this.getExp();
      }},

      {label: 'Menor preço', icon: 'pi pi-dollar', command: () => {
          this.getCheap();
      }},
  ];


    this.getAll();
    this.cols = [
      { field: 'produto', header: 'produto' },
      { field: 'preco', header: 'preco' },
      { field: 'descricao', header: 'descricao' }
    ];
    this.totalRecords = this.produto.length
  }

  
}
