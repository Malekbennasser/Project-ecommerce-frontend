import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams();
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoyez la nouvelle valeur du mot de passe au serveur
      const response = await axios.post("/api/password/reset", {
        password,
        token,
      });
      // Gérez la réponse du serveur ici

      console.log(response.data.message);
      swal("success", response.data.message, "success");
      navigate("/login");
    } catch (error) {
      // Gérez les erreurs ici
      console.log(error.response.data.validation_errors.password);
      setError(error.response.data.validation_errors.password);
      //   swal(error.response.data.validation_errors, "error");
    }

    // Réinitialisez le champ du mot de passe après l'envoi du formulaire
    setPassword("");
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
                        Réinitialiser le mot de passe
                      </h5>
                    </div>
                    <div className="card-body">
                      <form onSubmit={handleFormSubmit}>
                        <div className="form-floating mb-3">
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Nouveau mot de passe"
                            value={password}
                            onChange={handlePasswordChange}
                          />

                          <label>Nouveau mot de passe</label>
                        </div>
                        <span className="text-danger">{error}</span>
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                          <button
                            type="submit"
                            className="btn btn-dark rounded-0"
                          >
                            Envoyer
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

export default ResetPassword;
