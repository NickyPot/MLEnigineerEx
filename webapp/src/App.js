
import "./App.css";
import { useState } from "react";

function App() {

  // vars used for the input fields to the model and the message displayed to the user
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [gearbox, setGearbox] = useState("");
  const [mileage, setMileage] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    // set the var body (used in the http request) with the json input fields
    const body = {
      "brand": brand,
      "year": parseInt(year),
      "fuel": fuel,
      "gearbox": gearbox,
      "mileage (kms)": parseInt(mileage)
    }

    // try sending the http request
    try {
      let res = await fetch("http://127.0.0.1:5000/predict", {
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': "application/json;charset=utf-8"
        },
        method: "POST",
        cache: 'no-cache',
        body: JSON.stringify(body)
      });
      let resJson = await res.json();
      // if everything went ok, then clear the input fields and show response to user by setting the message field
      if (res.status === 200) {
        setBrand("");
        setYear("");
        setFuel("");
        setGearbox("");
        setMileage("");
        setMessage(resJson);
        // if not, show the response from the server with the issue
      } else {
        setMessage(resJson);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // below are the input fields for the webapp 
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={brand}
          placeholder="Brand"
          onChange={(e) => setBrand(e.target.value)}
        />
        <input
          type="text"
          value={year}
          placeholder="Year"
          onChange={(e) => setYear(e.target.value)}
        />
        <select 
          value={fuel} 
          onChange={(e) => setFuel(e.target.value)}>
          <option disabled={true} value="">
            --Fuel Type--
          </option>
          <option value="Diésel">Diésel</option>
          <option value="Eléctrico">Eléctrico</option>
          <option value="GLP">GLP</option>
          <option value="Gasolina">Gasolina</option>
          <option value="Híbrido">Híbrido</option>
        </select>
        <select
          value={gearbox}
          onChange={(e) => setGearbox(e.target.value)}>
          <option disabled={true} value="">
            --Gearbox Type--
          </option>
          <option value="Automatica">Automatica</option>
          <option value="Manual">Manual</option>
        </select>
        <input
          type="text"
          value={mileage}
          placeholder="Mileage (kms)"
          onChange={(e) => setMileage(e.target.value)}
        />

        <button type="submit">Send</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;