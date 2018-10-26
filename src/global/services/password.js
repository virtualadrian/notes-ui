export default class PasswordValidate {
  passwordInfo = {
    password: '',
    confirmPassword: ''
  };

  validate(validatingPassword, validatingPasswordConfirm) {
    this.passwordInfo.password = validatingPassword;
    this.passwordInfo.confirmPassword = validatingPasswordConfirm;
  }

  isValid() {
    return this.passwordValid;
  }

  get passwordValid() {
    return this.lengthValid &&
      this.uppercaseValid &&
      this.lowercaseValid &&
      this.numberOrSpecialValid &&
      this.matchConfirmation;
  }

  get matchConfirmation() {
    return (this.passwordInfo.password && this.passwordInfo.confirmPassword) &&
      (this.passwordInfo.password === this.passwordInfo.confirmPassword);
  }

  get lengthValid() {
    return this.passwordInfo.password.length >= 8;
  };

  get uppercaseValid() {
    return /[A-Z]/.test(this.passwordInfo.password);
  };

  get lowercaseValid() {
    return /[a-z]/.test(this.passwordInfo.password);
  };

  get numberOrSpecialValid() {
    return /\d/.test(this.passwordInfo.password) ||
      /[!@#$%^&*()]/.test(this.passwordInfo.password);
  }

  get numberValid() {
    return /\d/.test(this.passwordInfo.password);
  };

  get specialValid() {
    return /[!@#$%^&*()]/.test(this.passwordInfo.password);
  };
}

