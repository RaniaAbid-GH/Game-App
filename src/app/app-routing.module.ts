import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegisterComponent } from './components/register/register.component';
import { HomePageComponent } from './components/menu-components/home-page/home-page.component';
import { EmailAndSubscriptionVerificationComponent } from './components/email-and-subscription-verification/email-and-subscription-verification.component';
import { FirebaseUserResolverService } from './services/auth/firebase-user-resolver.service';
const routes: Routes = [{
  path: "landingPage",
  component: LandingPageComponent
},
{
  path :"register",
  component: RegisterComponent
},
{
  path :"emailAndSubscriptionVerification",
  component: EmailAndSubscriptionVerificationComponent,
  resolve : {user : FirebaseUserResolverService}
},
{
  path :"home",
  component: HomePageComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
