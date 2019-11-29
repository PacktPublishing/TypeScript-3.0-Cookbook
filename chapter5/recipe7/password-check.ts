class PasswordStrength {
  public static validate(password: string): boolean {
    const regularExpression: RegExp = new RegExp(/(?=(.*\d))(?=.*[a-z])(?=(.*[A-Z]))(?=.*[\!"£$%^&*()\\[\]{}_+\-*/=@#~¬`|:;'<>,./?]).{12,}/);
    return regularExpression.test(password);
  }
}

function testPassword(password: string): void {
  console.log(`Testing: ${password}. Result ${PasswordStrength.validate(password)}`);
}

testPassword('failingpassword');
testPassword('Failingpassword');
testPassword('Fa1lingPassword');
testPassword('pa$s1ngP4ssword');
testPassword('pasS1ngPassword+');
testPassword('pasS1ngPassword-');