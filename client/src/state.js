import { proxy } from "valtio";
import { devtools } from "valtio/utils";

const state = proxy({ user: {} });
const unsub = devtools(state, { name: "state name", enabled: true });

export { state };


// const getSavedData = async (key) => {
  //       const ret = await Storage.get({ key: key });
  //       const user = JSON.parse(ret.value);
  //       console.log(user);
  // }
  // getSavedData('user');
  
  //   reminders: [
  //     {
  //       label: "בשחרית",
  //       active: true,
  //       time: "8:20",
  //     },
  //     {
  //       label: "במנחה",
  //       active: true,
  //       time: "16:00",
  //     },
  //     {
  //       label: "בזמן אחר:",
  //       active: false,
  //       time: "10:00",
  //     },
  //   ],
  //   display: {
  //     coins: [
  //       { value: 1, active: true },
  //       { value: 2, active: true },
  //       { value: 5, active: true },
  //       { value: 10, active: true },
  //       { value: 18, active: false, manual: true },
  //     ],
  //   },
  //   totalAmount: 16,
  //   actions: [],
  // };

// const savePersonalInfo = async (values) => {
//   await Storage.set({ key: "user", value: JSON.stringify(values) })
//   console.log('JSON.stringify(values):', JSON.stringify(values));
// }
// savePersonalInfo(user);
