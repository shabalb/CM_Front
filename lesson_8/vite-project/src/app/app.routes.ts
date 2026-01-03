import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout';
import { QuizDiscoverComponent } from './layouts/quiz/quiz-discover.component';

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
    }
]
},
//{
   // path:"main",
    //component:MainLayoutComponent,
//}

];
