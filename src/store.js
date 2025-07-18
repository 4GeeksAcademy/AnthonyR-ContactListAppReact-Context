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
    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter(
          (contact) => contact.id !== action.payload.id
        ),
      };
    case "edit_contact":
      return {
        ...store,
        contacts: store.contacts.map((contact) => {
          if (contact.id === action.payload.id) {
            return {
              ...contact,
              ...action.payload,
            };
          }
          return contact;
        }),
      };
    default:
      throw Error("Unknown action.");
  }
}
