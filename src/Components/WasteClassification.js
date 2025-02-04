import React, { useState } from "react";
import { FaLeaf, FaRecycle, FaTrash } from "react-icons/fa";

const WasteClassification = () => {
  const [input, setInput] = useState("");
  const [classification, setClassification] = useState("");
  const [bClassif, setbClassif] = useState("");
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const organicKeywords = ["cáscara", "fruta", "verdura", "resto de comida", "resto de pan", "rama", "hoja", "flor", "recibo de pago"];
  const recyclableKeywords = ["botella de vidrio", "caja de cereal", "lata de aluminio", "producto enlatado", "cuaderno", "botella plástica", "papel periódico", "bote de yogurt", "bolsa de chuchería", "bote de detergente", "shampoo"];
  const nonRecyclableKeywords = ["jeringa", "papel higiénico sucio", "pañal desechable", "hilo dental", "electrónico", "celular", "audífono", "tablet", "batería", "toalla húmeda", "toalla sanitaria", "gasa", "venda", "curita", "hisopo"];

  const allKeywords = [...organicKeywords, ...recyclableKeywords, ...nonRecyclableKeywords];

  const classifyWaste = (text) => {
    const lowerText = text.toLowerCase();
    
    const containsKeyword = (text, keywords) => keywords.some((keyword) => text.includes(keyword));
    
    if (containsKeyword(lowerText, organicKeywords)) {
      setClassification("Orgánico");
    } else if (containsKeyword(lowerText, recyclableKeywords)) {
      setClassification("Reciclable");
    } else if (containsKeyword(lowerText, nonRecyclableKeywords)) {
      setClassification("No Reciclable");
    } else if (lowerText.trim() !== "") {
      setClassification("No Reciclable");
    } else {
      setClassification("");
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInput(text);
    classifyWaste(text);

    if (text.length > 0) {
      setSuggestions(allKeywords.filter(keyword => keyword.startsWith(text.toLowerCase())));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setSuggestions([]);
    classifyWaste(suggestion);
  };

  const handleButtonClick = (type) => {
    if (type === "Orgánico") {
      setMessage("Orgánicos: Elementos que puedas reutilizar cáscara de frutas, aserrín y restos de café.");
      setbClassif("Orgánico");
    } else if (type === "Reciclable") {
      setMessage("Reciclables: Residuos que puedas reutilizar plástico, vidrio, papel/cartón, metal o multicapa.");
      setbClassif("Reciclable");
    } else if (type === "No Reciclable") {
      setMessage("No Reciclables: Desechos como Duroport y Desechos sanitarios.");
      setbClassif("No Reciclable");  
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      <h1>Clasificación de Residuos</h1>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe una palabra o expresión"
          style={{ padding: "10px", width: "300px", fontSize: "16px" }}
        />
        {suggestions.length > 0 && (
         <ul style={{
          position: "absolute",
          background: "white",
          border: "1px solid #ccc",
          listStyle: "none",
          padding: "5px",
          margin: 0,
          left: "0", // Align with the input
          top: "100%", // Position below the input field
          width: "300px", // Match input width
          zIndex: 1000 // Ensure it appears above other elements
        }}>
        {suggestions.map((suggestion, index) => (
              <li 
                key={index} 
                onClick={() => handleSuggestionClick(suggestion)}
                style={{ padding: "5px", cursor: "pointer" }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div style={{ marginTop: "20px" }}>
        <h2>Clasificación:</h2>
        <p>{classification || "No clasificado"}</p>
      </div>

      <div style={{ marginTop: "30px", display: "flex", justifyContent: "center", gap: "20px" }}>
        <button 
          onClick={() => handleButtonClick("Orgánico")}
          style={{ padding: "15px 30px", fontSize: "18px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
          <FaLeaf /> Orgánico
        </button>
        <button 
          onClick={() => handleButtonClick("Reciclable")}
          style={{ padding: "15px 30px", fontSize: "18px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
          <FaRecycle /> Reciclable
        </button>
        <button 
          onClick={() => handleButtonClick("No Reciclable")}
          style={{ padding: "15px 30px", fontSize: "18px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#f44336", color: "white", border: "none", borderRadius: "10px", cursor: "pointer" }}>
          <FaTrash /> No Reciclable
        </button>
      </div>

      {message && (
        <div style={{ marginTop: "20px", fontSize: "24px", fontWeight: "bold", color: bClassif === "Orgánico" ? "#4CAF50" : bClassif === "Reciclable" ? "#2196F3" : "#f44336" }}>
          {message}
        </div>
      )}
    </div>
  );
};

export default WasteClassification;