import { trigger, style, transition, animate, state } from '@angular/animations'

export let aniPregunta = trigger('animacionPreg', [
  state('INACTIVO', style({
    transform: 'translateY(100%)',
    opacity: 0
  })),
  state('ACTIVO', style({
    transform: 'translateY(0)',
    opacity: 1
  })),
  transition('INACTIVO => ACTIVO', [
    animate(125, style({
      transform: 'translateY(0)',
      opacity: 1
    }))
  ]),
  transition('ACTIVO => INACTIVO', [
    animate(150, style({
      transform: 'translateY(-100%)',
      opacity: 0
    }))
  ])
]);

export let aniFormu = trigger('animacionFormulario', [
  state('INACTIVO', style({
    transform: 'translateX(-100%)',
    opacity: 0
  })),
  state('ACTIVO', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  transition('INACTIVO => ACTIVO', [
    animate(125, style({
      transform: 'translateX(0)',
      opacity: 1
    }))
  ]),
  transition('ACTIVO => INACTIVO', [
    animate(200, style({
      transform: 'translateX(100%)',
      opacity: 0
    }))
  ])
]);

export let aniBackFormu = trigger('animacionBackFormulario', [
  state('INACTIVO', style({
    transform: 'translateX(100%)',
    opacity: 0
  })),
  state('ACTIVO', style({
    transform: 'translateX(0)',
    opacity: 1
  })),
  transition('INACTIVO => ACTIVO', [
    animate(150, style({
      transform: 'translateX(0)',
      opacity: 1
    }))
  ]),
  transition('ACTIVO => INACTIVO', [
    animate(175, style({
      transform: 'translateX(-100%)',
      opacity: 0
    }))
  ])
]);