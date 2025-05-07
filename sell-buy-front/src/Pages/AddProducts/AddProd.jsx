import { useState } from "react";
import styles from "./addProd.module.css";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getProductsCategories } from "../../fetchData/getData";
import { SignForm } from "../../Components/Ui/inputs/Inputs";
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
    onSuccess: () => {
      alert("Product created!");
      // Optionally reset the form or invalidate product list query
    },
    onError: (error) => {
      alert(error.message || "Upload failed");
    },
  });

  const handleChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImages = (e) => {
    const files = Array.from(e.target.files).slice(0, 6);
    setImages(files);
    if (featuredIndex === null && files.length > 0) setFeaturedIndex(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({ formData, images, featuredIndex });
  };

  if (categQueries.isLoading) return <h1 className="bottomNav">Loading</h1>;
  if (categQueries.isError) return <h1 className="bottomNav">Error</h1>;

  return (
    <form className={`bottomNav ${styles.form}`} onSubmit={handleSubmit}>
      <h2>Add New Product</h2>

      <SignForm
        label="Name"
        type="text"
        placeholder="Product Name"
        name="name"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <SignForm
        label="Description"
        type="text"
        placeholder="Product Description"
        name="description"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <SignForm
        label="Price"
        type="number"
        placeholder="Price"
        name="price"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <SignForm
        label="Stock"
        type="number"
        placeholder="Stock"
        name="stock"
        value={formData}
        handleChange={handleChange}
        className={styles.input}
      />

      <label className={styles.label}>Condition:</label>
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

      <label className={styles.label}>Category:</label>
      <select
        name="category"
        value={formData.category}
        onChange={(e) => handleChange(e, "category")}
        className={styles.select}
      >
        <option value="">Select Category</option>
        {categQueries.data?.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <label className={styles.label}>Images (max 6):</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImages}
        className={styles.fileInput}
      />

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

      <button type="submit" className={styles.submitBtn}>
        Add Product
      </button>
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
