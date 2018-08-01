/**
 * Created by rickus on 8/1/18.
 */

export class FormValidators{

  constructor(){}

  // used to check if a password passes the requirments
  // a password must have at least 8 characters
  passwordvalidator(value){
    const re = new RegExp('.{8,}');
    let test = re.test(value);
    if(!test){
      return false;
    }
    return true;

  }
}

