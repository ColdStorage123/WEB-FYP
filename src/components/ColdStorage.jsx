// import React, { useEffect, useState } from 'react';
// /* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faImages } from '@fortawesome/free-solid-svg-icons'; */
// import { useNavigate } from 'react-router-dom';
// import MNav from './MNav';
// import {
//   Button,
 
//   Container,
//   TextField,
//   Typography,
//   Grid,
//   Snackbar,
// } from '@mui/material';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import Dropzone from 'react-dropzone';


// const Storage = () => {

//   const [images, setImages] = useState([]);
//   const [coldStorageName, setColdStorageName] = useState('');
//   const [description, setDescription] = useState('');
//   const [capacity, setCapacity] = useState('');
//   const [location, setLocation] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [showError, setShowError] = useState(false);
//   const [openSnackbar, setOpenSnackbar] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const navigate = useNavigate();
// /* 
//   useEffect(() => {
//     let user = localStorage.userData;
//     user = JSON.parse(user);

//     if (user) {
//       const userName = user.fullName;
//       setFullName(userName);
//       setEmail(user.email);
//     }
//   }, []); */

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('userData'));

//     // Redirect if user is not a manager
//     if (user && user.role !== 'Manager') {
//       navigate('/access-denied'); // Redirect to an access denied page or login page
//     }
//   }, [navigate]);

//   const handleDescriptionChange = (text) => {
//     // Limit the description to 150 words
//     const words = text.trim().split(/\s+/);
//     if (words.length <= 150) {
//       setDescription(text);
//     } else {
//       // Show an alert when the maximum limit is reached
//       alert('Description Limit Exceeded', 'You can only enter up to 150 words.');
//     }
//   };

//   const handlePhoneNumberChange = (text) => {
//     const trimmedText = text.trim();
//     setPhoneNumber(trimmedText);
//     setShowError(trimmedText.length > 0 && trimmedText.length !== 11);
//   };

//   /* const pickImage = async () => {
//     if (images.length >= 6) {
//       alert('Image Limit Reached', 'You can only add up to 6 images.');
//       return;
//     }

//     const fileInput = document.createElement('input');
//     fileInput.type = 'file';
//     fileInput.accept = 'image/*';
//     fileInput.onchange = handleImageSelect;
//     fileInput.click();
//   }; */

//  /*  const handleImageSelect = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       const newImages = files.map((file) => URL.createObjectURL(file));
//       setImages((prevImages) => [...prevImages, ...newImages]);
//     }
//   }; */

//   const handleDeleteImage = (index) => {
//     setImages((prevImages) => {
//       const updatedImages = [...prevImages];
//       updatedImages.splice(index, 1);
//       return updatedImages;
//     });
//   };

//   const renderImageItem = (item, index) => (
//     <div key={index} style={styles.imageContainer}>
//       <img src={item} alt={` ${index}`} style={styles.image} />
//       {index === images.length - 1 && (
//         <button onClick={() => handleDeleteImage(index)} style={styles.deleteButton}>
//           Delete
//         </button>
//       )}
//     </div>
//   );
//   const handleImageDrop = (acceptedFiles) => {
//     const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
//     setImages((prevImages) => [...prevImages, ...newImages]);
//   };
//   const renderUploadIcon = () => {
//     if (images.length < 6) {
//       return (
//         <Dropzone onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}>
//           {({ getRootProps, getInputProps }) => (
//             <div {...getRootProps()}  style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
//               <input {...getInputProps()} / >
//               <CloudUploadIcon  />
//               <Typography variant="body2" style={styles.uploadIconText}>
//                 Drag & drop some files here, or click to select files
//               </Typography>
//             </div>
//           )}
//         </Dropzone>
//       );
//     } else {
//       return null;
//     }
//   };

// /*   const renderUploadIcon = () => {
//     if (images.length < 6) {
//       return (
//         <Button
//           variant="outlined"
//           color="primary"
//           onClick={pickImage}
//           style={styles.uploadIcon}
//         >
//           <FontAwesomeIcon icon={faImages} size="2x" color="blue" />
//           <Typography variant="body2" style={styles.uploadIconText}>
//             Upload Image
//           </Typography>
//         </Button>
//       );
//     } else {
//       return null; // Render nothing if the image limit is reached
//     }
//   }; */

