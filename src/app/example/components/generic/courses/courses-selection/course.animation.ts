import { trigger, transition, animate, style } from '@angular/animations';

export const courseAnimation = trigger(
    'courseAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('750ms ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            animate('250ms ease-in-out', style({ opacity: 0 }))
        ])
    ]
);

