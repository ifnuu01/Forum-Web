import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThreadRequest } from "../../services/threads/type";
import { createThread } from "../threads/threadsSlice";
import type { RootState } from '../../store/store';

interface CreateThreadState {
    isOpen: boolean;
    form: ThreadRequest;
    isSubmitting: boolean;
    error: string | null;
}

const initialState: CreateThreadState = {
    isOpen: false,
    form: {
        title: "",
        body: "",
        category: "",
    },
    isSubmitting: false,
    error: null,
}

const createThreadSlice = createSlice({
    name: "createThread",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
            state.error = null;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.form = { title: "", body: "", category: "" };
            state.error = null;
        },
        updateForm: (state, action: PayloadAction<Partial<ThreadRequest>> ) => {
            state.form = { ...state.form, ...action.payload };
        },
        setSubmitting: (state, action: PayloadAction<boolean>) => {
            state.isSubmitting = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(createThread.pending, (state) => {
            state.isSubmitting = true;
            state.error = null;
        })
        .addCase(createThread.fulfilled, (state) => {
            state.isSubmitting = false;
            state.isOpen = false;
            state.form = { title: "", body: "", category: "" };
        })
        .addCase(createThread.rejected, (state, action) => {
            state.isSubmitting = false;
            state.error = action.payload as string || "Failed to create thread";
        });
    },
})

export const { openModal, closeModal, updateForm, setSubmitting, setError } = createThreadSlice.actions;
export default createThreadSlice.reducer;

export const selectCreateThread = (state: RootState) => state.createThread;

