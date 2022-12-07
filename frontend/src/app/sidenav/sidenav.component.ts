import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { fadeInOut } from './helper';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])

        )
      ])
    ])
  ]

})
export class SidenavComponent implements OnInit {
  @Output() onTogglesSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;

  screenWidth = 0;
  perfil: string;
  verificaPerfil: boolean;

  navData = navbarData;
  constructor() { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.perfil = localStorage.getItem('perfil');

    this.verificaPerfil = this.perfil.includes("TECNICO")
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onTogglesSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onTogglesSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onTogglesSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }


}
