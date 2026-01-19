import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout';
import { QuizDiscoverComponent } from './layouts/quiz/quiz-discover.component';
import { ReguisterCreateComponent } from './layouts/reguister/reguister-user.component';
import { AuthComponent } from './layouts/auth/auth.component';

export const routes: Routes = [{
    path:'',
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
    {
        path:'register',
        component: ReguisterCreateComponent,
    },
    {
        path:'auth',
        component: AuthComponent,
    }
]
},
//{
   // path:"main",
    //component:MainLayoutComponent,
//}

];
