import { useEffect, useState } from "react";

function App() {
    const [produits, setProduits] = useState([]);

    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");

    const chargerProduits = () => {
        fetch("http://127.0.0.1:8000/api/produits/")
            .then((response) => response.json())
            .then((data) => {
                setProduits(data);
            });
    };

    useEffect(() => {
        chargerProduits();
    }, []);

    const ajouterProduit = (event) => {
        event.preventDefault();

        fetch("http://127.0.0.1:8000/api/produits/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                nom: nom,
                description: description,
                prix: prix,
                disponible: true,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

                setNom("");
                setDescription("");
                setPrix("");

                chargerProduits();
            });
    };

    return (
        <div>
            <h1>Gestion des produits</h1>

            <form onSubmit={ajouterProduit}>
                <input
                    type="text"
                    placeholder="Nom"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Prix"
                    value={prix}
                    onChange={(e) => setPrix(e.target.value)}
                />

                <button type="submit">
                    Ajouter
                </button>
            </form>

            <hr />

            <h2>Produits</h2>

            {produits.map((produit) => (
                <div key={produit.id}>
                    <h3>{produit.nom}</h3>
                    <p>{produit.description}</p>
                    <p>{produit.prix} FCFA</p>
                </div>
            ))}
        </div>
    );
}

export default App;