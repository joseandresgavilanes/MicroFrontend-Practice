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

const SelectCategory = (props: RemoteTaskProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const toast = useRef(null);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const categoryCatalogue = [
    { label: "Seleccione...", value: "" },
    { label: "Tecnología", value: "tecnologia" },
    { label: "Vestimenta", value: "vestimenta" },
    { label: "Medicamento", value: "medicamento" },
  ];
  const onBeforeFinishingHandler = ({ comment }: any) => {
    if (selectedCategory === "") {
      notificationOptions(
        "error",
        "Finalización de tarea",
        "Debe seleccionar una categoría",
        3000,
        toast
      );
      return;
    }
    props.onFinish({
      metadataList: [
        {
          key: "category",
          value: selectedCategory,
        },
      ],
      comment,
    });
    notificationOptions(
      "successs",
      "Finalización de tarea",
      "Categoría seleccionada",
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
  }, [props.emitter, selectedCategory]);

  return (
    <div style={styles.formContainer}>
      <Toast ref={toast} />
      <h2 style={styles.heading}>Seleccione la categoría:</h2>
      <label style={styles.label}>
        Categoría: *
        <select
          required
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e)}
          style={styles.input}
        >
          {categoryCatalogue.map((category, index) => {
            return (
              <option key={index + "-" + category.value} value={category.value}>
                {category.label}
              </option>
            );
          })}
          {/* <option value="">Seleccione...</option>
          <option value="tecnologia">Tecnología</option>
          <option value="vestimenta">Vestimenta</option>
          <option value="medicamento">Medicamento</option> */}
        </select>
      </label>
      {selectedCategory !== "" ? (
        <div style={styles.successMessage}>
          Se ha seleccionado la categoría:{" "}
          {categoryCatalogue.find((c) => c.value === selectedCategory)?.label}
        </div>
      ) : (
        <div style={styles.error}>Debe seleccionar una categoría</div>
      )}
    </div>
  );
};

export default SelectCategory;
