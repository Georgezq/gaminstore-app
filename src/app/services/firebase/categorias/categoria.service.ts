import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, doc, docData } from '@angular/fire/firestore';
import { DocumentData, DocumentReference, addDoc, collection, deleteDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { Categorias } from 'src/app/interfaces/categoriaIn';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private firestore: Firestore = inject(Firestore); // inject Cloud Firestore

  juegos$: Observable<Categorias[]>;

  _collecion = collection(this.firestore, "categorias");

  obtenerCategorias(): Observable<Categorias[]> {
    const _coleccion = collection(this.firestore, 'categorias');
    return collectionData(_coleccion, { idField: 'id' }) as Observable<Categorias[]>;
  }


}
