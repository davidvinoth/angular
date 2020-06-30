import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { EnrollmentService } from '../../core/enrollment.service';
import { TokenServiceService } from '../../core/token-service.service';
import { OnlineofflineService } from '../../core/onlineoffline.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  token: String;
  title = 'Symptom Checker';
  topics = ['Angular', 'React', 'Vue'];
  physicalConditionOptions = ["I feel physically normal", "I am not feeling quite right"];
  booleanOptions = ['Yes', 'No'];
  topicHasError = true;
  submitted = false;
  errorMsg = '';
  physicalConditionHasValue = true;
  isCloseContact = true;
  masterSelected: boolean;
  checkedList: any;
  response: any;
  request: any = {};

  Data: Array<any> = [
    { name: 'No existing conditions', value: 'No existing conditions', isSelected: false },
    { name: 'Asthma', value: 'Asthma', isSelected: false },
    { name: 'Cancer', value: 'Cancer', isSelected: false },
    { name: 'Diabetes', value: 'Diabetes', isSelected: false },
    { name: 'Heart Diseases', value: 'Heart Diseases', isSelected: false }
  ];
  userModel = new User('default', 23, 'male', true, []);


  constructor(private _enrollmentService: EnrollmentService, private tokenService: TokenServiceService, private onlineOfflineService: OnlineofflineService) {
    this.masterSelected = false;
    // this.registerToEvents();
  }

  private registerToEvents() {
    this.onlineOfflineService.connectionChanged.subscribe(online => {
      if (online) {
        console.log('went online');
        console.log('sending all stored items');
      } else {
        console.log('went offline, storing in indexdb');
      }
    });
  }

  ngOnInit(): void {
    this.tokenService.token.subscribe(message => this.token = message);
  }

  validateTopic(value) {
    if (value === 'default') {
      this.physicalConditionHasValue = true;
    } else {
      this.physicalConditionHasValue = false;
    }
  }

  validateContact(value) {
    if (value === 'default') {
      this.isCloseContact = true;
    } else {
      this.isCloseContact = false;
    }
  }

  onSubmit() {
    this.getCheckedItemList();

    this.request = { ...this.userModel };
    this.request.symptoms = JSON.stringify(this.checkedList);
    this.request.token = this.token;
    this.title = "Risk of COVID-19";
    this._enrollmentService.enroll(this.request)
      .subscribe((response) => {
        this.response = response.result;
        this.response.symptoms = JSON.parse( this.response.symptoms );
        console.log('Success!', this.response);
      },
        error => this.errorMsg = error.statusText
      );

      this.submitted = true;
  }

  isAllSelected() {
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    for (var i = 0; i < this.Data.length; i++) {
      if (this.Data[i].isSelected && this.Data[i].value)
        this.checkedList.push(this.Data[i].value);
    }
  }

}
