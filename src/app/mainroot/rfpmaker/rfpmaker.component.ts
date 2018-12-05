import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-rfpmaker',
  templateUrl: './rfpmaker.component.html',
  styleUrls: ['./rfpmaker.component.scss']
})
export class RfpmakerComponent implements OnInit {

  constructor() { }


  @ViewChild('rfpform') rfpform: NgForm;

  submitform() {
    let payload = {
      eventname: this.rfpform.form.value.eventname,
      purpose : this.rfpform.form.value.purpose,
      date : this.rfpform.form.value.date,
      starttime : this.rfpform.form.value.starttime,
      endtime : this.rfpform.form.value.endtime,
      personcount : this.rfpform.form.value.count,
      budget : this.rfpform.form.value.budget,
      comments: this.rfpform.form.value.comments,
      surroundsound : this.rfpform.form.value.surroundsound,
      microphone : this.rfpform.form.value.microphone,
      stage : this.rfpform.form.value.stage,
      television : this.rfpform.form.value.television,
      screenprojector : this.rfpform.form.value.screenprojector,
      nautrallight : this.rfpform.form.value.naturallight,
      wifi : this.rfpform.form.value.wifi,
      wheelchair : this.rfpform.form.value.wheelchair,
      cocktail : this.rfpform.form.value.cocktail,
      classroom: this.rfpform.form.value.classroom,
      ushape : this.rfpform.form.value.ushape,
      banquet : this.rfpform.form.value.banquet,
      boardroom : this.rfpform.form.value.boardroom,
      hallow : this.rfpform.form.value.hallow,
      theather : this.rfpform.form.value.theater,
      herringbone: this.rfpform.form.value.herringbone,
      indiv: this.rfpform.form.value.indiv,
      family: this.rfpform.form.value.family,
      familystyle : this.rfpform.form.value.familystyle,
      buffet : this.rfpform.form.value.buffet,
      passed : this.rfpform.form.value.passed,
      other: this.rfpform.form.value.other,
      othertext : this.rfpform.form.value.othertext

    };

  }



    ngOnInit() {

  }

  }


