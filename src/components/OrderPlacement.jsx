import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography, Container, Grid, TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventIcon from "@mui/icons-material/Event";
import { subDays } from "date-fns";
import FNav from "./FNav";
import { Snackbar, SnackbarContent } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import InputAdornment from "@mui/material/InputAdornment";

const OrderPlacement = () => {
  const location = useLocation();
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const { managerid } = useParams();

  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [endCalendarOpen, setEndCalendarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    cropQuantity: "",
    selectedStartDate: null,
    storageDays: "",
    userRequirements: "",
    selectedEndDate: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    if (user && user.role !== "Farmer") {
      navigate("/access-denied");
    }
  }, [navigate]);
  const handleInputChange = (e) => {
    console.log(imageFile);
    const { name, value } = e.target;
    let startDate = formData.selectedStartDate;
    let endDate = formData.selectedEndDate;
    let storageDays = formData.storageDays;

    if (name === "selectedStartDate") {
      startDate = new Date(value);

      // Check if end date is before start date
      if (endDate && startDate > endDate) {
        setSnackbarOpen(true);
        setSnackbarMessage("Start date cannot be after end date.");
        return;
      }
    } else if (name === "selectedEndDate") {
      endDate = new Date(value);

      // Check if start date is after end date
      if (startDate && endDate < startDate) {
        setSnackbarOpen(true);
        setSnackbarMessage("End date cannot be before start date.");
        return;
      }
    } else if (name === "storageDays") {
      storageDays = value;

      // Handle the case when storageDays is empty or null
      if (!storageDays) {
        startDate = null;
        endDate = null;
      } else if (startDate) {
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + parseInt(storageDays));
      } else if (endDate) {
        startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - parseInt(storageDays));
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      selectedStartDate: startDate,
      selectedEndDate: endDate,
      storageDays: storageDays,
    }));
  };
  const handleCalendarOutsideClick = () => {
    setCalendarOpen(false);
    setEndCalendarOpen(false);
  };

  useEffect(() => {
    document.body.addEventListener("click", handleCalendarOutsideClick);

    return () => {
      document.body.removeEventListener("click", handleCalendarOutsideClick);
    };
  }, []);

  const handleDateChange = (date, field) => {
    const newDate = new Date(date);
    let startDate = formData.selectedStartDate;
    let endDate = formData.selectedEndDate;
    let storageDays = formData.storageDays;

    // Set time to end of the day
    newDate.setHours(23, 59, 59, 999);

    if (field === "selectedStartDate") {
      startDate = newDate;

      // Check if end date is before start date
      if (endDate && newDate > endDate) {
        setSnackbarOpen(true);
        setSnackbarMessage("Start date cannot be after end date.");
        return;
      }
    } else if (field === "selectedEndDate") {
      endDate = newDate;

      // Check if start date is after end date
      if (startDate && newDate < startDate) {
        setSnackbarOpen(true);
        setSnackbarMessage("End date cannot be before start date.");
        return;
      }
    }

    if (startDate && endDate) {
      storageDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    } else if (startDate && storageDays) {
      endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + parseInt(storageDays));
    } else if (endDate && storageDays) {
      startDate = new Date(endDate);
      startDate.setDate(endDate.getDate() - parseInt(storageDays));
    }

    setFormData((prevState) => ({
      ...prevState,
      selectedStartDate: startDate,
      selectedEndDate: endDate,
      storageDays: storageDays.toString(),
    }));

    setCalendarOpen(false);
    setEndCalendarOpen(false);
  };

  const handleCloseHelpDialog = () => {
    setHelpDialogOpen(false);
  };

  //Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();

    // const formDataObject = {
    //   images: imageFile,
    //   cropQuantity: formData.cropQuantity,
    //   storageDays: formData.storageDays,
    //   userRequirements: formData.userRequirements,
    //   farmerId: userData._id,
    //   managerid: managerid,
    //   farmerEmail: userData.email,
    //   selectedStartDate: new Date(formData.selectedStartDate).toISOString(),
    //   selectedEndDate: new Date(formData.selectedEndDate).toISOString(),
    // };

    try {
      // newFormData.append("images", imageFile);
      // newFormData.append("cropQuantity", formData.cropQuantity);
      // newFormData.append("storageDays", formData.storageDays);
      // newFormData.append("userRequirements", formData.userRequirements);
      // newFormData.append("farmerId", userData._id);
      // newFormData.append("managerid", managerid);
      // newFormData.append("farmerEmail", userData.email);
      // newFormData.append(
      //   "selectedStartDate",
      //   new Date(formData.selectedStartDate).toISOString()
      // );
      // newFormData.append(
      //   "selectedEndDate",
      //   new Date(formData.selectedEndDate).toISOString()
      // );

      // Append other form data fields
      newFormData.append("images", imageFile);
      newFormData.append("cropQuantity", formData.cropQuantity);
      newFormData.append("storageDays", formData.storageDays);
      newFormData.append("userRequirements", formData.userRequirements);
      newFormData.append("farmerId", userData._id);
      newFormData.append("managerid", managerid);
      newFormData.append("farmerEmail", userData.email);
      newFormData.append(
        "selectedStartDate",
        new Date(formData.selectedStartDate).toISOString()
      );
      newFormData.append(
        "selectedEndDate",
        new Date(formData.selectedEndDate).toISOString()
      );

      // console.log(newFormData.farmerId);

      const token = localStorage.getItem("token");
      const headers = {
        Authorization: token ? `Bearer ${token}` : "",
      };

      const response = await axios.post(
        "http://localhost:3000/order",
        newFormData,
        {
          headers,
        }
      );

      console.log("Order placed successfully:", response.data);
      setSnackbarOpen(true);
      setSnackbarMessage("Order Submitted Successfully");

      // Delay the navigation to /farmerhome after 5 seconds
      setTimeout(() => {
        navigate("/farmerhome");
      }, 3000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <FNav />
      <Container>
        <Container
          maxWidth="md"
          style={{ textAlign: "center", marginTop: "50px" }}
        >
          <Typography
            variant="h4"
            component="div"
            fontWeight="fontWeightBold"
            gutterBottom
          >
            Place Your Order
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="ManagerId"
                  name="managerid"
                  variant="outlined"
                  value={managerid}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="farmerEmail"
                  variant="outlined"
                  value={userData.email}
                  disabled
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Crop Quantity (In tons)"
                  name="cropQuantity"
                  variant="outlined"
                  value={formData.cropQuantity}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Select Start Date"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <EventIcon
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click event from reaching the body
                          setCalendarOpen(true);
                        }}
                      />
                    ),
                  }}
                  value={
                    formData.selectedStartDate
                      ? formData.selectedStartDate.toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                />
                {calendarOpen && (
                  <DatePicker
                    selected={formData.selectedStartDate}
                    onChange={(date) =>
                      handleDateChange(date, "selectedStartDate")
                    }
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    inline
                    minDate={new Date()} // Minimum allowed date is today
                    onClickOutside={() => setCalendarOpen(false)} // Close calendar on outside click
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Storage Days"
                  name="storageDays"
                  variant="outlined"
                  value={formData.storageDays}
                  onChange={handleInputChange}
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Select End Date"
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <EventIcon
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents the click event from reaching the body
                          setEndCalendarOpen(true);
                        }}
                      />
                    ),
                  }}
                  value={
                    formData.selectedEndDate
                      ? formData.selectedEndDate.toISOString().split("T")[0]
                      : ""
                  }
                  readOnly
                />
                {endCalendarOpen && (
                  <DatePicker
                    selected={formData.selectedEndDate}
                    onChange={(date) =>
                      handleDateChange(date, "selectedEndDate")
                    }
                    dateFormat="yyyy-MM-dd"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    inline
                    minDate={
                      formData.selectedStartDate
                        ? subDays(new Date(), 1)
                        : new Date()
                    } // Minimum allowed date is the day before selected start date or today if start date is not selected
                    onClickOutside={() => setEndCalendarOpen(false)} // Close calendar on outside click
                  />
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Requirements"
                  name="userRequirements"
                  variant="outlined"
                  multiline
                  rows={4}
                  value={formData.userRequirements}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        style={{ position: "absolute", top: 20, right: 0 }}
                      >
                        <IconButton onClick={() => setHelpDialogOpen(true)}>
                          <HelpIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  style={{ display: "none" }}
                  id="imageInput"
                />
                <label htmlFor="imageInput">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                </label>
                {imageFile && (
                  <span style={{ marginLeft: "10px" }}>{imageFile.name}</span>
                )}
              </Grid>

              <Dialog open={helpDialogOpen} onClose={handleCloseHelpDialog}>
                <DialogTitle>Temperature Information</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Store fruits at 40°F (4°C) <br />
                    Store vegetables at 32°F (0°C)
                  </DialogContentText>
                </DialogContent>
              </Dialog>

              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Place Order
                </Button>
                <br></br>
                <br></br>
                <br></br>
              </Grid>
            </Grid>
          </form>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent message={snackbarMessage} />
          </Snackbar>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => setSnackbarOpen(false)}
          >
            <SnackbarContent
              style={{
                backgroundColor: "red",
                fontSize: "20px",
                padding: "16px",
              }}
              message={snackbarMessage}
            />
          </Snackbar>
        </Container>
      </Container>
    </div>
  );
};

export default OrderPlacement;
