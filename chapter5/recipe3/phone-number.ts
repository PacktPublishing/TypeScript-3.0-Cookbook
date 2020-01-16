class UsPhoneNumber {
  public static validate(phoneNumber: string): boolean {
    return phoneNumber.match(/^(?:\((?:\d{3})\)|(?:\d{3}))[-. ]?(?:\d{3})[-. ]?(?:\d{4})$/) !== null;
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