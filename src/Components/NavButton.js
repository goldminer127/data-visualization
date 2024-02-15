import { Button } from "@mui/material";

const NavButton = ({label}) => {
    return (
        <Button variant="outlined">
            {label}
        </Button>
    );
}

export default NavButton;