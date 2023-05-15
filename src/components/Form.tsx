import { useState } from "react";

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

export default function Form({
  header = "default",
  sendFormMF = false,
  childState,
  setParentState,
}) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");


  const onSubmit = (e) => {
    setNameError("");
    setLastNameError("");
    setEmailError("");
    e.preventDefault();
  
    if (sendFormMF) {
      // Validar el campo de nombre
      if (name.trim() === "") {
        setNameError("El campo de nombre es requerido.");
      }
  
      // Validar el campo de apellido
      if (lastName.trim() === "") {
        setLastNameError("El campo de apellido es requerido.");
      }
  
      // Validar el campo de correo electrónico
      if (email.trim() === "") {
        setEmailError("El campo de correo electrónico es requerido.");
      }
  
      // Si no hay errores, enviar el formulario
      if (!nameError && !lastNameError && !emailError) {
        // Realizar el envío del formulario
        // ...
        console.log("Formulario enviado");
  
        // Limpiar el formulario
        setName("");
        setLastName("");
        setEmail("");
      }else{
        console.log("Error")
      }
    }
  };

  console.log(email, lastName, email);
  return (
    <form onSubmit={onSubmit} style={styles.formContainer}>
      <div>
        <h1>{childState}</h1>
        <h2 style={styles.heading}>{header}</h2>
        <p style={styles.subheading}>CAMBIANDO INFORMACION</p>
      </div>

      <div>
        <div>
          <h2 style={styles.heading}>Personal Information</h2>
          <p style={styles.subheading}>
            Use a permanent address where you can receive mail.
          </p>
        </div>

        <div>
          <div>
            <label htmlFor="first-name" style={styles.label}>
              First name
            </label>
            <div>
              {" "}
              <input
                type="text"
                name="firstName"
                id="first-name"
                autoComplete="given-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
              />
              {nameError && <p style={styles.error}>{nameError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="last-name" style={styles.label}>
              Last name
            </label>
            <div>
              <input
                type="text"
                name="lastName"
                id="last-name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={styles.input}
              />
              {lastNameError && <p style={styles.error}>{lastNameError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" style={styles.label}>
              Email address
            </label>
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />

              {emailError && <p style={styles.error}>{emailError}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" style={styles.label}>
              Test Father MF
            </label>
            <div>
              <input
                id="test"
                name="text"
                type="text"
                autoComplete="text"
                value={childState}
                onChange={(e) => setParentState(e.target.value)}
                style={styles.input}
              />

              {emailError && <p style={styles.error}>{emailError}</p>}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button type="button" style={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" style={styles.saveButton}>
          Save
        </button>
      </div>

      {sendFormMF && (
        <p style={styles.successMessage}>
          El formulario se ha enviado correctamente.
        </p>
      )}
    </form>
  );
}
