export const emailCheck =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

export const pwCheck = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/;
