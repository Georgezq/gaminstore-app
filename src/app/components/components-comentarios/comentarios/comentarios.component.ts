import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comentarios } from 'src/app/interfaces/comentariosIn';
import { ComentarioService } from 'src/app/services/dynamodb/comentarios/comentario.service';
import { AuthService } from 'src/app/services/mongo/auth/auth.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.scss'],
})
export class ComentariosComponent implements OnInit {

  private auth$ = inject(AuthService);
  private routerAct = inject(ActivatedRoute);
  private comentarios$ = inject(ComentarioService);
  private fb = inject(FormBuilder);

  photoUrl: string;

  noticiaId: any;
  usuarioId: any;
  todayDate: any;
  comentarios: any;
  totalComentarios: any;

  comentarioForm: FormGroup;

  imagenUserComm: any;
  usernameUserComm: any;

  inicializarForm(): void{
    this.comentarioForm = this.fb.group({
      id_usuario: [''],
      id_noticia: [''],
      comentario: ['',Validators.required],
      fecha_publicacion: [''],
    });
  }

  getIdNoticia(){
    const params: any = this.routerAct.snapshot.queryParams;
    this.noticiaId = params.noticias
  }

  getUsers() {
    const storedData = localStorage.getItem('whentheuserislogged');
    const parsedData = JSON.parse(storedData);
    const id = parsedData.responses.id;

    this.usuarioId = id;
    this.auth$.loginSendData(id).subscribe((res) => {
      this.photoUrl = res.imagenperfil;
    });
  }

  setTodayDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();
    this.todayDate = `${day}/${month}/${year}`;
  }

  sendComents(){
    const comentarioData: Comentarios = {
      id_noticia: this.noticiaId,
      id_usuario: this.usuarioId,
      comentario: this.comentarioForm.value.comentario,
      fecha_publicacion: this.todayDate,
    };

    this.comentarios$.sendComments(comentarioData).subscribe(
      (res)=>{
        this.getComentarios();
      }
    );
    this.comentarioForm.reset();
  }

  // Método para obtener comentarios por ID de noticia
  getComentarios() {
    this.comentarios$.getComentariosByNewsId(this.noticiaId).subscribe(
      response => {
        if (response) {
          this.comentarios = response.data;
          this.totalComentarios = this.comentarios.length
          this.comentarios.forEach(comentario => {
            this.auth$.loginSendData(comentario.id_usuario).subscribe(
              res => {
 comentario.imagenperfil = res.imagenperfil;
                const correo = res.email;
                comentario.username = res.displayName ? res.displayName : correo.split('@')[0];
              },
              error => {
                console.error(`Error loading user data for comment ${comentario.id}:`, error);
              }
            );
          });
        } else {
          console.error('Failed to load comments');
        }
      },
      error => {
        console.error('Error loading comments', error);
      }
    );
  }




  ngOnInit(): void {
    this.getUsers();
    this.getIdNoticia();
    this.inicializarForm();
    this.setTodayDate();
    this.getComentarios();

  }

}
