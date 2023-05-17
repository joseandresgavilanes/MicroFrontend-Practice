import React, { useEffect, useState, ChangeEvent } from 'react';
import { RemoteTaskProps } from '@/utils/remote-task-mf';


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

  const AskProduct = (props: RemoteTaskProps) => {
    const [haveProducts, setHaveProducts] = useState<boolean | undefined>(undefined);
  
    const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
      setHaveProducts(event.target.value === 'yes');
    };
    
    const onBeforeFinishingHandler = ({ comment } :any) => {
      props.onFinish({
        metadataList: [
            {
                key: "haveProducts",
                value: haveProducts
            }
        ],
        comment
      });
    };
  
    useEffect(() => {
      if (props.emitter) {
        props.emitter.subscribe('before-finishing', onBeforeFinishingHandler);
      }
      return () => {
        props?.emitter?.unsubscribe('before-finishing', onBeforeFinishingHandler);
      };

    }, [props.emitter, haveProducts]);
  
    return (
      <div style={styles.formContainer}>
        <div style={styles.subheading}>Selecciona si existen productos:</div>
        <label style={styles.label}>
          <input
            type="radio"
            name="haveProducts"
            value="yes"
            checked={haveProducts === true}
            onChange={handleOptionChange}
          />
          Sí
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            name="haveProducts"
            value="no"
            checked={haveProducts === false}
            onChange={handleOptionChange}
          />
          No
        </label>
        <div style={styles.successMessage}>
          {haveProducts && "Existen productos para entregar"}
        </div>
      </div>
    );
  };

export default AskProduct;