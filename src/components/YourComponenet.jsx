import React, { useState } from 'react';

const temperatureData = {
  businessName: {
    fruits: 'Store fruits at 40°F (4°C)',
    vegetables: 'Store vegetables at 32°F (0°C)',
  },
  // Add more data for other businessName values if needed
};

const YourComponent = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [userRequirements, setUserRequirements] = useState('');

  const toggleHelpView = (itemName) => {
    setSelectedItem(itemName);
    setDialogVisible(!isDialogVisible);
  };

  const closeModal = () => {
    toggleHelpView('');
  };

  return (
    <div>
      <h2 style={styles.subtitle}>Enter Your Requirements</h2>
      <div style={styles.inputContainer}>
        <textarea
          style={styles.input}
          placeholder="Your Requirements"
          value={userRequirements}
          onChange={(e) => setUserRequirements(e.target.value)}
        />
        <button style={styles.helpButton} onClick={() => toggleHelpView('businessName')}>
          Help
        </button>
      </div>

      {isDialogVisible && (
        <div style={styles.modalContainer}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Temperature Information</h2>
            <p>{temperatureData[selectedItem]?.fruits}</p>
            <p>{temperatureData[selectedItem]?.vegetables}</p>
            <button style={styles.closeButton} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    // Your styles for the input
  },
  helpButton: {
    // Your styles for the help button
  },
  modalContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    background: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
};

export default YourComponent;
