import React, { useState } from "react";
import "./App.css";

function App() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    age: "",
    skills: [],
    address: "",
    state: ""
  });

  // Calculate Age
  const calculateAge = (dob) => {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();

    if (
      today.getMonth() < birth.getMonth() ||
      (today.getMonth() === birth.getMonth() &&
        today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  };

  // Handle Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Block future date
    if (name === "dob" && new Date(value) > new Date()) {
      alert("Future date not allowed");
      return;
    }

    if (name === "dob") {
      setFormData({
        ...formData,
        dob: value,
        age: calculateAge(value)
      });
    }
    else if (type === "checkbox") {
      let updated = [...formData.skills];
      if (checked) updated.push(value);
      else updated = updated.filter(s => s !== value);
      setFormData({ ...formData, skills: updated });
    }
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
`First Name: ${formData.firstName}
Last Name: ${formData.lastName}
Gender: ${formData.gender}
DOB: ${formData.dob}
Age: ${formData.age}
Skills: ${formData.skills.join(", ")}
Address: ${formData.address}
State: ${formData.state}`
    );
  };

  // Reset
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      gender: "",
      dob: "",
      age: "",
      skills: [],
      address: "",
      state: ""
    });
  };

  return (
    <div className="container">

      <h2>Student Registration Form</h2>

      <form onSubmit={handleSubmit}>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <label>Gender</label>
        <input type="radio" name="gender" value="Male" onChange={handleChange}/> Male
        <input type="radio" name="gender" value="Female" onChange={handleChange}/> Female
        <input type="radio" name="gender" value="Other" onChange={handleChange}/> Other

        <label>DOB</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]}
        />

        <label>Age</label>
        <input type="text" value={formData.age} readOnly />

        <label>Skills</label>
        <input type="checkbox" value="HTML" onChange={handleChange}/> HTML
        <input type="checkbox" value="CSS" onChange={handleChange}/> CSS
        <input type="checkbox" value="JavaScript" onChange={handleChange}/> JavaScript
        <input type="checkbox" value="React" onChange={handleChange}/> React

        <label>Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>

        <label>State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
        >
          <option value="">Select</option>
          <option value="Punjab">Punjab</option>
          <option value="Haryana">Haryana</option>
          <option value="Delhi">Delhi</option>
        </select>

        <br /><br />
        <button type="submit">Submit</button>
        <button type="button" onClick={handleReset}>Reset</button>

      </form>

    </div>
  );
}

export default App;