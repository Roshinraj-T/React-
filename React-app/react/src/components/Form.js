import React from "react";
import { useState, useEffect } from "react";

function Form() {
  let initialValues = {
    firstname: "",
    lastname: "",
    phonenumber: "",
    birthday: "",
    email: "",
    subject: "",
  };

  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  fetch("http://localhost:8082/students")
    .then((data) => console.log("successfully fetched"))
    .catch((err) => console.log(err));

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      alert("Successfully Submit");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[a-zA-Z\s]*$/;
    if (!values.firstname) {
      errors.firstname = "Please enter your first name";
    } else if (!regex.test(values.firstname) || values.firstname.length > 100) {
      errors.firstname = "Accepts Alphabets, and Max 100 Characters";
    }
    if (!values.lastname) {
      errors.lastname = "Please enter your last name";
    } else if (!regex.test(values.lastname) || values.lastname.length > 100) {
      errors.lastname = "Accepts Alphabets, and Max 100 Characters";
    }
    if (!values.phonenumber) {
      errors.phonenumber = "Please enter your phone number";
    } else if (
      values.phonenumber.length < 10 ||
      values.phonenumber.length > 10
    ) {
      errors.phonenumber = "Enter 10 digit number";
    }
    if (!values.birthday) {
      errors.birthday = "Please Enter your birthday";
    }
    if (!values.email) {
      errors.email = "Please enter your email";
    }
    if (!values.subject) {
      errors.subject = "Please choose atleast one subject";
    }
    return errors;
  };

  return (
    <div className="form">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3>Registration Form</h3>
          <div className="form-box-1">
            <div>
              <label htmlFor="firstname">First Name</label>
              <br></br>
              <input
                type="text"
                name="firstname"
                value={formValues.firstname}
                onChange={handleChange}
              />
              <p className="error-info">{formErrors.firstname}</p>
            </div>
            <div>
              <label htmlFor="lastname">Last Name</label>
              <br></br>
              <input
                type="text"
                name="lastname"
                value={formValues.lastname}
                onChange={handleChange}
              />
              <p className="error-info">{formErrors.lastname}</p>
            </div>
            <div>
              <label htmlFor="birthday">Birthday</label>
              <br></br>
              <input
                type="date"
                name="birthday"
                value={formValues.birthday}
                onChange={handleChange}
              />
              <p className="error-info">{formErrors.birthday}</p>
            </div>
            <div>
              <label htmlFor="gender">Gender</label>
              <div className="gender">
                <div>
                  <input type="radio" name="gender" checked="checked" />
                  <label htmlFor="male">Male</label>
                </div>
                <div>
                  <input type="radio" name="gender" />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <br></br>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="error-info">{formErrors.email}</p>
            </div>
            <div>
              <label htmlFor="phone">Phone Number</label>
              <br></br>
              <input
                type="number"
                name="phonenumber"
                value={formValues.phonenumber}
                onChange={handleChange}
              />
              <p className="error-info">{formErrors.phonenumber}</p>
            </div>
          </div>
          <div className="form-box-2">
            <div>
              <label htmlFor="subject">Subject</label>
              <br></br>
              <select
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
              >
                <option>Choose Option</option>
                <option>Free</option>
                <option>Paid</option>
                <option>Pro</option>
              </select>
              <p className="error-info">{formErrors.subject}</p>
            </div>
            <div>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
