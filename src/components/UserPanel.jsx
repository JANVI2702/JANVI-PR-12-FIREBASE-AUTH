import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function UserPanel() {
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products")); 
                const productList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setProducts(productList);
            } catch (error) {
                alert(error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="user-panel">
            <h2>Available products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}- ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserPanel;