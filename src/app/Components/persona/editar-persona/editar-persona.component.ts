import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/Models/Persona';

import { PersonaService } from 'src/app/Service/persona.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {

 nombre!:String;
 apellido!:String;
 dni!:String;
direccion!:String;
nacionalidad!:String;
provincia!:String;
localidad!:String;

  persona = new Persona(this.nombre,this.apellido,this.dni,this.direccion, this.nacionalidad,this.provincia,this.localidad);
  constructor(
    private service: PersonaService,
    private activatedRouter : ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRouter.snapshot.params['id'];
    this.service.detail(id).subscribe(
      data =>{
        this.persona = data;
      }, err =>{
         alert("Error al modificar");
         this.router.navigate(['home']);
      }
    )
  }

  onUpdate(): void{
  
    const id = this.activatedRouter.snapshot.params['id'];
    this.service.update(id, this.persona).subscribe(
      data => {
        this.router.navigate(['home']);
      }, err => {
        alert("Error al modificar la persona");
        this.router.navigate(['home']);
      }
    )
  }

}
