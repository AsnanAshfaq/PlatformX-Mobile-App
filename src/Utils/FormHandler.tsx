const FormHandler = () => {
  const isEmpty = (value: string): boolean => {
    return value.trim().length === 0 ? true : false;
  };

  const checkLength = (value: string, min: number, max: number): string => {
    return value.trim().length < min
      ? 'min'
      : value.trim().length > max
      ? 'max'
      : '';
  };

  const isOnylAlphabets = (value: string): boolean => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(value) ? true : false;
  };

  const isEmailValid = (value: string): boolean => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !emailRegex.test(String(value.trim()).toLowerCase()) ? false : true;
  };

  const isSame = (value1: string, value2: string): boolean => {
    return value1.trim() !== value2.trim() ? false : true;
  };

  const isPhoneNumberValid = (value: string) => {
    const phoneRegex = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
    return phoneRegex.test(value) ? true : false;
  };

  const isLinkValid = (value: string) => {
    const linkRegex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    return linkRegex.test(String(value).toLowerCase()) ? true : false;
  };

  return {
    isEmailValid,
    isEmpty,
    isSame,
    checkLength,
    isOnylAlphabets,
    isLinkValid,
    isPhoneNumberValid,
  };
};

export default FormHandler;
