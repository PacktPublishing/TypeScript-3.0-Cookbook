//`^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-. ]?(?:[0-9]{3})[-. ]?(?:[0-9]{4})$`

class UsPhoneNumber {
  public static validate(phoneNumber: string): boolean {
    const regularExpression: RegExp = new RegExp(`^(?:\\((?:[0-9]{3})\\)|(?:[0-9]{3}))[-. ]?(?:[0-9]{3})[-. ]?(?:[0-9]{4})$`);
    return regularExpression.test(phoneNumber);
  }
}

function testPhoneNumbers(phoneNumber: string): void {
  console.log(`Testing ${phoneNumber}. Result ${UsPhoneNumber.validate(phoneNumber)}`);
}

testPhoneNumbers('(628)2462 2222');
testPhoneNumbers('6282462 2222');
testPhoneNumbers('628 2462 2222');
testPhoneNumbers('(628)246 2222');
testPhoneNumbers('(628)246-2222');
testPhoneNumbers('628246 2222');
testPhoneNumbers('628 246 2222');