import * as React from "react";

// MUI Imports
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";


export default function HobbiesComponent({ formik }) {
  const handleDeleteHobby = (index) => {
    const newHobbies = [...formik.values.hobbies];
    newHobbies.splice(index, 1);
    formik.setFieldValue("hobbies", newHobbies);
  };

  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-filled"
        options={Hobbies}
        value={formik.values.hobbies}
        onChange={(event, newValue) => {
          formik.setFieldValue("hobbies", newValue || []);
        }}
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              variant="outlined"
              label={option}
              onDelete={() => handleDeleteHobby(index)}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Hobbies"
            placeholder="Hobbies"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                formik.setFieldValue(
                  "hobbies",
                  [...formik.values.hobbies, event.target.value],
                  true
                );
                event.target.value = "";
              }
            }}
          />
        )}
      />
    </Stack>
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const Hobbies = ["Reading", "Films"];
