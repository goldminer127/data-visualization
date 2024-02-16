import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Fragment, useState } from "react";

const VarDropdownMenu = ({variables, displayText, onChange}) =>
{
    const [currentAttr, changeAttr] = useState('');
    const createMenuItems = () => {
        let items = []
        variables.forEach((item, index) => items.push(
                <MenuItem value={item[0]} key={index}>
                    {item[0]}
                </MenuItem>
        ))
        return items;
    }

    const handleChange = (event) => {
        changeAttr(event.target.value);
        onChange(event.target.value);
    };

    return(
        <FormControl>
            <InputLabel id='varMenuLabel'>{displayText}</InputLabel>
            <Select labelId="varMenuLabel" label={displayText} value={currentAttr} sx={{width: '10rem'}} onChange={handleChange}>
                {createMenuItems()}
            </Select>
        </FormControl>
    );
}

export default VarDropdownMenu;