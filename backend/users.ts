export class User {
  constructor(
    public email: string,
    public name: string,
    private password: string
  ) {}

  matches(another: User): boolean {
    return (
      another !== undefined &&
      another.email === this.email &&
      another.password == this.password
    );
  }
}

export const users: { [key: string]: User } = {
  "roberto@meat.com": new User("roberto@meat.com", "Roberto", "senhaMeat@20"),
  "julia@meat.com": new User("julia@meat.com", "Julia", "PassDeliveryt@20"),
};
