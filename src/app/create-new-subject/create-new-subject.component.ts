import { Component, OnInit } from '@angular/core';
import { SubjectsService, Subject } from '../api/subjects.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-new-subject',
  templateUrl: './create-new-subject.component.html',
  styleUrls: ['./create-new-subject.component.css']
})
export class CreateNewSubjectComponent implements OnInit {

  subjectId: string;
  subjectData: Subject;

  constructor(
    public subService: SubjectsService,
    public actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getSubjectId()
    
  }

  getSubjectId(){
    this.actRoute.paramMap
    .subscribe(myParams=>{
      this.subjectId = myParams.get('subId');
      this.getSubjectData()
    })
  }

  getSubjectData(){
    this.subService.getSubInfo(this.subjectId)
    .then((result)=>{
      this.subjectData= result;
    })
    .catch((err)=>{
      console.log(err, 'error getting sub info')
    })
  }
  
}
