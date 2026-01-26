import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout';
import { QuizDiscoverComponent } from './layouts/quiz/quiz-discover.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { authGuard, nonAuthGuard } from './quards/auth.guard';
import { loginComponent } from './layouts/auth/login/login.component';

export const routes: Routes = [
    {
        path: 'auth',
        canActivate: [nonAuthGuard],
        component: AuthComponent,
        children:[{
            path: 'login',
            component: AuthComponent//loginComponent,
        },{
            path:'',
            pathMatch:'full',
            redirectTo:'login'
        }]
    },
    {
    path:'main',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children:[{
        path:'discover',
        component: QuizDiscoverComponent,
    },
    {
        path:'',
        pathMatch:'full',
        redirectTo:'discover',
    },
    /*
    {
        path:'register',
        component: ReguisterCreateComponent,
    },*/
    {
        path:'authUser',
        component: AuthComponent,
    }
]
},
{
    path:'**',
    redirectTo:'auth',
}
];
