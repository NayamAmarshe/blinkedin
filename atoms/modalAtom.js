import { atom } from "recoil";

// similar to const[modal, setModal] = useState(false)
export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "dropIn",
});
