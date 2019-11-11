
import ChildResolver from '../Resolver/Child.resolver';

import { removeDuplicates } from '../lib/Util';

export default class UserResolver {

  constructor(data) {
    this.data = data;
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

  getPartners() {
    return this.data.filter((item) => {
      return item['Partner Name'] !== undefined;
    });
  }

  getEnrichedUsers() {

    const childResolvers = new ChildResolver(this.data);
    const children = childResolvers.getChildren();

    const allUsers = this.getUsers();
    const users = removeDuplicates(allUsers); // GET FILTERED USERS

    const partners = this.getPartners();

    const results = users.map((user) => {

      const fullName = `${user.firstName} ${user.lastName}`;
      const getPartner = partners.filter((obj) => {
        return obj['Farmer Name'] === fullName;
      });
      const cleanedPartnerList = removeDuplicates(getPartner);
      const partner = cleanedPartnerList.length > 0 ? cleanedPartnerList[0]['Partner Name'] : undefined;
      // console.log('cleanedPartnerList: ', cleanedPartnerList);

      const getChildren = children.filter((obj) => {
        return obj.father === fullName;
      });
      const cleanedChildrenList = removeDuplicates(getChildren);

      const formattedList = cleanedChildrenList.map((child) => {
        return {
          fullName: child.fullName,
          age: child.age ? child.age : null,
        };
      });
      // delete cleanedChildrenList.father;

      return {
        firstName : user.firstName,
        lastName : user.lastName,
        partnerFullName: partner ? partner : null,
        children: formattedList ? formattedList : null,
      };
    });

    /*const filteredResults = results.filter((user) => user.partner !== undefined);

    const cleanedResults = removeDuplicates(results);

    console.log('results: ', results);

    console.log('filteredResults: ', filteredResults);

    console.log('cleanedResults: ', cleanedResults);

    console.log('removeDuplicates: ', removeDuplicates(filteredResults));*/
/*
    const users2 = cleanedResults.map((user) => {
      /!*const name = user['Farmer Name'];
      const nameList = name.split(' ');*!/
      const partner = user['Partner Name'];
      console.log('partner: ', partner);

      const name = `${user.firstName} ${user.lastName}`;

      const getChildren = children.filter((obj) => {
        return obj.father === name;
      });

      const getPartner = this.data.filter((obj) => {
        return obj.father === name;
      });

      const cleanedChildrenList = removeDuplicates(getChildren);

      return {
        firstName : user.firstName,
        lastName : user.lastName,
        partnerFullName: partner,
        children: cleanedChildrenList ? cleanedChildrenList : null,
      };
    });*/
    return results.filter((user) => user.firstName !== undefined);
  }

}
