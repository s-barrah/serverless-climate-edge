
import UserModel from '../Model/User.model';

import ChildResolver from '../Resolver/Child.resolver';

import { removeDuplicates } from '../lib/Util';
import {TABLES} from "../Config/Configuration";
import DatabaseService from "../Service/Database.service";

export default class UserResolver {

  constructor(di) {
    this.di = di;

    this.table = TABLES.USER_TABLE;
  }

  getUsers() {
    return this.data.map((item) => {
      const nameList = item['Farmer Name'].split(' ');
      return {
        firstName : nameList[0],
        lastName : `${nameList[1]} ${nameList[2]}`
      }
    });
  }

  getAllPartners() {
    return this.data.filter((item) => {
      return item['Partner Name'] !== undefined;
    });
  }

  getUsersChildren(children, name) {
    if (children) {
      const getUsersChildren = children.filter((obj) => {
        return obj.father === name;
      });

      return getUsersChildren.map((child) => {
        return {
          fullName: child.fullName,
          age: child.age ? child.age : null,
        };
      });

    }
    return null;
  }

  getUsersPartner(data, name) {
    if (data) {
      const usersPartner = data.filter((obj) => {
        return obj['Farmer Name'] === name;
      });
      const filtered = removeDuplicates(usersPartner);
      return filtered.length > 0 ? filtered[0]['Partner Name'] : null;
    }
    return null;
  }

  getFullName(user) {
    if (user) {
      this.user = user;
      return `${this.user.firstName} ${this.user.lastName}`
    }
  }

  async getRawData() {

    const childResolvers = new ChildResolver(this.di);
    const children = await childResolvers.getAll();

    const allUsers = this.getUsers();
    const users = removeDuplicates(allUsers); // GET FILTERED USERS

    const partners = this.getAllPartners();

    const formattedUsers = users.map((user) => {
      const fullName = this.getFullName(user);
      const partner = this.getUsersPartner(partners, fullName);

      const usersChildren = this.getUsersChildren(children, fullName);

      return {
        firstName : user.firstName,
        lastName : user.lastName,
        partnerFullName: partner !== null ? partner : null,
        children: usersChildren ? usersChildren : null,
      };
    });

    return formattedUsers.filter((user) => user.firstName !== undefined || user.lastName !== undefined);
  }


  async getAll() {
    const databaseService = new DatabaseService(this.di);
    return await databaseService.getEntries(this.table);
  }

  importFromFile(data) {
    this.data = data;
  }

}
