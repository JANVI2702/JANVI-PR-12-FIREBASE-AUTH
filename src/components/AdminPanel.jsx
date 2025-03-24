import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";

function AdminPanel() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");

    const handleAddProduct = async (e) => {
        e.preventDefault();

        if (!productName || !price) {
            alert("Please fill in all the details");
            return;
        }

        try {
            await addDoc(collection(db, "products"), {
                name: productName,
                price: parseFloat(price),
                createdAt: new Date(),
            });

            alert("Product added Successulffy");
            setProductName("");
            setPrice("");
        } catch (error) {
            alert("Failed to add product");
        }
    };

    return (
        <div className="admin-panel">
            <h2>Admin Panel : Add Products</h2>

            <form onSubmit={handleAddProduct}>
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <button type="submit">Add product</button>
            </form>
        
        </div>
    );
}

export default AdminPanel