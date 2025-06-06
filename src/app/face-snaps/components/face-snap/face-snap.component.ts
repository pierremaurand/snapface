import { Component, Input } from '@angular/core';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Router } from '@angular/router';
import { FaceSnap } from '../../../core/models/face-snap.model';
import {FaceSnapsModule} from '../../face-snaps.module';

@Component({
  selector: 'app-face-snap',
  imports: [FaceSnapsModule],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.scss',
})
export class FaceSnapComponent {
  @Input() faceSnap!: FaceSnap;
  buttonText!: string;

  constructor(
    private router: Router,
    private faceSnapsService: FaceSnapsService
  ) {}

  onSnap() {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'snap');
      this.buttonText = 'Oops, unSnap!';
    } else {
      this.faceSnapsService.snapFaceSnapById(this.faceSnap.id, 'unsnap');
      this.buttonText = 'Oh Snap!';
    }
  }

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}
