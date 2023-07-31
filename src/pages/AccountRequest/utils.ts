type ModalType = "AMEND" | "REJECT" | "ACCEPT";

// Define the state type for the reducer
export interface ModalState {
  modalType: ModalType | null;
  extraData?: unknown
}
export const initialState: ModalState = {
  modalType: null,
};

export type ActionType =
  | { type: "OPEN_MODAL"; modalType: ModalType , extraData?:unknown}
  | { type: "CLOSE_MODAL" };

export function reducer(state: ModalState, action: ActionType):ModalState {
  switch (action.type) {
    case "OPEN_MODAL":
      return { ...state, modalType: action.modalType, extraData: action.extraData };
    case "CLOSE_MODAL":
      return { ...state, modalType: null };
    default:
      throw new Error();
  }
}



export function mapItemName(itemName:string) {
  const mapping:{[key:string]:string} = {
    IDENTIFICATION: 'National ID',
    PROOFOFADDRESS: 'Proof of Address',
    SIGNATURE: 'Signature',
    CUSTOMERPHOTO: 'Photo'
  };

  return mapping[itemName] || itemName;
}