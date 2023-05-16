import { RemoteTaskProps } from '@ka-react/micro-frontend';
import React, { useEffect, useState } from 'react'


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


const SelectCategory = (props: RemoteTaskProps) => {
    const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const onBeforeFinishingHandler = () => {
    console.log('Validate form');
    console.log('Guarda la informacion')
    props.emitter.publish('finish', {
      metadata: { category: selectedCategory }
    });
  }

  useEffect(() => {
    if (props.emitter) {
      props?.emitter?.subscribe('before-finishing', onBeforeFinishingHandler);
    }
    return () => {
        props?.emitter?.unsubscribe('before-finishing', onBeforeFinishingHandler);
    }
  }, [props.emitter]);


  return (
    <div style={styles.formContainer}>
      <h2 style={styles.heading}>Formulario</h2>
      <div style={styles.subheading}>Seleccione la categoria:</div>
      <label style={styles.label}>
        Categoria:
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={styles.input}
        >
          <option value="">Seleccione...</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Vestimenta">Vestimenta</option>
          <option value="Medicamento">Medicamento</option>
        </select>
      </label>
      {selectedCategory && (
        <div style={styles.successMessage}>
          Se ha seleccionado la categoria: {selectedCategory}
        </div>
      )}
    </div>
  );
}

export default SelectCategory