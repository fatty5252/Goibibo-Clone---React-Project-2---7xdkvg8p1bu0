import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Popularity',
  'Duration (Shortest to Longest)',
  'Departure (Earliest to Late)',
  'Departure (Late to Earliest)',
  "Arrival (Earliest to Late)",
  "Arrival (Late to Earliest)",
  "Availability (High to Low)",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DropDown() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, p:1, width: 200, borderRadius: "20px" }}>
        {/* <InputLabel id="demo-multiple-name-label">Name</InputLabel> */}
        <Select
          // labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={personName}
          onChange={handleChange}
          // input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
          defaultValue="Popularity"
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
//Delhi, National Capital Territory of Delhi
//Mumbai, Maharashtra
// https://makemytripreactappclone-cyn3ne8tn-vermanand1998.vercel.app/
// https://goibibo-clone-react-project-1-sobnc222vpo4.vercel.app/
//https://ease-my-trip-by-shekhar.vercel.app/