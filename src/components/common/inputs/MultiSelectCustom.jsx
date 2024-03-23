import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const MultiSelectCustum = React.forwardRef(
  (
    { id, label, name, onBlur, errors, option, setValue, defaultValue },
    ref
  ) => {
    const theme = useTheme();
    const [genresName, setGenresName] = useState(option);

    const handleChange = (event) => {
      const {
        target: { value },
      } = event;
      setGenresName(typeof value === "string" ? value.split(",") : value);
      setValue(
        "genre_ids",
        typeof value === "string" ? value.split(",") : value
      );
    };

    useEffect(() => {
      if (defaultValue) {
        setGenresName(defaultValue);
        setValue("genre_ids", defaultValue);
      }
    }, [defaultValue, setValue]);

    return (
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="genres">{label}</InputLabel>
        <Select
          labelId="genres"
          id={id}
          ref={ref}
          multiple
          onBlur={onBlur}
          value={genresName}
          onChange={handleChange}
          input={<OutlinedInput id="inputGenres" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          sx={{
            "&.MuiInputBase-root": {
              background: "#f5f6fa !important",
            },
          }}
          MenuProps={MenuProps}
        >
          {option.map((el) => (
            <MenuItem
              key={el.id}
              value={el.name}
              style={getStyles(el.name, genresName, theme)}
            >
              {el.name}
            </MenuItem>
          ))}
        </Select>
        {errors && errors[name] && (
          <Typography
            variant="caption"
            sx={{
              color: "red",
              marginTop: "5px !important",
              textAlign: "start",
            }}
          >
            {errors[name].message}
          </Typography>
        )}
      </FormControl>
    );
  }
);
function getStyles(name, genresName, theme) {
  return {
    fontWeight: genresName.indexOf(name) === -1 ? 500 : 700,
  };
}

const ITEM_HEIGHT = 44;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default MultiSelectCustum;
