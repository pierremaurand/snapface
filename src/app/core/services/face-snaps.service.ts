import { HttpClient } from '@angular/common/http';
import { FaceSnap } from '../models/face-snap.model';
import { SnapType } from '../models/snap-type.type';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  constructor(private http: HttpClient) {}

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(
      `http://localhost:3000/facesnaps/${faceSnapId}`
    );
  }

  snapFaceSnapById(
    faceSnapId: number,
    snapType: 'snap' | 'unsnap'
  ): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map((faceSnap) => ({
        ...faceSnap,
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      switchMap((updatedFaceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          updatedFaceSnap
        )
      )
    );
  }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map((faceSnaps) => [...faceSnaps].sort((a, b) => a.id - b.id)),
      map((sortedFaceSnaps) => sortedFaceSnaps[sortedFaceSnaps.length - 1]),
      map((previousFaceSnap) => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: previousFaceSnap.id + 1,
      })),
      switchMap((newFaceSnap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFaceSnap)
      )
    );
  }
}
