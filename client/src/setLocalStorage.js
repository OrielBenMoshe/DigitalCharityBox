import { Storage } from "@capacitor/storage";
/**
 * Create pattern of user in localStorage or
 * update exist user by getting the key and its value
 * and return the user object.
 */
const setLocalStorage = async (key = null, value = null) => {
  try {
    const res = await Storage.get({ key: "user" });
    console.log("res:", res);
    const user = res.value
      ? JSON.parse(res.value)
      : {
          firebaseUID: "",
          costumerId: "",
          personalInfo: {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            email: "",
            city: "",
            address: "",
          },
          reminders: [
            {
              label: "בשחרית",
              active: true,
              time: "8:20",
            },
            {
              label: "במנחה",
              active: true,
              time: "16:00",
            },
            {
              label: "בזמן אחר:",
              active: false,
              time: "10:00",
            },
          ],
          display: {
            coins: [
              { value: 1, active: true },
              { value: 2, active: true },
              { value: 5, active: true },
              { value: 10, active: true },
              { value: 18, active: false, manual: true },
            ],
          },
          totalAmount: 0,
          actions: [],
        };

    // switch (key) {
    //   case "firebaseUID":
    //   case "costumerId":
    //   case "totalAmount":
    //     user[key] = value;
    //     break;
    //   case "reminders":
    //     user.reminders = [...user.reminders, value];
    //     break;
    //   case "actions":
    //     user.actions = [...user.actions, value];
    //     break;
    //   case "coins":
    //     user.display.coins = [...user.display.coins, value];
    //     break;
    //   case "personalInfo":
    //     user[key] = { ...user[key], value };
    //     break;
    //   default:
    //     break;
    // }

    await Storage.set({ key: "user", value: JSON.stringify(user) });

    return user;
  } catch (error) {
    console.log("error:", error);
  }
};

export default setLocalStorage;
