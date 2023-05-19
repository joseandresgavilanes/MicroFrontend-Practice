import React, { useEffect, useState, ChangeEvent } from "react";
import { RemoteTaskProps } from '@ka-react/micro-frontend';

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

const SelectQuantity = (props: RemoteTaskProps) => {
    const [selectedQuantity, setSelectedQuantity] = useState("");
  
    const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedQuantity(event.target.value);
    };
  
    const onBeforeFinishingHandler = ({ comment }: any) => {
      if (selectedQuantity !== "") {
        props.onFinish({
          metadataList: [
            {
              key: "numProducts",
              value: Number(selectedQuantity),
            },
          ],
          comment,
        });
      }
    };
  
    useEffect(() => {
      if (props.emitter) {
        console.log("suscribe")
        props.emitter?.subscribe("before-finishing", onBeforeFinishingHandler);
      }
      return () => {
        console.log("desuscribirse")
        props.emitter?.unsubscribe("before-finishing", onBeforeFinishingHandler);
      };
    }, [props.emitter, selectedQuantity]);
  
    return (
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Seleccione la cantidad:</h2>
        <label style={styles.label}>
          Cantidad:
          <select
            value={selectedQuantity}
            onChange={handleQuantityChange}
            style={styles.input}
          >
            <option value="">Seleccione...</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
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
