export const initialStore = () => {
  return {
    message: null,
    contacts: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contact":
      return {
        ...store,
        contacts: action.payload,
      };
    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };
    default:
      throw Error("Unknown action.");
  }
}
