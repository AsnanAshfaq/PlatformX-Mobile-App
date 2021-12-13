export const commaSeperator = (number: number | string) => {
  let string: string = number.toString();
  let stringreverse = string.split('').reverse().join('');
  let commaSeperatedString = '';

  //   if string length is greater than 3
  if (stringreverse.length > 3) {
    for (let index = 0; index < stringreverse.length; index++) {
      if (index % 3 === 0 && index !== 0) {
        //   if it is not the first value and the index is divisible by 3
        //   then concatinate comma with string
        commaSeperatedString += ',';
      }
      //   concatinate string value
      commaSeperatedString += stringreverse[index];
    }
    const commaSeperatedNumber = commaSeperatedString
      .split('')
      .reverse()
      .join('');
    return commaSeperatedNumber;
  } else {
    return string;
  }
};
