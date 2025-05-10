import { useState } from "react";
import styles from "./addProd.module.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProductsCategories } from "../../fetchData/getData";
import { AddProductsInput } from "../../Components/Ui/inputs/Inputs";
import { postNewProduct } from "../../fetchData/postData";

export default function AddProd() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    condition: "new",
    category: "",
  });
  const [images, setImages] = useState([]);
  const [featuredIndex, setFeaturedIndex] = useState(null);

  const categQueries = useQuery({
    queryKey: ["categories"],
    queryFn: getProductsCategories,
  });

  const mutation = useMutation({
    mutationFn: postNewProduct,
    onSuccess: (data) => {
      alert("Product created!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        condition: "new",
        category: "",
      });
    },
    onError: (error) => {
      alert(error.message || "Upload failed");
    },
    onSettled: (data, error) => {
      console.log("📦 Settled - either success or error:");
      console.log("Data:", data);
      console.log("Error:", error);
    },
  });

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImages = (e) => {
    const newFiles = Array.from(e.target.files).slice(0, 6);
    const updatedFiles = [...images, ...newFiles].slice(0, 6); // max 6 total
    setImages(updatedFiles);

    if (featuredIndex === null && updatedFiles.length > 0) {
      setFeaturedIndex(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ formData, images, featuredIndex });
  };

  return (
    <form className={`bottomNav ${styles.form}`} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Add New Product</h2>

      <AddProductsInput
        label="Name"
        type="text"
        placeholder="Product Name"
        name="name"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <AddProductsInput
        label="Description"
        type="text"
        placeholder="Product Description"
        name="description"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <AddProductsInput
        label="Price"
        type="number"
        placeholder="Price"
        name="price"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <AddProductsInput
        label="Stock"
        type="number"
        placeholder="Stock"
        name="stock"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <label className="addProductsLabel">Condition:</label>
      <select
        name="condition"
        value={formData.condition}
        onChange={(e) => handleChange(e, "condition")}
        className={styles.select}
      >
        <option value="new">New</option>
        <option value="used">Used</option>
        <option value="refurbished">Refurbished</option>
      </select>

      <label className="addProductsLabel">Category:</label>
      <select
        name="category"
        value={formData.category}
        onChange={(e) => handleChange(e, "category")}
        className={styles.select}
      >
        <option value="">Select Category</option>
        {categQueries.isLoading ? (
          <option disabled>Loading...</option>
        ) : categQueries.isError ? (
          <option disabled>Error loading categories</option>
        ) : (
          categQueries.data?.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))
        )}
      </select>

      <label className={`${styles.label} ${styles.fileUpload}`}>
        Choose Images
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImages}
          className={styles.hiddenInput}
        />
      </label>

      <div className={styles.previewContainer}>
        {images.map((img, index) => (
          <div key={index} className={styles.imagePreview}>
            <img
              src={URL.createObjectURL(img)}
              alt="preview"
              className={styles.preview}
              onClick={() => setFeaturedIndex(index)}
              style={{
                border: featuredIndex === index ? "2px solid green" : "none",
              }}
            />
            <p>{featuredIndex === index ? "Featured" : ""}</p>
          </div>
        ))}
      </div>

      <button
        disabled={mutation.isPending}
        type="submit"
        className={styles.submitBtn}
        style={{
          opacity: mutation.isPending ? 0.5 : 1, // Lighter when disabled
          cursor: mutation.isPending ? "not-allowed" : "pointer", // No pointer when disabled
        }}
      >
        Add Product
      </button>

      <span>{mutation.isPending ? "Creating..." : ""}</span>
    </form>
  );
}

// const refreshMutation = useMutation({
//   mutationFn: postRefreshToken,
//   onError: (err) => {
//     // console.log("error in use mutation REFRESH TOKEN");

//     console.log(err);
//   },
//   onSuccess: () => {
//     console.log("refreshed");
//   },
//   onSettled: () => {
//     // console.log("refresh attempt finished");
//   },
// });
// useEffect(() => {
//   refreshMutation.mutate();
// }, []);
