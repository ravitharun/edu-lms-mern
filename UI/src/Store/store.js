

// Store/store.js
import { configureStore } from "@reduxjs/toolkit";
import SectionSlicer from "./Section";
export default configureStore({
    reducer: {
        section: SectionSlicer,
    },
}); 