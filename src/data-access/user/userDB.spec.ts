/* eslint-disable max-len */
import mongoose from 'mongoose';
import User, {addNewUser, getUserById} from './userSchema';
import makeFakeUser from '../../../mock/fakeUser';
import makeFakeUserDb from '../../../mock/fakeUserDb';
import faker from 'faker';

const _email = 'test@gmail.com';


describe('User-Model-Test', () => {
  beforeAll(async () => {
    try {
      const url = String(process.env.MONGO_URL);
      await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.log(err);
    }
  });


  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });


  describe('add-new-user', () => {
    it('Add new User to DB, check if user is saved with success in DB', async () => {
      const fakeUser = makeFakeUser();
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      const result = await addNewUser(user);

      expect(result.id).toEqual(user._id);
      expect(result.fullName.firstName).toEqual(user.fullName.firstName);
      expect(result.fullName.lastName).toEqual(user.fullName.lastName);
      expect(result.email).toEqual(user.email);
      expect(result.role).toEqual(user.role);
      expect(result.createdOn).toEqual(user.createdOn);
      expect(result.modifiedOn).toEqual(user.modifiedOn);
    });
  });


  describe('add-empty-user', () => {
    it('Add Empty User to DB, User Validation must failed', async () => {
      const user = new User();

      await expect(addNewUser(user)).rejects.toThrowError();
    });
  });


  describe('id-validation', () => {
    it('Add New User with no id, id is required', async () => {
      const fakeUser = makeFakeUser({_id: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('User validation failed: _id: Path `_id` is required.');
    });

    it('Add new User with invalid id, Must have a valid id', async () => {
      const fakeUser = makeFakeUser({_id: 22222});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('"_id" is not valid');
    });
  });


  describe('firstName-validation', () => {
    it('Add new User with no firstName, Must have a firstName', async () => {
      const fakeUser = makeFakeUser({firstName: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `fullName.firstName` is required.');
    });

    it('Add firstName with invalid type, firstName must be of type string', async () => {
      const fakeUser = makeFakeUser({firstName: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to String failed for value "{}" at path "fullName.firstName"');
    });

    it('Add firstName contain non-alpha-numeric characters, firstName must only contain alpha-numeric characters', async () => {
      const fakeUser = makeFakeUser({firstName: 'test!_!'});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('First name must only contain alpha-numeric characters');
    });

    it('Add firstName with length less than 3 characters long, firstName length must be at least 3 characters long', async () => {
      const firstName = faker.random.alphaNumeric(2);
      const fakeUser = makeFakeUser({firstName: firstName});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('First name length must be at least 3 characters long');
    });

    it('Add firstName with length greater than 30 characters long, firstName length must be less than or equal to 30 characters long', async () => {
      const firstName = faker.random.alphaNumeric(31);
      const fakeUser = makeFakeUser({firstName: firstName});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('First name length must be less than or equal to 30 characters long');
    });
  });


  describe('lastName-validation', () =>{
    it('Add new User with no lastName, Must have a lastName', async () => {
      const fakeUser = makeFakeUser({lastName: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `fullName.lastName` is required.');
    });

    it('Add lastName with invalid type, lastName must be of type string', async () => {
      const fakeUser = makeFakeUser({lastName: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to String failed for value "{}" at path "fullName.lastName"');
    });

    it('Add lastName contain non-alpha-numeric characters, lastName must only contain alpha-numeric characters', async () => {
      const fakeUser = makeFakeUser({lastName: 'test!_!'});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Last name must only contain alpha-numeric characters');
    });

    it('Add lastName with length less than 3 characters long, lastName length must be at least 3 characters long', async () => {
      const lastName = faker.random.alphaNumeric(2);
      const fakeUser = makeFakeUser({lastName: lastName});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Last name length must be at least 3 characters long');
    });

    it('Add lastName with length greater than 30 characters long, lastName length must be less than or equal to 30 characters long', async () => {
      const lastName = faker.random.alphaNumeric(31);
      const fakeUser = makeFakeUser({lastName: lastName});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Last name length must be less than or equal to 30 characters long');
    });
  });


  describe('email-validation', () => {
    it('Add new User with no email, Email is required', async () => {
      const fakeUser = makeFakeUser({email: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `email` is required.');
    });

    it('Add email with invalid type, email must be of type String', async () => {
      const fakeUser = makeFakeUser({email: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to String failed for value "{}" at path "email"');
    });

    it('Add valid email, user must be saved in db', async () => {
      const email = faker.internet.email();
      const fakeUser = makeFakeUser({email: email});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      const result = await addNewUser(user);
      expect(result.email).toEqual(user.email);
    });

    it('Add invalid email, email must be valid', async () => {
      const fakeUser = makeFakeUser({email: 'test.zz'});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Email is not valid');
    });

    it('Add email already saved in DB, email must be unique', async () => {
      const _fakeUser = makeFakeUser({email: _email});
      const _fakeUserDb = makeFakeUserDb(_fakeUser);
      const _user = new User(_fakeUserDb);

      await addNewUser(_user);

      const fakeUser = makeFakeUser({email: _email});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('E11000 duplicate key');
    });
  });


  describe('role-validation', () => {
    it('Add role different to 0 or 1, role must be one of [0, 1]', async () => {
      const fakeUser = makeFakeUser({role: 2});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('`2` is not a valid enum value for path `role`.');
    });

    it('Add undefined role, Role must 0 by default', async () => {
      const fakeUser = makeFakeUser({role: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      const result = await addNewUser(user);

      expect(result.role).toBe(0);
    });

    it('Add role of type string, Role must be of type number', async () => {
      const fakeUser = makeFakeUser({role: 'test'});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to Number failed for value "test" at path "role"');
    });
  });


  describe('password-validation', () => {
    it('Add user without password ,Password is required', async () => {
      const fakeUser = makeFakeUser({password: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `password` is required.');
    });

    it('Add password of type of object, Password must be of type string', async () => {
      const fakeUser = makeFakeUser({password: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to String failed for value "{}" at path "password"');
    });
  });


  describe('createdOn-validation', () =>{
    it('Add user without createdOn, createdOn is required', async () => {
      const fakeUser = makeFakeUser({createdOn: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `createdOn` is required.');
    });

    it('Add createdOn of type object, createdOn must be valid date', async () => {
      const fakeUser = makeFakeUser({createdOn: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to Date failed for value "{}" at path "createdOn"');
    });
  });


  describe('modifiedOn-validation', () => {
    it('Add user without  modifiedOn, modifiedOn is required', async () => {
      const fakeUser = makeFakeUser({modifiedOn: undefined});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Path `modifiedOn` is required.');
    });

    it('Add modifiedOn of type object, modifiedOn must be valid date', async () => {
      const fakeUser = makeFakeUser({modifiedOn: {}});
      const fakeUserDb = makeFakeUserDb(fakeUser);
      const user = new User(fakeUserDb);

      await expect(addNewUser(user)).rejects.toThrowError('Cast to Date failed for value "{}" at path "modifiedOn"');
    });
  });


  describe('get-user-by-id-from-db', () => {
    it('get user by id from DB, user must be saved in db', async () => {
      const _fakeUser = makeFakeUser({email: _email});
      const _fakeUserDb = makeFakeUserDb(_fakeUser);
      const _user = new User(_fakeUserDb);

      await addNewUser(_user);

      const result = await getUserById(_user._id);

      expect(result).toBeDefined();
      if (result) {
        expect(result.id).toEqual(_user._id);
        expect(result.fullName.firstName).toEqual(_user.fullName.firstName);
        expect(result.fullName.lastName).toEqual(_user.fullName.lastName);
        expect(result.email).toEqual(_user.email);
        expect(result.role).toEqual(_user.role);
      }
    });
  });
});


