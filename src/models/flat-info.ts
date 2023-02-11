export enum FlatType {
  Studio = 'Studio',
  OneBedroom = 'OneBedroom',
  TwoBedrooms = 'TwoBedrooms',
  Unknown = 'Unknown',
}

export class FlatInfo {
  get flatType(): FlatType {
    switch (true) {
      case this.link.includes('studio'):
        return FlatType.Studio;
      case this.link.includes('1-bedroom'):
        return FlatType.OneBedroom;
      case this.link.includes('2-bedroom'):
        return FlatType.TwoBedrooms;
      default:
        return FlatType.Unknown;
    }
  };

  constructor(
    public price: number,
    public link: string,
    public dateAndLocation: string,
  ) {}

}
