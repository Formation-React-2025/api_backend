const {
  floor,
  random,
} = Math;

const ALPHABET = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const NUMBERS = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
];

const randomInt = (max) => floor(random() * max);

const generateId = (identifiants) => {
  const identifiant = ALPHABET[randomInt(26)]
    + ALPHABET[randomInt(26)]
    + ALPHABET[randomInt(26)]
    + ALPHABET[randomInt(26)]
    + NUMBERS[randomInt(10)]
    + NUMBERS[randomInt(10)]
    + NUMBERS[randomInt(10)]
  ;

  if (identifiants.has(identifiant)) {
    return generateId(identifiants);
  }

  return identifiant;
};

const IdentifiantUtils = {
  generateId,
};

module.exports = IdentifiantUtils;