//   const validateAndRegister = async () => {
//     // Perform validation checks here
//     if (
//       coldStorageName.trim() === '' ||
//       description.trim() === '' ||
//       capacity.trim() === '' ||
//       location.trim() === '' ||
//       phoneNumber.trim() === ''
//     ) {
//       alert('Error', 'Please fill all fields.');
//       return;
//     }

//     // Simulate API call (replace with actual API call)
//     try {
//       const user = JSON.parse(localStorage.getItem('userData'));
//       const token = localStorage.getItem('token');
//       //const user = JSON.parse(localStorage.userData); // Assuming you store user data in localStorage after login
//       const managerid = user._id;
//       const userData = {
//       /*   fullName, // Add fullName to userData
//         email, */
//         managerid,
//         coldStorageName,
//         description,
//         capacity,
//         location,
//         images,
//         phoneNumber,
//       };

//       // Simulated API response (replace with actual API call)
//       const response = await fetch('http://192.168.204.1:3000/storage', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         const responseData = await response.json();
//         alert('Error', responseData.error);
//         if (responseData.error === 'You must be logged in first') {
//           // Redirect to the login page
//           navigate('/login');
//         }
//         return;
//       }

//       // Assuming your backend returns a success message upon successful registration
//       const data = await response.json();
//       if (data.message === 'Cold storage data stored successfully') {
//         setSnackbarMessage('Cold Storage Registration Successful!');
//         setOpenSnackbar(true);
//        /*  setFullName('');
//         setEmail(''); */
//         setColdStorageName('');
//         setDescription('');
//         setCapacity('');
//         setLocation('');
//         setPhoneNumber('');
//         setImages([]);
//       } else {
//         throw new Error('Failed to register cold storage. Please try again later.');
//       }
//     } catch (error) {
//       console.error('Error registering cold storage:', error);
//       alert('Error', 'Failed to register cold storage. Please try again later.');
//     }
//   };

//   return (
//     <div>
//       <MNav />

//       <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        
         
//             <Typography variant="h4" component="h1" style={styles.title}>
//               Cold Storage Registration
//             </Typography>
//             <form>
//             <Grid container spacing={2} >
      
//           <Grid item xs={12} sm={6}>
//             <TextField
//               type="text"
//               label="Enter Cold Storage Name"
//               variant="outlined"
//               fullWidth
//               value={coldStorageName}
//               onChange={(e) => setColdStorageName(e.target.value)}
//               style={styles.input}
//             />
//           </Grid>
          
//           <Grid item xs={12} sm={6}>
//             <TextField
//               type="text"
//               label="Enter Storage Capacity in tons"
//               variant="outlined"
//               fullWidth
//               value={capacity}
//               onChange={(e) => setCapacity(e.target.value)}
//               style={styles.input}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               type="text"
//               label="Enter Location"
//               variant="outlined"
//               fullWidth
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               style={styles.input}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               type="text"
//               label="Manager Phone Number"
//               variant="outlined"
//               fullWidth
//               value={phoneNumber}
//               onChange={(e) => handlePhoneNumberChange(e.target.value)}
//               error={showError}
//               helperText={showError ? 'Phone Number should be 11 digits' : ''}
//               style={styles.input}
//             />
//           </Grid>
//           <Grid item xs={12} >
//             <TextField
//               label="Please Describe Your Cold Storage (Max 150 words)"
//               variant="outlined"
//               fullWidth
//               multiline
//               rows={3}
//               value={description}
//               onChange={(e) => handleDescriptionChange(e.target.value)}
//               style={styles.descriptionInput}
//             />
//           </Grid>
//         </Grid>

//             <Typography variant="body1" style={styles.subtitle}>
//               Please Upload Images of your cold storage
//             </Typography>
//             <Grid item xs={12}>
//         {images.map((item, index) => (
//           <Grid item key={index}>
//             {renderImageItem(item, index)}
//           </Grid>
//         ))}
//       </Grid>
//       <Grid item xs={12}>
//         {renderUploadIcon()}
//       </Grid>
            
//             <Button
//               variant="contained"
//               color="primary"
//               fullWidth
//               onClick={validateAndRegister}
//               style={styles.addButton}
//             >
//               Register Cold Storage
//             </Button>
         
//             </form>
//       </Container>
      

//       <Snackbar
//         open={openSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenSnackbar(false)}
//         message={snackbarMessage}
//       />
      
//     </div>
//   );
// };

// const styles = {
//   container: {
//     marginTop: 20,
    

