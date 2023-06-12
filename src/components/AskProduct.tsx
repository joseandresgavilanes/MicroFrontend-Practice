import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import { RemoteTaskProps } from "@ka-react/micro-frontend";
import { notificationOptions } from "@/utils";
import { Toast } from "primereact/toast";

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
  const [haveProducts, setHaveProducts] = useState<boolean | undefined>(
    undefined
  );
  const toast = useRef(null);

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setHaveProducts(event.target.value === "yes");
  };

  const onBeforeFinishingHandler = ({ comment }: any) => {
    if (haveProducts === undefined) {
      notificationOptions(
        "error",
        "Finalización de tarea",
        "Indica si existen, o no, productos",
        3000,
        toast
      );
      return;
    }
    props.onFinish({
      metadataList: [
        {
          key: "haveProducts",
          value: haveProducts,
        },
      ],
      comment,
    });
    notificationOptions(
      "successs",
      "Finalización de tarea",
      "Indicación de existencia de producto, realizada",
      3000,
      toast
    );
  };

  useEffect(() => {
    if (props.emitter) {
      props.emitter.subscribe("before-finishing", onBeforeFinishingHandler);
    }
    return () => {
      props?.emitter?.unsubscribe("before-finishing", onBeforeFinishingHandler);
    };
  }, [props.emitter, haveProducts]);

  return (
    <div style={styles.formContainer}>
      <Toast ref={toast} />
      <div style={styles.subheading}>Selecciona si existen productos: *</div>
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
      {haveProducts !== undefined &&
      (haveProducts || haveProducts === false) ? (
        <div style={styles.successMessage}>Existen productos para entregar</div>
      ) : (
        <div style={styles.error}>Debe indicar si existen, o no, productos</div>
      )}
    </div>
  );
};

export default AskProduct;
