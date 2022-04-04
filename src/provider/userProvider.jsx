import React, { useReducer, useContext } from "react";

const UserContext = React.createContext(null);

const userReducer = (state, action) => {
  switch (action.type) {
    case "save-user":
      return {
        ...state,
        user: action.payload,
        token: action.payload.token,
      };
    case "save-seller-data":
      return {
        ...state,
        sellerData: action.payload,
      };
    case "update-isSeller":
      return {
        ...state,
        isSeller: action.payload,
      };
    case "save-seller":
      return {
        ...state,
        saveSeller: action.payload,
      };
  }
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, {
    user: {},
    sellerData: {},
    token: "",
    isSeller: false,
    saveSeller: false,
  });

  async function updateUserData(val) {
    localStorage.setItem("authToken", val.token);
    localStorage.setItem("user", JSON.stringify(val));
    dispatch({ type: "save-user", payload: val });
  }
  async function updateSellerData(val) {
    localStorage.setItem("sellerData", JSON.stringify(val));
    dispatch({ type: "save-seller-data", payload: val });
  }

  async function updateisSeller(val) {
    localStorage.setItem("isSeller", val);
    dispatch({ type: "update-isSeller", payload: val });
  }
  async function saveSeller(val) {
    localStorage.setItem("saveSeller", val);
    dispatch({ type: "save-seller", payload: val });
  }

  async function recoverData() {
    if (localStorage.getItem("user")) {
      const user = await JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "save-user", payload: user });
    }
  }
  async function recoverSellerData() {
    if (localStorage.getItem("sellerData")) {
      const selller = await JSON.parse(localStorage.getItem("sellerData"));
      dispatch({ type: "save-seller-data", payload: selller });
    }
  }

  async function recoverisSeller() {
    if (localStorage.getItem("isSeller")) {
      const isSeller = await localStorage.getItem("isSeller");
      dispatch({ type: "update-isSeller", payload: isSeller });
    }
  }

  const actions = {
    updateUserData,
    recoverData,
    updateisSeller,
    recoverisSeller,
    saveSeller,
    updateSellerData,
    recoverSellerData
  };

  return (
    <UserContext.Provider value={{ state, USER: actions }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
