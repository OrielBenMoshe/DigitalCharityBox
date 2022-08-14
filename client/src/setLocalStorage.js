import { Storage } from "@capacitor/storage";
/**
 * Set the LocalStorage with "val", according the "key" and
 * Return the "value" of LocalStorage according the "key".
 */
const setLocalStorage = async (key, val) => {
  console.log("val:",val);
  if (key && val) {
    if (val === "remove") {
      await Storage.remove( { key } );
    } else
      await Storage.set({ key: key, value: JSON.stringify(val) });
  }  
  if (key) {
    const { value } = await Storage.get({ key: key });
    return value ? JSON.parse(value) : 'empty';
  }
};

export default setLocalStorage;
