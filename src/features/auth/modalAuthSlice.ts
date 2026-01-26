import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

interface modalAuthState {
    isLoginModalOpen: boolean;
    isRegisterModalOpen: boolean;
}

const initialState: modalAuthState = {
    isLoginModalOpen: false,
    isRegisterModalOpen: false,
};

const modalAuthSlice = createSlice({
    name: "modalAuth",
    initialState,
    reducers: {
        openLoginModal(state) {
            state.isLoginModalOpen = true;
            state.isRegisterModalOpen = false;
        },
        closeLoginModal(state) {
            state.isLoginModalOpen = false;
        },
        openRegisterModal(state) {
            state.isRegisterModalOpen = true;
            state.isLoginModalOpen = false;
        },
        closeRegisterModal(state) {
            state.isRegisterModalOpen = false;
        }
    }
});

export const { openLoginModal, closeLoginModal, openRegisterModal, closeRegisterModal } = modalAuthSlice.actions;
export default modalAuthSlice.reducer;

export const selectModalAuth = (state: RootState) => state.modalAuth;