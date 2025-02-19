// Fonction pour afficher les messages sous les champs
function afficherMessage(id, message, isSuccess) {
    let element = document.getElementById(id);
    element.innerText = message;
    element.style.color = isSuccess ? "green" : "red";
}

// Fonction de validation du formulaire (onClick et submit)
function validerFormulaire(event) {
    if (event) event.preventDefault(); // Empêche l'envoi du formulaire si erreur

    let isValid = true;

    // Récupération des valeurs des champs
    let title = document.getElementById("title").value.trim();
    let destination = document.getElementById("destination").value.trim();
    let departureDate = document.getElementById("departureDate").value;
    let returnDate = document.getElementById("returnDate").value;
    let price = document.getElementById("price").value.trim();

    // Vérifications
    if (title.length < 3) {
        afficherMessage("titleError", "Le titre doit contenir au moins 3 caractères.", false);
        isValid = false;
    } else {
        afficherMessage("titleError", "Correct", true);
    }

    if (!/^[A-Za-z\s]{3,}$/.test(destination)) {
        afficherMessage("destinationError", "Destination invalide.", false);
        isValid = false;
    } else {
        afficherMessage("destinationError", "Correct", true);
    }

    if (new Date(returnDate) <= new Date(departureDate)) {
        afficherMessage("returnDateError", "La date de retour doit être ultérieure.", false);
        isValid = false;
    } else {
        afficherMessage("returnDateError", "Correct", true);
    }

    if (isNaN(price) || price <= 0) {
        afficherMessage("priceError", "Le prix doit être un nombre positif.", false);
        isValid = false;
    } else {
        afficherMessage("priceError", "Correct", true);
    }

    if (!isValid) {
        alert("Veuillez corriger les erreurs avant de soumettre.");
        return false;
    }

    alert("Formulaire validé !");
    return true;
}

// Validation en temps réel (onKeyup)
function verifierChamp(id, regex, messageErreur) {
    document.getElementById(id).addEventListener("keyup", function() {
        let value = this.value.trim();
        let errorElement = document.getElementById(id + "Error");

        if (!regex.test(value)) {
            errorElement.innerText = messageErreur;
            errorElement.style.color = "red";
        } else {
            errorElement.innerText = "Correct";
            errorElement.style.color = "green";
        }
    });
}

// Ajouter les événements onClick, submit et keyup
document.addEventListener("DOMContentLoaded", function() {
    // Attach submit event to the form
    document.getElementById("offerForm").addEventListener("submit", function(event) {
        validerFormulaire(event);
    });

    // Attach click event to the submit button (if any)
    document.getElementById("addOfferBtn")?.addEventListener("click", function(event) {
        validerFormulaire(event);
    });

    // Real-time validation (onKeyup) for the input fields
    verifierChamp("title", /.{3,}/, "Le titre doit contenir au moins 3 caractères.");
    verifierChamp("destination", /^[A-Za-z\s]{3,}$/, "Destination invalide.");
    verifierChamp("price", /^\d+(\.\d{1,2})?$/, "Prix invalide.");

    // Real-time date validation for departureDate and returnDate
    document.getElementById("departureDate").addEventListener("keyup", function() {
        let departureDate = this.value;
        let returnDate = document.getElementById("returnDate").value;
        let errorElement = document.getElementById("returnDateError");

        if (new Date(returnDate) <= new Date(departureDate)) {
            errorElement.innerText = "La date de retour doit être ultérieure.";
            errorElement.style.color = "red";
        } else {
            errorElement.innerText = "Correct";
            errorElement.style.color = "green";
        }
    });
});
