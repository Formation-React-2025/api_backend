const usersJson = require('../datas/users.json');
const User = require('../models/User.model');
const {
  toDate,
} = require('../utils/Date.utils.js');
const {
  isAfter,
  isBefore,
} = require('date-fns');

const EMAIL_REGEX = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;

const likes = (string, part) => string.toLowerCase().indexOf(part.trim().toLowerCase()) > -1;

const likesTab = (string, parts) => parts.reduce((acc, part) => acc && likes(string, part), true)
const NO_FILTER = () => true;

const filter = ({
  prenom, nom, sexes, dateNaissanceMin, dateNaissanceMax, email,
}) => {
  const prenoms = prenom?.split(/\s/g)?.map((p) => p?.trim() ?? '')?.filter((p) => p !== '');
  const filterPrenom = !prenoms ? NO_FILTER : (u) => likesTab(u.prenom, prenom);

  const noms = nom?.split(/\s/g)?.map((n) => n?.trim() ?? '')?.filter((n) => n !== '');
  const filterNom = !noms ? NO_FILTER : (u) => likesTab(u.nom, noms);

  const sexesLower = sexes?.map((s) => s.trim().toUpperCase());
  const filterSexe = !sexes ? NO_FILTER : ((u) => (sexesLower.indexOf(u.sexe) > -1))

  const dateMin = toDate(dateNaissanceMin, true, false);
  const filterDateNaissanceMin = !dateMin ? NO_FILTER : (u) => isAfter(u.dateNaissance, dateMin);

  const dateMax = toDate(dateNaissanceMax, false, true);
  const filterDateNaissanceMax = !dateMax ? NO_FILTER : (u) => isBefore(u.dateNaissance, dateMax);

  const emails = email?.split(/\s/g)?.map((e) => e?.trim() ?? '')?.filter((e) => e !== '');
  const filterEmail = !emails ? NO_FILTER : (u) => likesTab(u.email, emails);

  const filters = [
    filterPrenom,
    filterNom,
    filterSexe,
    filterDateNaissanceMin,
    filterDateNaissanceMax,
    filterEmail,
  ].filter((f) => f !== NO_FILTER);

  return (u) => filters.reduce((acc, f) => acc && f(u), true);
};

class UserServices {
  maxId;
  users;
  userById;
  emails;

  constructor() {
    this.users = usersJson.map((u) => new User(u));
    this.maxId = this.users.map((u) => u.id).sort().findLast(() => true);
    this.userById = new Map(this.users.map((u) => [
      u.id,
      u
    ]));
    this.emails = new Set(this.users.map((u) => u.email));
  }

  getAll(queryParams) {
    console.log('queryParams === ', queryParams);
    if (!queryParams) {
      return this.users;
    }

    const userFilter = filter(queryParams);
    return this.users.filter(userFilter);
  }

  getById(id) {
    const user = this.userById.get(id);

    if (!user) {
      throw new Error('Aucun utilisateur avec id ' + id);
    }

    return this.userById.get(id);
  }



  create(data) {
    this.checkValidity(data, true);

    const id = this.maxId + 1;
    const user = new User({
      ...data,
      id,
    });

    this.maxId = id;
    this.users.push(user);
    this.userById.put(user.id, User);
    this.emails.add(user.email);

    return user;
  }

  update(id, data) {
    const user = this.getById(id);

    this.checkValidity(data);

    const trimedMail = data.email.trim();
    if (trimedMail !== user.email) {
      this.emails.delete(user.email);
    }

    user.updateValues(data);
    this.emails.add(user.email);

    return user;
  }

  delete(id) {
    const user = this.getById(id);

    this.emails.delete(user.email);
    this.users.splice(this.users.indexOf(user), 1);
    this.userById.delete(user.id);
  }

  checkValidity({
    email, prenom, nom, sexe, dateNaissance
  }, isCreate) {
    const emailTrimed = email?.trim() ?? '';
    if (!emailTrimed) {
      throw new Error('E-mail obligatoire.');
    }

    if (!EMAIL_REGEX.test(emailTrimed)) {
      throw new Error('Format de l\'e-mail incorrect.');
    }

    if (isCreate && this.emails.has(emailTrimed)) {
      throw new Error('E-mail déjà enregistré.')
    }

    if (!prenom?.trim()) {
      throw new Error('Prénom obligatoire.');
    }

    if (!nom?.trim()) {
      throw new Error('Nom obligatoire.');
    }

    if (!sexe?.trim()) {
      throw new Error('Sexe obligatoire.');
    }

    if (!dateNaissance?.trim()) {
      throw new Error('Date de naissance obligatoire.');
    }

    const date = toDate(dateNaissance);
    if (!date) {
      throw new Error('Date de naissance incorrecte.')
    }
  }
}

module.exports = UserServices;