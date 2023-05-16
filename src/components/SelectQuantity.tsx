import React, { useState } from 'react';


const styles = {
    formContainer: {
      maxWidth: "400px",
      margin: "0 auto",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    subheading: {
      fontSize: "14px",
      marginBottom: "20px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      marginBottom: "10px",
    },
    error: {
      color: "red",
      marginBottom: "10px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
    cancelButton: {
      fontSize: "14px",
      fontWeight: "bold",
      marginRight: "10px",
    },
    saveButton: {
      fontSize: "14px",
      fontWeight: "bold",
      backgroundColor: "indigo",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
    },
    successMessage: {
      color: "green",
      marginTop: "10px",
    },
  };


const SelectQuantity = () => {
  const [selectedQuantity, setSelectedQuantity] = useState('');

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Formulario</h2>
      <div style={styles.subheading}>Seleccione la cantidad:</div>
      <label style={styles.label}>
        Cantidad:
        <select
          value={selectedQuantity}
          onChange={handleQuantityChange}
          style={styles.input}
        >
          <option value="">Seleccione...</option>
          <option value="10">10</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </label>
      {selectedQuantity && (
        <div style={styles.successMessage}>
          Se ha seleccionado la cantidad: {selectedQuantity}
        </div>
      )}
    </div>
  );
};

export default SelectQuantity;