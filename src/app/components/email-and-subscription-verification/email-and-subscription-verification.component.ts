import { Component, OnInit } from '@angular/core';
import { UtilitiesService } from '../../services/utilities.service';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/models/category.model';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/database/category.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/database/user.service';



@Component({
  selector: 'app-email-and-subscription-verification',
  templateUrl: './email-and-subscription-verification.component.html',
  styleUrls: ['./email-and-subscription-verification.component.scss']
})
export class EmailAndSubscriptionVerificationComponent implements OnInit {
  game_name: string;
  userEmail?: string;
  userID = '';
  isEmailVerified?: BehaviorSubject<boolean>;
  isProgressBarVisible = false;
  interestCenter$?: Observable<Category[]>;
  selectedItemCount = 0;
  isNotRecommandedNumber = true;
  copyCategories: Category[] = [];

  
  constructor(
    private us: UserService,
    private authService: AuthService,
    private uts: UtilitiesService,
    private categoriesService: CategoryService,
    private route: ActivatedRoute,
    private router: Router) {
      this.game_name = this.uts.game_name;
     }

  ngOnInit(): void {
    this.userID = this.route.snapshot.data.user.uid;
    this.userEmail = this.route.snapshot.data.user.email;
    this.interestCenter$ = this.categoriesService.getCategories();
    this.isEmailVerified = new BehaviorSubject(
      this.route.snapshot.data.user.emailVerified
    );
  }

  async onReloadUser(): Promise<void> {
    this.isProgressBarVisible = true;
    await this.route.snapshot.data.user.reload();
    this.isEmailVerified?.next(this.route.snapshot.data.user.emailVerified);
    this.isProgressBarVisible = false;
  }

  onInterestCenterselected(category: Category, checked: boolean): void {
    if (checked) {
      this.copyCategories.push(category);
      this.copyCategories.length > 0
        ? (this.isNotRecommandedNumber = false)
        : (this.isNotRecommandedNumber = true);

      this.selectedItemCount = this.copyCategories.length;
    } else {
      const filterCopyCategories = this.copyCategories.filter(
        (filterCategory) => {
          return category.id !== filterCategory.id;
        }
      );

      this.copyCategories = filterCopyCategories;
      this.copyCategories.length > 0
        ? (this.isNotRecommandedNumber = false)
        : (this.isNotRecommandedNumber = true);
      this.selectedItemCount = this.copyCategories.length;
    }
  }

  onAddInterestCenter(): void {
    this.isProgressBarVisible = true;
    this.isNotRecommandedNumber = false;
    this.copyCategories.forEach(async (categorie) => {
      await this.us.setInterestCenter(this.userID, categorie);
      this.router.navigate(['../home']);
    });
    this.uts.showNotification(
      `Registration completed successfully, welcome to ${this.game_name}`
    );
  }
  onStartGame(): void {
    this.router.navigate(['../home']);
  }
  onWrongEmail = () => this.authService.logOut();
}
