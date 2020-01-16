export class ZipCode {
  public static validate(zipCode: string): boolean {
    return zipCode.match(/^\d{5}(?:-\d{4})?$/) !== null;
  }
}

function testZipCode(zipCode: string): void {
  console.log(`Testing ${zipCode}. Result ${ZipCode.validate(zipCode)}`);
}

testZipCode('4444');
testZipCode('55555 555');
testZipCode('55555 5555');
testZipCode('55555-555');
testZipCode('12345 ');
testZipCode('12345');
testZipCode('55555-5555');
