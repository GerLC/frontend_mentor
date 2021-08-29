import { trigger, state, style, animate, transition } from '@angular/animations';

export function flyInOut() {
    return trigger('flyInOut', [
        state('*', style({ opacity: 1, transform: 'translateX(0)'})),
        transition(':enter', [
            style({ transform: 'translateX(-100%)', opacity: 0 }),
            animate('800ms ease-in')
        ]),
        transition(':leave', [
            animate('500ms ease-out', 
            style({ transform: 'translateX(100%)', opacity: 0}))
        ])
    ]);
}

export function expand() {
    return trigger('expand', [
        state('*', style({ opacity: 1, transform: 'scale(1)' })),
        transition(':enter', [
            style({ transform: 'scale(.5)', opacity: 0 }),
            animate('400ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
        ])
    ]);
}