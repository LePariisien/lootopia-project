import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Artefact } from '../models/artefact.model';

@Injectable({ providedIn: 'root' })
export class ArtefactService {

  constructor(private http: HttpClient) {}

  getAllArtefacts(): Observable<Artefact[]> {
    return this.http.get<Artefact[]>(ApiRoutes.artefactsAll());
  }

  getArtefactById(artefactId: string): Observable<Artefact> {
    return this.http.get<Artefact>(ApiRoutes.artefactsById(artefactId));
  }

  getArtefactsAllOrdered(): Observable<any> {
    return this.http.get<any>(ApiRoutes.artefactsAllOrdered());
  }

}
