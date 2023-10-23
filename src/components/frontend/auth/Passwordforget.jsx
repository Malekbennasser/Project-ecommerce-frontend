import axios from "axios";
import { useState } from "react";
import swal from "sweetalert";

function Passwordforget() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/sendemailreset", { email });
      // Gérer la réponse du serveur ici
      console.log(response.data);
      swal("success", response.data.message, "success");
    } catch (error) {
      // Gérer les erreurs ici
      console.error(error.response.data);
      console.log(error.response.data.validation_errors.email);
      setError(error.response.data.validation_errors.email);
    }

    // Réinitialiser le champ email après l'envoi du formulaire
    setEmail("");
  };

  return (
    <div>
      <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
          <main>
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5">
                  <div className="card shadow-lg border-0 rounded-lg mt-5">
                    <div className="card-header">
                      <h5 className="text-center font-weight-light my-4">
                        Veuillez saisir une adresse mail
                      </h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            name="email"
                            className="form-control"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleEmailChange}
                          />
                          <label>Email address</label>
                        </div>
                        <span className="text-danger">{error}</span>

                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0"
                          >
                            Enoyer
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Passwordforget;
