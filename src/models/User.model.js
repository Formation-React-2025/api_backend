const {
  toDate,
  toString,
  toTimestamp,
  toTimestampString,
} = require('../utils/Date.utils.js');

class User {
  constructor(u) {
    this.id = u.id?.trim() ?? '';
    this.createdAt = toTimestamp(u.createdAt);
    this.createdBy = u.createdBy?.trim() ?? '';
    this.modifiedAt = toTimestamp(u.modifiedAt);
    this.modifiedBy = u.modifiedBy?.trim() ?? '';
    this.prenom = u.prenom?.trim() ?? '';
    this.nom = u.nom?.trim() ?? '';
    this.civilite = u.civilite?.trim() ?? '';
    this.dateNaissance = toDate(u.dateNaissance);
    this.email = u.email?.trim() ?? '';
  }

  updateValues({
    email, prenom, nom, civilite, dateNaissance
  }){
    this.modifiedAt(new Date());
    this.modifiedBy = 'Utilisateur';
    this.prenom = prenom?.trim() ?? '';
    this.nom = nom?.trim() ?? '';
    this.civilite = civilite?.trim() ?? '';
    this.dateNaissance = toDate(dateNaissance);
    this.email = email?.trim() ?? '';
  }

  toJson() {
    return {
      ...this,
      dateNaissance: toString(this.dateNaissance),
      createdAt: toTimestampString(this.createdAt),
      modifiedAt: toTimestampString(this.modifiedAt),
    };
  }
}

module.exports = User;
