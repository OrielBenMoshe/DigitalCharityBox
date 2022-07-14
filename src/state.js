import { proxy } from "valtio";
import { devtools } from 'valtio/utils';

// import { Storage } from '@capacitor/storage';


// const getSavedData = async (key) => {
//       const ret = await Storage.get({ key: key });
//       const user = JSON.parse(ret.value);
//       console.log(user);
// }
// getSavedData('user');


const user = /* getSavedData() ? getSavedData() : */  {
  personalInfo: {
    firstName: "אוריאל",
    lastName: "בן משה",
    phoneNumber: "0526053495",
    password: "12346",
    email: "oriel.bm.work@gmail.com",
    city: "כוכב השחר",
    address: "נוף הירדן 7",
  },
  craditCardInfo: {
    token: "",
    last4digits: "",
  },
  reminders: {
    morning: {
      active: true,
      time: "8:25",
    },
    afternoon: {
      active: true,
      time: "16:00",
    },
  },
  display: {
    coins: [
      { value: 1, active: true },
      { value: 2, active: true },
      { value: 5, active: true },
      { value: 10, active: true },
      { value: 18, active: false, manual: true },
    ],
  },
  totalAmount: 16,
  actions: [],
};

// const savePersonalInfo = async (values) => {
//   await Storage.set({ key: "user", value: JSON.stringify(values) })
//   console.log('JSON.stringify(values):', JSON.stringify(values));
// }
// savePersonalInfo(user);


const state = proxy({ user });
const unsub = devtools(state, { name: 'state name', enabled: true })

export { state };
