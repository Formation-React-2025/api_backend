const {
  toDate,
  toString,
} = require('../utils/Date.utils.js');

class User {
  constructor(u) {
    this.id = u.id;
    this.prenom = u.prenom?.trim() ?? '';
    this.nom = u.nom?.trim() ?? '';
    this.sexe = u.sexe?.trim() ?? '';
    this.dateNaissance = toDate(u.dateNaissance);
    this.email = u.email?.trim() ?? '';
  }

  updateValues({
    email, prenom, nom, sexe, dateNaissance
  }){
    this.prenom = prenom?.trim() ?? '';
    this.nom = nom?.trim() ?? '';
    this.sexe = sexe?.trim() ?? '';
    this.dateNaissance = toDate(dateNaissance);
    this.email = email?.trim() ?? '';
  }

  toJson() {
    return {
      ...this,
      dateNaissance: toString(this.dateNaissance),
    };
  }
}

module.exports = User;
