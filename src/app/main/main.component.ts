import { Component, OnInit } from '@angular/core';
import { GroupsService, Group } from '../api/groups.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, SubjectsService, Card, chooseSub, } from '../api/subjects.service';
import { UserService, User } from '../services/user.service';
import { StatsService, Stat, GroupStats } from '../api/stats.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  //subjectId: string = "5af4551e2c4927aa694c05e0";
  subject: Subject;
  groupsId: string;
  groups: any;
  stats: Stat[];
  groupStats: any;
  subjects: any;
  isAdmin: boolean;
  usersArray: Array<string> = [];
  currentUserIndividualStats = {};


  hoveredSubject: any;

  statsBySubject = {};

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
    this.reqTruc.paramMap
      .subscribe((myParams) => {
        this.groupsId = myParams.get('groupId');
        this.getSubjectsList()
          .then(group => {
            this.getGroupStatsList();
          })



        // this.mapAndReduceFunction();
        // this.getIndividualStats(user);
      })

    // this.mapAndReduceFunction().then(x => {console.log(x)})

  }

  getSubjectsList() {
    return this.apiGroup.getDetails(this.groupsId)
      .then((result: Group[]) => {
        this.groups = result;
        this.checkIfAdmin();
        return result
      })
      .catch((err) => {
        console.log('Group details error')
        console.log(err)
      })
  }

  //This function returns all the cards attached to the current subject
  // getCardsList() {
  //   return this.apiSubject.getSubDetails(this.subjectId)
  //     .then((result: Subject) => {
  //       this.subject = result;
  //       return this.subject;
  //     })
  //     .catch((err) => {
  //       console.log('getCardsList details error')
  //       console.log(err)
  //     })
  // }

  // getCardsListForUser(userId: string) {
  //   return this.apiSubject.getSubDetails(this.subjectId)
  //     .then((result: Subject) => {
  //       this.subject = result;
  //       return this.subject;
  //     })
  //     .catch((err) => {
  //       console.log('getCardsListById details error')
  //       console.log(err)
  //     })
  // }

  // getStatsList() {
  //   return this.apiStats.getAllStatsForUser(this.subjectId)
  //     .then((result: Stat[]) => {
  //       this.stats = result;
  //       return this.stats;
  //     })
  //     .catch((err) => {
  //       console.log('getStatsList details error')
  //       console.log(err)
  //     })
  // }

  getStatsListForUser(subjectId: string, userId: string) {
    return this.apiStats.getAllStatsForUserById(subjectId, userId)
      .then((result: Stat[]) => {
        this.stats = result;
        return this.stats;
      })
      .catch((err) => {
        console.log('getStatsList details error')
        console.log(err)
      })
  }

  checkIfAdmin() {
    this.userService.checkLogin()
      .then((result) => {
        if (result.userInfo._id === this.groups.admin) {
          console.log(result.userInfo._id, this.groups.admin)
          console.log('youre the admin of this group')
          this.isAdmin = true;
        } else {
          console.log(result.userInfo._id, this.groups.admin)
          this.isAdmin = false;
          console.log('youre NOT the admin of this group')
        }
      })
      .catch((err) => {
        console.log('err seeing if admin')
      })
  }

  showAddSubForm() {
    this.apiSubject.getAllTheSubjects()
      .then((result) => {
        this.subjects = result;
        this.addSubState = !this.addSubState;
        console.log(result)
      })
      .catch((err) => {
        console.log(err);
      })

    console.log(this.subjects)

  }

  chooseThisSub(event: any) {
    this.selectedSubjectId = event.target.value;
    console.log(this.selectedSubjectId)
  }

  addThisSub() {
    this.apiGroup.addSubjectToGroup(this.selectedSubjectId, this.groupsId)
      .then((result) => {
        this.addSubState = false;
        this.getSubjectsList()
        console.log('added this subject to group')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  usersUpdate() {
    this.userService.getAllUsersWhoBelong(this.groupsId)
      .then((result) => {
        this.allUsersWhoBelong = result;
        console.log(this.allUsersWhoBelong)
      })
      .catch((err) => {
        console.log(err)
      })
    this.userService.getAllUsersWhoDontBelong(this.groupsId)
      .then((result) => {
        this.allUsersWhoDontBelong = result;
      })
      .catch((err) => {
        console.log(err)
      })
  }

  showAddUserForm() {
    this.addUserState = !this.addUserState;
    this.usersUpdate();
  }

  getAverageCompleteForSubject(subjectId){
    if (!this.statsBySubject[subjectId]) {
      return {};
    }
    return this.statsBySubject[subjectId].avePercentageComplete; 
  }

  //this function populates the stats for the current group
  getGroupStatsList() {
    var usersArray = this.groups.users.map(one => one._id); // extract the user ids
    usersArray.push(this.groups.admin); 

    //Compute stats for each subject across all users in the group
    this.groups.subjects.forEach(subject => {

      this.computeStatsAcrossUsers(subject._id, usersArray)
        .then((result: any) => {
          console.log(subject._id, usersArray)
          console.log('Bbbbbbbbbb', result)
          this.statsBySubject[subject._id] = result; 
          this.statsBySubject[result.subjectId] = result

        })
    })

    // this.groupStats = result;
    // console.log("GROUP STATS LIST")
    // console.log(result)

    // //console.log('one ',this.usersArray[0]);
    // this.computeStatsAcrossUsers(this.usersArray); 
    // return this.groupStats;
  }

  addUserToGroup(userId) {
    this.apiGroup.addThisUserToThisGroup(userId, this.groupsId)
      .then((result) => {
        this.usersUpdate();
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteUserFromGroup(userId) {
    this.apiGroup.deleteThisUserFromTheGroup(userId, this.groupsId)
      .then((result) => {
        this.usersUpdate();
        console.log(result);
      })
      .catch((err) => {
        console.log(err)
      })
  }


  computeStatsAcrossUsers(subjectId: string, users: string[]) {
    return Promise.all(

      users.map(userId => this.getIndividualStats(subjectId, userId))
    ).then((individualStatsByUser: any) => {

      
      this.userService.checkLogin()
        .then((result) => {
          this.currentUserIndividualStats[subjectId] = individualStatsByUser.find(s => s.userId == result.userInfo._id)
          console.log("HERE!!!!!!!!!!!!!!", result)
          console.log("NOW!!!!!!!!!!", individualStatsByUser)
        })
     

      const numberOfUsers = users.length

      var arr = individualStatsByUser.filter(s => s.cardsViewed > 0) 

      var numberOfCards = this.groups.subjects.find(s => s._id === subjectId).cards.length

      var aveAverageRating = (arr.reduce(function (a, b) { return a + b.averageRating }, 0)) / numberOfUsers;
      var avePercentageComplete = Math.floor((arr.reduce(function (a, b) { return a + b.percentageComplete }, 0)) / numberOfUsers);
      var aveCardsViewed = (arr.reduce(function (a, b) { return a + b.cardsViewed }, 0)) / numberOfUsers;
      var aveNumberCardsMastered = (arr.reduce(function (a, b) { return a + b.numberCardsMastered }, 0)) / numberOfUsers;

      var cardRatingsDistribution = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}
      arr.forEach((stat) => {
        cardRatingsDistribution[1] += stat.cardRatingsDistribution[1];
        cardRatingsDistribution[2] += stat.cardRatingsDistribution[2];
        cardRatingsDistribution[3] += stat.cardRatingsDistribution[3];
        cardRatingsDistribution[4] += stat.cardRatingsDistribution[4];
        cardRatingsDistribution[5] += stat.cardRatingsDistribution[5];
      })

      return {
        numberOfUsers,
        subjectId,
        aveAverageRating,
        avePercentageComplete,
        aveCardsViewed,
        aveNumberCardsMastered,
        numberOfCards,
        cardRatingsDistribution
      }

    }).catch(err => {
      console.log(err)
    })


  }

  //         cardRatingsDistribution, (another object, not direct average)
  //         bestCard (max, iteration, not average), 
  //         worstCard (max, iteration, not average) 

 
  getIndividualStats(subjectId, userId) {
    return this.getStatsListForUser(subjectId, userId)
      .then((ratedStats: any) => {
        const subjectCards = this.groups.subjects.find(s => s._id === subjectId).cards;
        //get basic stats
        var numberOfCards = subjectCards.length

        if (ratedStats.length == 0) {
          return {
            subjectId,
            userId,
            numberOfCards,
            sumOfRatings: null,
            averageRating: null,
            percentageComplete: 0,
            cardsViewed: 0,
            cardRatingsDistribution: null,
            numberCardsMastered: 0,
            bestCard: null,
            worstCard: null
          }
        }

        var sumOfRatings = ratedStats.reduce(function (a, b) {
          return a + b.rating;
        }, 0);
        var averageRating = (sumOfRatings / numberOfCards)

        var percentageComplete = Math.floor(averageRating / 5 * 100)

        var cardsViewed = ratedStats.length

        //get card distribution and number of cards mastered (rating of 5)
        var cardRatingsDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        ratedStats.forEach((stat) => {
          cardRatingsDistribution[stat.rating]++
        })

        var numberCardsMastered = cardRatingsDistribution[5];

        // get best and worst cards

        var maxRating = ratedStats.reduce(function (a: number, b: Stat) {
          return Math.max(a, b.rating);
        }, 0);

        var bestStat; //card with highest rating and minimum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === maxRating) {
            if (bestStat === undefined || (stat.seen < bestStat.seen)) {
              bestStat = stat;
            }
          }
        })

        var bestCard = subjectCards.find((card) => {
          return bestStat.card === card._id
        })


        var minRating = ratedStats.reduce(function (a: number, b: Stat) {
          return Math.min(a, b.rating);
        }, 5);

        var worstStat; //card with lowest rating and maximum number of views
        ratedStats.forEach((stat: Stat) => {
          if (stat.rating === minRating) {
            if (worstStat === undefined || (stat.seen > worstStat.seen)) {
              worstStat = stat;
            }
          }
        })

        var worstCard = subjectCards.find((card) => {
          return worstStat.card === card._id
        })

        return {
          subjectId,
          userId,
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

  mouseEnter(subject) {
    this.hoveredSubject = subject;
  }

  mouseLeave(subject) {
    this.hoveredSubject = null;
  }

}