import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./containers/page-container/page-container.component').then(c => c.PageContainerComponent),
        children: [
            {
                path: '',
                redirectTo: '/flights',
                pathMatch: 'full',
            },
            {
                path: 'flights',
                loadComponent: () => import('./features/flights/flights.component').then(c => c.FlightsComponent),
            },
            {
                path: 'traveler',
                loadComponent: () => import('./features/traveler/traveler.component').then(c => c.TravelerComponent),
            }
        ]
    }
];