//   },
//   title: {
//     marginBottom: 20,
//     color: 'green',
//   },
//   subtitle: {
//     color: '#777',
//     fontWeight: 'bold',
//   },
//   input: {
//     marginBottom: 15,
//   },
//   descriptionInput: {
//     marginBottom: 10,
//   },
//   uploadIcon: {
//     width: 100,
//     height: 100,
//     cursor: 'pointer',
//   },
//   uploadIconText: {
//     marginTop: 5,
//   },
//   imageContainer: {
//     position: 'relative',
//     margin: 4,
//   },
//   image: {
//     width: 100,
//     height: 100,
//   },
//   deleteButton: {
//     position: 'absolute',
//     top: 4,
//     right: 4,
//     cursor: 'pointer',
//     backgroundColor: 'red',
//     color: 'white',
//     border: 'none',
//     borderRadius: '50%',
//     padding: 4,
//     fontSize: 16,
//   },
//   addButton: {
//     marginTop: 20,
//   },
// };

// export default Storage;




import React, { useEffect, useState } from 'react';
/* import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons'; */
import { useNavigate } from 'react-router-dom';
import MNav from './MNav';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  TextField,
  Typography,
  Grid,
  Snackbar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dropzone from 'react-dropzone';


const Storage = () => {

  const [images, setImages] = useState([]);
  const [coldStorageName, setColdStorageName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [location, setLocation] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showError, setShowError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [transitionId, setTransitionId] = useState('');
  const [price, setprice] = useState('');

  const navigate = useNavigate();
  const [tokenNotPresent, setTokenNotPresent] = useState(false); // New state to track token presence
  const [openLoginPrompt, setOpenLoginPrompt] = useState(false); // State to control the login prompt modal

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'
    //  setTokenNotPresent(true);
    //  navigate('/login')
  //    setOpenLoginPrompt(true); // Open the login prompt modal
    }
  }, []);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (user && user.role !== 'Manager') {
      navigate('/access-denied'); 
    }
  }, [navigate]);
  

  const handleCloseLoginPrompt = () => {
    setOpenLoginPrompt(false); 
    setTimeout(() => {
      navigate('/login')
    }, 5000);
    
    
  };
 

  const handleDescriptionChange = (text) => {
   
    const words = text.trim().split(/\s+/);
    if (words.length <= 150) {
      setDescription(text);
    } else {
      
      alert('Description Limit Exceeded', 'You can only enter up to 150 words.');
    }
  };

  const handlePhoneNumberChange = (text) => {
    const trimmedText = text.trim();
    setPhoneNumber(trimmedText);
    setShowError(trimmedText.length > 0 && trimmedText.length !== 11);
  };


  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const renderImageItem = (item, index) => (
    <div key={index} style={styles.imageContainer}>
      <img src={item} alt={` ${index}`} style={styles.image} />
      {index === images.length - 1 && (
        <button onClick={() => handleDeleteImage(index)} style={styles.deleteButton}>
          Delete
        </button>
      )}
    </div>
  );
  const handleImageDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  const renderUploadIcon = () => {
    if (images.length < 6) {
      return (
        <Dropzone onDrop={(acceptedFiles) => handleImageDrop(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()}  style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} / >
              <CloudUploadIcon  />
              <Typography variant="body2" style={styles.uploadIconText}>
                Drag & drop some files here, or click to select files
              </Typography>
            </div>
          )}
        </Dropzone>
      );
    } else {
      return null;
    }
  };

