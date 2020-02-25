export enum UserRoles {
    // eslint-disable-next-line no-unused-vars
    Standard,
    // eslint-disable-next-line no-unused-vars
    Admin,
}

type TUserRoles =
    UserRoles.Standard |
    UserRoles.Admin;


/**
 * User class
*/
export class User {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public role: TUserRoles;
    public password: string;
    public repeatPassword: string;
    public createdOn: Date;
    public modifiedOn: Date;
    static error: string;
    static md5: any;
    static hashPsw: any;
    /**
     * User class constructor
     * @param {Function} makeId create user id
     * @param {Function} isValidId check if the id is valid
     * @param {Function} userValidate
     * @param {Function} md5
     * @param {Function} hashPsw
     * @param {Object} user
    */
    constructor(
        makeId: Function,
        isValidId: any,
        userValidate: Function,
        md5: Function,
        hashPsw: Function,
        user: any,
    ) {
      User.md5 = md5;
      User.hashPsw = hashPsw;
      this._id = user._id || makeId();
      this.firstName = user.firstName;
      this.lastName = user.lastName;
      this.email = user.email;
      this.role = user.role || UserRoles.Standard;
      this.password = user.password;
      this.repeatPassword = user.repeatPassword;
      this.createdOn = user.createdOn;
      this.modifiedOn = user.modifiedOn;
      if (!isValidId(this._id)) {
        throw new Error('user must have a valid id.');
      }
      if (this.repeatPassword === undefined) {
        throw new Error('"repeatPassword" is required');
      }
      User.error = userValidate({
        _id: this._id,
        fullName: {firstName: this.firstName, lastName: this.lastName},
        email: this.email,
        role: this.role,
        password: this.password,
        repeatPassword: this.repeatPassword,
        createdOn: this.createdOn,
        modifiedOn: this.modifiedOn,
      });
      if (User.error) throw new Error(User.error);
    }
    /**
     * makeHash function
     * @return {string} return hash
    */
    makeHash():string {
      return User.md5(
          this._id +
          this.firstName +
          this.lastName +
          this.email +
          this.role,
      );
    };
    /**
     * makePswHash function
     * @return {string} return password hash
    */
    makePswHash(): string {
      return User.hashPsw(this.password);
    };
}

