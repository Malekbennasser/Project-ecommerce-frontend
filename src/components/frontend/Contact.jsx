import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/contact", formData) // Assurez-vous que l'URL de la requête correspond à la route API que vous avez définie dans votre backend Laravel.
      .then((response) => {
        console.log("Données envoyées avec succès", response);

        swal(response.data.message, "success");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
        // Réinitialisez le formulaire ou effectuez d'autres actions après la soumission réussie.
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données", error);
        if (error.response && error.response.data) {
          // Afficher les erreurs renvoyées par le serveur
          setErrors(error.response.data.errors);
        }
      });
  };

  return (
    <div
      className="container py-5
    "
    >
      <h4 className="text-center">Contactez-nous</h4>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            className="form-control rounded-0"
            name="name"
            value={formData.nom}
            onChange={handleInputChange}
            type="text"
            placeholder="Name"
          />
          <span className="text-danger">{errors.name}</span>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            className="form-control rounded-0"
            id="emailAddress"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <span className="text-danger">{errors.email}</span>
        </div>

        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            className="form-control h-10em rounded-0"
            id="message"
            name="message"
            type="text"
            placeholder="Message"
            // style={height:10rem}
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
          <span className="text-danger">{errors.message}</span>
        </div>
        <div className="d-grid">
          <button className="btn btn-dark rounded-0 btn-lg" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