/*   const renderUploadIcon = () => {
    if (images.length < 6) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={pickImage}
          style={styles.uploadIcon}
        >
          <FontAwesomeIcon icon={faImages} size="2x" color="blue" />
          <Typography variant="body2" style={styles.uploadIconText}>
            Upload Image
          </Typography>
        </Button>
      );
    } else {
      return null; 
    }
  }; */

  const validateAndRegister = async () => {
    
    if (
      coldStorageName.trim() === '' ||
      description.trim() === '' ||
      capacity.trim() === '' ||
      location.trim() === '' ||
      phoneNumber.trim() === ''
    ) {
      alert('Error', 'Please fill all fields.');
      return;
    }

   
    try {
      const randomID = Math.floor(1000 + Math.random() * 9000);

    const user = JSON.parse(localStorage.userData);
    const managerid = user._id;
    const userData = {
      managerid,
      coldStorageName,
      description,
      capacity,
      location,
      images,
      phoneNumber,
      randomID, 
      transitionId, // Include the generated randomID in the userData object
    };


      const token = localStorage.getItem('token'); 
      const response = await fetch('http://192.168.204.1:3000/storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '', 
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const responseData = await response.json();
        alert('Error', responseData.error);
        if (responseData.error === 'You must be logged in first') {
          // Redirect to the login page
          navigate('/login');
        }
        return;
      }

      // Assuming your backend returns a success message upon successful registration
      const data = await response.json();
      if (data.message === 'Cold storage data stored successfully') {
        setSnackbarMessage('Cold Storage Registration Successful!');
        setOpenSnackbar(true);
       /*  setFullName('');
        setEmail(''); */
        setColdStorageName('');
        setDescription('');
        setprice('')
        setCapacity('');
        setLocation('');
        setPhoneNumber('');
        setImages([]);

        // Delay the navigation to /farmerhome after 5 seconds
      setTimeout(() => {
        navigate('/manager-home');
      }, 3000);
      } else {
        throw new Error('Failed to register cold storage. Please try again later.');
      }
    } catch (error) {
      console.error('Error registering cold storage:', error);
      alert('Error', 'Failed to register cold storage. Please try again later.');
    }
  };
   const handleloginclick = () => {
    handleCloseLoginPrompt();
    navigate('/login');
  };
  return (
    <div>
      <MNav />

      <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
        
         
            <Typography variant="h4" component="h1" style={styles.title}>
              Cold Storage Registration
            </Typography>
            <form>
            <Grid container spacing={2} >
      
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              label="Enter Cold Storage Name"
              variant="outlined"
              fullWidth
              value={coldStorageName}
              onChange={(e) => setColdStorageName(e.target.value)}
              style={styles.input}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              label="Enter Storage Capacity in tons"
              variant="outlined"
              fullWidth
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              style={styles.input}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              label="Enter Location"
              variant="outlined"
              fullWidth
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={styles.input}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              label="Manager Phone Number"
              variant="outlined"
              fullWidth
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              error={showError}
              helperText={showError ? 'Phone Number should be 11 digits' : ''}
              style={styles.input}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
  <p>Pay Rs. 1000 on 0300 1234567 and enter transition Id</p>
  <TextField
    type="text"
    label="Enter Transition ID"
    variant="outlined"
    fullWidth
    value={transitionId}
    onChange={(e) => setTransitionId(e.target.value)}
    style={styles.input}
  />
</Grid>
<Grid item xs={12} sm={6}>
  <p>Pay Rs. 1000 on 0300 1234567 and enter transition Id</p>
  <TextField
    type="text"
    label="Price per ton"
    variant="outlined"
    fullWidth
    value={price}
    onChange={(e) => setprice(e.target.value)}
    style={styles.input}
  />
</Grid>


          <Grid item xs={12} >
            <TextField
              label="Please Describe Your Cold Storage (Max 150 words)"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              style={styles.descriptionInput}
            />
          </Grid>
        </Grid>


            <Typography variant="body1" style={styles.subtitle}>
              Please Upload Images of your cold storage
            </Typography>
            <Grid item xs={12}>
        {images.map((item, index) => (
          <Grid item key={index}>
            {renderImageItem(item, index)}
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        {renderUploadIcon()}
      </Grid>
            
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={validateAndRegister}
              style={styles.addButton}
            >
              Register Cold Storage
            </Button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
     
            </form>
      </Container>

         
      

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
      <Dialog open={openLoginPrompt} onClose={handleCloseLoginPrompt}>
        <DialogTitle>You Must Login First</DialogTitle>
        <DialogContent>
          <p>Please login to proceed.</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseLoginPrompt()} color="primary">
            Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const styles = {
  container: {
    marginTop: 20,
    

  },
  title: {
    marginBottom: 20,
    color: 'green',
  },
  subtitle: {
    color: '#777',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 15,
  },
  descriptionInput: {
    marginBottom: 10,
  },
  uploadIcon: {
    width: 100,
    height: 100,
    cursor: 'pointer',
  },
  uploadIconText: {
    marginTop: 5,
  },
  imageContainer: {
    position: 'relative',
    margin: 4,
  },
  image: {
    width: 100,
    height: 100,
  },
  deleteButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    cursor: 'pointer',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    padding: 4,
    fontSize: 16,
  },
  addButton: {
    marginTop: 20,
  },
};

export default Storage;