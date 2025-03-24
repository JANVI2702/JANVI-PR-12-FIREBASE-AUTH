import { useState } from "react";
import { db } from "../firebase"; // getDatabase
import { addDoc, collection, getDocs } from "firebase/firestore";

function AddProduct() {
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");

    const handleAddProducts = async (e) => {
        e.preventDefault();

        if (!productName || !price) {
            alert("Please enter all the details");
            return;
        }

        try {
            await addDoc(collection(db, "products"), {
                name: productName,
                price: parseFloat(price),
                createdAt: new Date(),
            });

            alert("product added successfully!");
            setProductName("");
            setPrice("");
        } catch (error) {
            console.log(error);
            alert("Failed  to add product");
        }
    };
    return (
        <div className="add-product">
            <h1>Add Product</h1>
            <form onSubmit={handleAddProducts}>
                <input
                    type="text"
                    placeholder="Enter product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />

                <input
                    type="number"
                    placeholder="Enter product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
}

export default AddProduct;

