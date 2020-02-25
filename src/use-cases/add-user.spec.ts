/* eslint-disable max-len */
import mongoose from 'mongoose';
import {addUser} from './';
import makeFakeUser from '../../mock/fakeUser';
import User from '../data-access/user';

describe('use-case-add-user', () => {
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

      const result = await addUser(fakeUser);

      expect(result.id).toEqual(fakeUser._id);
      expect(result.fullName.firstName).toEqual(fakeUser.firstName);
      expect(result.fullName.lastName).toEqual(fakeUser.lastName);
      expect(result.email).toEqual(fakeUser.email);
      expect(result.role).toEqual(fakeUser.role);
      expect(result.createdOn).toEqual(fakeUser.createdOn);
      expect(result.modifiedOn).toEqual(fakeUser.modifiedOn);
    });
  });
});
