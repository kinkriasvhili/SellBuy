import { useEffect, useState, useContext } from "react";
import styles from "./addProd.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { AddProductsInput } from "../../Components/Ui/inputs/Inputs";
import { postNewProduct } from "../../fetchData/postData";
import { AuthContext } from "../../Context/AuthContext";
import { ProductContext } from "../../Context/ProductContext";

export default function AddProd() {
  const queryClient = useQueryClient();
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
  const { isAuthenticated } = useContext(AuthContext);
  const { categQueries } = useContext(ProductContext);
  const [disabled, setDisabled] = useState(true);
  function validateForm(formData, images) {
    const hasEmptyField = Object.entries(formData).some(([key, value]) => {
      if (key === "condition") return false;
      return value.trim() === "";
    });

    const hasNoImages = images.length === 0;
    return hasEmptyField || hasNoImages;
  }
  useEffect(() => {
    const isDisabled = validateForm(formData, images);
    setDisabled(isDisabled);
  }, [formData, images]);

  const mutation = useMutation({
    mutationFn: postNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      alert("Product created!");
      setFormData({
        name: "",
        description: "",
        price: "",
        stock: "",
        condition: "new",
        category: "",
      });
      setImages([]);
    },
    onError: (error) => {
      alert(error.message || "Upload failed");
    },
  });

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImages = (e) => {
    const newFiles = Array.from(e.target.files).slice(0, 5);

    let duplicateFound = false;

    const filteredNewFiles = newFiles.filter((file) => {
      const isDuplicate = images.some(
        (existing) =>
          existing.name === file.name && existing.size === file.size,
      );
      if (isDuplicate) {
        duplicateFound = true;
      }
      return !isDuplicate;
    });

    if (duplicateFound) {
      alert("You cannot add the same image twice.");
    }

    const updatedFiles = [...images, ...filteredNewFiles].slice(0, 5);
    setImages(updatedFiles);

    if (featuredIndex === null && updatedFiles.length > 0) {
      setFeaturedIndex(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ formData, images, featuredIndex });
  };

  useEffect(() => {
    if (mutation.isPending) {
      setDisabled(true);
    }
  }, [mutation, isAuthenticated]);
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
      <label className="addProductsLabel">Images:</label>
      <label className={`${styles.label} ${styles.fileUpload}`}>
        Choose Images (Maximum 5)
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
            <span
              onClick={() => {
                const newImages = [...images];
                newImages.splice(index, 1);
                setImages(newImages);
              }}
              className={styles.delete}
            >
              {console.log(images)}X
            </span>
            <p>{featuredIndex === index ? "Featured" : ""}</p>
          </div>
        ))}
      </div>

      <button
        disabled={isAuthenticated && disabled}
        type="submit"
        className={`${styles.submitBtn} ${
          isAuthenticated ? "" : styles.notAuthBtn
        }`}
        style={{
          opacity: isAuthenticated && disabled ? 0.5 : 1,
          cursor: isAuthenticated && disabled ? "not-allowed" : "pointer",
        }}
      >
        Add Product
      </button>

      <span>{mutation.isPending ? "Creating..." : ""}</span>
    </form>
  );
}
