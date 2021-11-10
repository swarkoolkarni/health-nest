import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@material-ui/core";
import { Row } from "reactstrap";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/EditRounded";
import HelpIcon from "@material-ui/icons/HelpRounded";
import PollIcon from "@material-ui/icons/PollRounded";
import EventIcon from "@material-ui/icons/EventRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const names = ["News", "Diet", "Lifestyle", "Symptoms", "Treatment"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Modal({ isPostClicked, handleClick, getAllPosts }) {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => {
    handleClick();
    setPersonName([]);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDesc = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeMultiple = (event) => {
    setPersonName(event.target.value);
    setError(false);
  };

  const handleDelete = (chipToDelete) => () => {
    setPersonName((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleSubmit = () => {
    let allOk = true;

    if (personName.length === 0) {
      allOk = false;
      setError(true);
    }

    if (allOk) {
      finalSubmit();
    }
  };

  const finalSubmit = () => {
    let getInitialData = JSON.parse(localStorage.getItem("posts"));
    if (getInitialData === null) {
      getInitialData = [];
    }
    const formData = {
      id: Math.random(),
      author: "Patient",
      topics: personName,
      description: description,
    };
    getInitialData.push(formData);
    window.localStorage.setItem("posts", JSON.stringify(getInitialData));
    handleClose();
    getAllPosts();
    setPersonName([]);
  };

  return (
    <div>
      <Dialog
        open={isPostClicked}
        onClose={handleClose}
        maxWidth="md"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab label="Post" icon={<EditIcon />} aria-label="post" />
            <Tab
              label="Ask Question"
              icon={<HelpIcon />}
              aria-label="question"
            />
            <Tab label="Poll" icon={<PollIcon />} aria-label="poll" />
            <Tab label="Event" icon={<EventIcon />} aria-label="event" />
          </Tabs>
          <DialogContent>
            <div style={{ padding: 20 }}>
              <form className={classes.root} noValidate autoComplete="off">
                <Row>
                  <InputLabel id="demo-mutiple-chip-label">
                    Description
                  </InputLabel>
                  <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={handleChangeDesc}
                  />
                </Row>
                <Row>
                  <FormControl required>
                    <InputLabel id="demo-mutiple-chip-label">Topics</InputLabel>
                    <Select
                      labelId="demo-mutiple-chip-label"
                      id="demo-mutiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChangeMultiple}
                      input={<Input id="select-multiple-chip" />}
                      renderValue={(selected) => (
                        <div className={classes.chips}>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              className={classes.chip}
                              onDelete={handleDelete}
                            />
                          ))}
                        </div>
                      )}
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
                    {error && (
                      <small>{"Please select atleast one topic"}</small>
                    )}
                  </FormControl>
                </Row>
              </form>
            </div>
          </DialogContent>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
