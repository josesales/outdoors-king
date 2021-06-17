import { PayloadAction } from "@reduxjs/toolkit";

interface Dispatch<T> {
    (action: PayloadAction<T>): void
}

export default Dispatch;