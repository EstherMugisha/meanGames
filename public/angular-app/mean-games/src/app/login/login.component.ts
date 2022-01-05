import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm !:FormGroup;
  userLoggedIn:boolean = true;
  nameOfUser!:string;
  errorMessage!:string

  constructor(private _formBuilder:FormBuilder, private httpClient:HttpClient, private _jwt:JwtHelperService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this._formBuilder.group({
      username:["",Validators.required],
      password:["",Validators.required]
    })
  }

  onLogin():void{
    console.log("form.value",this.loginForm.value);
    let credentials:Credentials= new Credentials();
    credentials.username=this.loginForm.value.username;
    credentials.password=this.loginForm.value.password;
    this.httpClient.post<any>("http://localhost:3000/api/users/login", credentials).toPromise()
    .then(response=>{
      console.log("response",response);
      localStorage.setItem("games token", response.token);
      const token=localStorage.getItem("gamesToken") as string
      this.nameOfUser=this._jwt.decodeToken(token).name
      this.loginForm.reset();
      this.errorMessage="";

      this.router.navigate(['']);
    })
    .catch(err =>{
      this.errorMessage=err;
    })
    
  }

  onLogout(){
    console.log("logout called");
    localStorage.clear();
    this.router.navigate(['']);
    
    
  }

}

class Credentials{
  username!:string;
  password!:string;
}



