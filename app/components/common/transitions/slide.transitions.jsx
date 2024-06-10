import {forwardRef} from "react";
import {Slide} from "@mui/material";

export const SlideUpTransition = forwardRef(function Transition({children, ...props}, ref) {
    return <Slide direction="up" ref={ref} {...props}>
        {children}
    </Slide>;
});