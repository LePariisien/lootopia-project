import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../api-routes';
import { Artifact } from '../models/artifact.model';

@Injectable({ providedIn: 'root' })
export class ArtifactService {

  constructor(private http: HttpClient) {}

  getAllArtifacts(): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(ApiRoutes.artefactsAll());
  }

  getArtifactById(artifactId: string): Observable<Artifact> {
    return this.http.get<Artifact>(ApiRoutes.artefactsById(artifactId));
  }

  getArtefactsAllOrdered(): Observable<any> {
    return this.http.get<any>(ApiRoutes.artefactsAllOrdered());
  }

}
