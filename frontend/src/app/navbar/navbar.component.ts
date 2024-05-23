import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faMoon,
  faMicrophone,
  faCameraRetro,
  faUpload,
  faTowerBroadcast,
} from '@fortawesome/free-solid-svg-icons';
import { themeChange } from 'theme-change';
import { SharedModule } from '../shared/shared.module';
import { GlobalValuesService } from '../shared/globalValues/global-values.service';
import { SpeechRecognitionComponent } from '../speech-recognition/speech-recognition.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FontAwesomeModule, SharedModule, SpeechRecognitionComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  faMoon = faMoon;
  faMicrophone = faMicrophone;
  faCameraRetro = faCameraRetro;
  faUpload = faUpload;
  faTowerBroadcast = faTowerBroadcast;
  theme!: string;
  hidden = true;
  openSpeech: boolean = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private globalValues: GlobalValuesService
  ) {}

  @ViewChild('themeCheckbox') themeCheckbox!: ElementRef;
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      themeChange();
    }
  }

  toggleSidebar() {
    this.globalValues.changeSideBarState();
  }
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    if (!this.isHiddenElement(targetElement)) {
      this.hidden = true;
    }
  }
  private isHiddenElement(targetElement: HTMLElement): boolean {
    const menuElement = document.querySelector('.create') as HTMLElement;
    return menuElement.contains(targetElement);
  }
  openListeningDilog() {
    this.openSpeech = true;
  }
}
