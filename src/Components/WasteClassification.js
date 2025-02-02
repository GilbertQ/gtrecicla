import React, { useState } from "react";

const WasteClassification = () => {
  // Estado para almacenar la palabra/expresión ingresada
  const [input, setInput] = useState("");
  // Estado para almacenar la clasificación final
  const [classification, setClassification] = useState("");

  // Función para clasificar la palabra/expresión
  const classifyWaste = (text) => {
    // Convertir el texto a minúsculas para facilitar la comparación
    const lowerText = text.toLowerCase();

    // Clasificación
    if (lowerText.includes("orgánico")) {
      setClassification("Orgánico");
    } else if (
      lowerText.includes("papel") ||
      lowerText.includes("cartón") ||
      lowerText.includes("vidrio") ||
      lowerText.includes("plástico") ||
      lowerText.includes("metal") ||
      lowerText.includes("multicapa")
    ) {
      setClassification("Reciclable");
    } else if (lowerText.trim() !== "") {
      setClassification("No Reciclable");
    } else {
      setClassification("");
    }
  };

  // Manejar cambios en el input
  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    classifyWaste(text);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Clasificación de Residuos</h1>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Escribe una palabra o expresión"
        style={{ padding: "10px", width: "300px", fontSize: "16px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <h2>Clasificación:</h2>
        <p>{classification || "No clasificado"}</p>
      </div>
    </div>
  );
};

export default WasteClassification;