import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card, chooseSub,  } from '../api/subjects.service';
import { UserService, User } from '../services/user.service';
import { StatsService, Stat, groupStats } from '../api/stats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  subjectId: string = "5af4551e2c4927aa694c05e0";
  subject: Subject;
  groupsId: string;
  groups: any;
  stats: Stat[];
  groupStats: any;
  subjects: any;
  isAdmin: boolean;
  usersArray: Array<string> = [];

  // arrayOfUsersInGroup = groupStats.users

  allUsersWhoBelong: User[];
  allUsersWhoDontBelong: User[];
  thisSub: chooseSub;
  addUserState: boolean = false;
  addSubState: boolean = false;
  search: string = "";
  selectedSubjectId: string = "";


  constructor(
    private reqTruc: ActivatedRoute,
    public apiGroup: GroupsService,
    public apiSubject: SubjectsService,
    public apiStats: StatsService,
    private resTruc: Router,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.apiStats.getAllStatsForUserById("5af4551e2c4927aa694c05e0" , "5af4551e2c4927aa694c05da")
    .then((result)=> {
      console.log("getAllStatsForUserById!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log(result)

    })

    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.groupsId = myParams.get('groupId');
        this.getSubjectsList();
        this.getGroupStatsList();
        // this.mapAndReduceFunction();
        // this.getIndividualStats(user);
      })

      this.mapAndReduceFunction().then(x => {console.log(x)})

  }

  getSubjectsList() {
    this.apiGroup.getDetails(this.groupsId)
    .then((result: Group[]) => {
      this.groups = result;
      this.checkIfAdmin();
    })
    .catch((err) => {
      console.log('Group details error')
      console.log(err)
    })
  }

  getCardsList() {
    return this.apiSubject.getSubDetails(this.subjectId)
      .then((result: Subject) => {
        this.subject = result;
        return this.subject;
      })
      .catch((err) => {
        console.log('getCardsList details error')
        console.log(err)
      })
  }

  getCardsListById(userId) {
    return this.apiSubject.getSubDetails(this.subjectId)
      .then((result: Subject) => {
        this.subject = result;
        return this.subject;
      })
      .catch((err) => {
        console.log('getCardsListById details error')
        console.log(err)
      })
  }

  getStatsList() {
    return this.apiStats.getAllStatsForUser(this.subjectId)
      .then((result: Stat[]) => {
        this.stats = result;
        return this.stats;
      })
      .catch((err) => {
        console.log('getStatsList details error')
        console.log(err)
      })
  }

  getStatsListById(userId) {
    return this.apiStats.getAllStatsForUser(this.subjectId)
      .then((result: Stat[]) => {
        this.stats = result;
        return this.stats;
      })
      .catch((err) => {
        console.log('getStatsList details error')
        console.log(err)
      })
  }

  checkIfAdmin(){
    this.userService.checkLogin()
    .then((result)=>{
      if(result.userInfo._id === this.groups.admin){
        console.log(result.userInfo._id , this.groups.admin)
        console.log('youre the admin of this group')
        this.isAdmin = true;
      }else{
        console.log(result.userInfo._id , this.groups.admin)
        this.isAdmin = false;
        console.log('youre NOT the admin of this group')
      }
    })
    .catch((err)=>{
      console.log('err seeing if admin')
    })
  }

  showAddSubForm(){
    this.apiSubject.getAllTheSubjects()
    .then((result)=>{
      this.subjects = result;
      this.addSubState = !this.addSubState;
      console.log(result)
    })
    .catch((err)=>{
      console.log(err);
    })

    console.log(this.subjects)

  }

  chooseThisSub(event:any){
    this.selectedSubjectId = event.target.value;
    console.log(this.selectedSubjectId)
  }

  addThisSub(){
    this.apiGroup.addSubjectToGroup(this.selectedSubjectId, this.groupsId)
    .then((result)=>{
      this.addSubState = false;
      this.getSubjectsList()
      console.log('added this subject to group')
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  usersUpdate(){
    this.userService.getAllUsersWhoBelong(this.groupsId)
    .then((result)=>{
      this.allUsersWhoBelong = result;
      console.log(this.allUsersWhoBelong)
    })
    .catch((err)=>{
      console.log(err)
    })
    this.userService.getAllUsersWhoDontBelong(this.groupsId)
    .then((result)=>{
      this.allUsersWhoDontBelong = result;
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  showAddUserForm(){
    this.addUserState = !this.addUserState;
    this.usersUpdate();
  }

  getGroupStatsList() {
    return this.apiStats.getAllStatsForUsersInGroup(this.groupsId)
      .then((result: groupStats[]) => {
        this.groupStats = result;
        console.log("GROUP STATS LIST")
        console.log(result)
      
        this.groupStats.users.forEach((one)=> {
          this.usersArray.push(one._id)
        })
        
        //console.log('one ',this.usersArray[0]);
        this.mapAndReduceFunction();
        return this.groupStats;
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  addUserToGroup(userId){
    this.apiGroup.addThisUserToThisGroup(userId, this.groupsId)
    .then((result)=>{
      this.usersUpdate();
      console.log(result)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  deleteUserFromGroup(userId){
    this.apiGroup.deleteThisUserFromTheGroup(userId, this.groupsId)
    .then((result)=>{
      this.usersUpdate();
      console.log(result);
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  

  mapAndReduceFunction() {
    //console.log("AAAAAAAAAAAAAA", this.usersArray)
    return Promise.all(this.usersArray.map(id => {
      return this.getIndividualStats(id)
    }) )

    // var aveNumberOfCards = (arr.reduce(function (a, b) {return a + b.numberOfCards}, 0))/(groupStats.users.length);
    // var aveAverageRating = (arr.reduce(function (a, b) {return a + b.averageRating}, 0))/(groupStats.users.length);
    // // var avePercentageComplete = (arr.reduce(function (a, b) {return a + b.percentageComplete}, 0))/(groupStats.users.length);
    // var aveCardsViewed = (arr.reduce(function (a, b) {return a + b.cardsViewed}, 0))/(groupStats.users.length);        
    // var aveNumberCardsMastered = (arr.reduce(function (a, b) {return a + b.numberCardsMastered}, 0))/(groupStats.users.length);
  }

  //         cardRatingsDistribution, (another object, not direct average)
  //         bestCard (max, iteration, not average), 
  //         worstCard (max, iteration, not average) 
 
// function(arry) => averages
  //user needs to be passed to the service through either getStatsList or getCardsList
  getIndividualStats(user) {
     var promiseStats = this.getStatsListById(user)
     var promiseCards = this.getCardsListById(user)
    return Promise.all([promiseStats, promiseCards])
      .then((result: any) => {
        const ratedStats = result[0];
        const subjectCards = result[1].cards;
        console.log({ratedStats, subjectCards})

        //get basic stats
        var numberOfCards = subjectCards.length

    
        var sumOfRatings = ratedStats.reduce(function (a, b) {
          return a + b.rating;
        }, 0);
        var averageRating = (sumOfRatings / numberOfCards)

        var percentageComplete = averageRating / 5 * 100

        var cardsViewed = ratedStats.length

        //get card distribution and number of cards mastered (rating of 5)
        var cardRatingsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratedStats.forEach((stat) => {
          cardRatingsDistribution[stat.rating]++
        })

        var numberCardsMastered = cardRatingsDistribution[5];

        // get best and worst cards

        var maxRating = ratedStats.reduce(function(a: number, b: Stat) {
          return Math.max(a, b.rating);
        }, 0);
        
        var bestStat; //card with highest rating and minimum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === maxRating){
            if (bestStat === undefined || (stat.seen < bestStat.seen)){
              bestStat = stat;
            }
          }
        })

        var bestCard = subjectCards.find((card) => {
          return bestStat.card === card._id
        })
        

        var minRating = ratedStats.reduce(function(a: number, b: Stat) {
          return Math.min(a, b.rating);
        }, 5);
        
        var worstStat; //card with lowest rating and maximum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === minRating){
            if (worstStat === undefined || (stat.seen > worstStat.seen)){
              worstStat = stat;
            }
          }
        })

        var worstCard = subjectCards.find((card) => {
          return worstStat.card === card._id
        })

        return {
          numberOfCards, 
          sumOfRatings, 
          averageRating, 
          percentageComplete,  
          cardsViewed, 
          cardRatingsDistribution, 
          numberCardsMastered,
          bestCard, 
          worstCard
        }
      })
      .catch((err) => { 
        console.log("individual stats error")
        console.log(err)
      })
  };

}