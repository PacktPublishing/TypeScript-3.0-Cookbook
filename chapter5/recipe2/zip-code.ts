export class ZipCode {
  public static validate(zipCode: string): boolean {
    const regularExpression: RegExp = new RegExp("^[0-9]{5}(?:-[0-9]{4})?$");
    return regularExpression.test(zipCode);
  }
}

function testZipCode(zipCode: string): void {
  console.log(`Testing ${zipCode}. Result ${ZipCode.validate(zipCode)}`);
}

testZipCode('4444');
testZipCode('55555 555');
testZipCode('55555 5555');
testZipCode('55555-555');
testZipCode('12345');
testZipCode('55555-5555');
