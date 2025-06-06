import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Component, OnInit } from '@angular/core';
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgIf,
  NgStyle,
  UpperCasePipe,
} from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  imports: [
    NgStyle,
    NgClass,
    NgIf,
    AsyncPipe,
    UpperCasePipe,
    DatePipe,
    RouterLink,
  ],
  templateUrl: './single-face-snap.component.html',
  styleUrl: './single-face-snap.component.scss',
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;

  constructor(
    private faceSnapsService: FaceSnapsService,
    private route: ActivatedRoute
  ) {}

  snapButtonText!: string;

  ngOnInit() {
    this.prepareInterface();
    this.getFaceSnap();
  }

  onSnap(faceSnapId: number): void {
    if (this.snapButtonText === 'Oops, unSnap!') {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnapById(faceSnapId, 'unsnap')
        .pipe(
          tap(() => {
            this.snapButtonText = 'Oh Snap!';
          })
        );
    } else {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnapById(faceSnapId, 'snap')
        .pipe(
          tap(() => {
            this.snapButtonText = 'Oops, unSnap!';
          })
        );
    }
  }

  private prepareInterface(): void {
    this.snapButtonText = 'Oh Snap!';
  }

  private getFaceSnap(): void {
    const faceSnapId = +this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }
}
