import { faShoppingCart, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./cart.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import { postCartAdd } from "../../fetchData/postData";
import { delCart } from "../../fetchData/delData";
import { CartContext } from "../../Context/CartContext";

export default function CartAddDel({ id, quantity, slug }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useContext(AuthContext);
  const { cart, refetchCart } = useContext(CartContext);

  const [inCart, setInCart] = useState(false);
  const [icon, setIcon] = useState(faShoppingCart);

  useEffect(() => {
    if (!cart || cart === "...Loading") return;
    const isInCart = cart.items?.some((item) => item.slug === slug);
    setInCart(isInCart);
  }, [cart, id]);

  const cartAddMutation = useMutation({
    mutationKey: ["cartAdd", id],
    mutationFn: postCartAdd,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
      // setInCart(true);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("add mutation settled");
    },
  });

  const cartDelMuation = useMutation({
    mutationKey: ["cartDel", id],
    mutationFn: delCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      console.log(data);
      // setInCart(false);
    },
    onError: (err) => {
      console.error(err);
    },
    onSettled: () => {
      console.log("del mutation settled");
    },
  });
  const handleClick = () => {
    if (!isAuthenticated) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    if (inCart) {
      const foundItem = cart.items?.find((item) => item.slug === slug);

      if (foundItem) {
        const itemId = foundItem.id;
        setInCart(false);
        cartDelMuation.mutate(
          {
            product_id: itemId,
          },
          {
            onSuccess: () => {
              refetchCart;
            },
          }
        );
      }
    } else {
      setInCart(true);
      cartAddMutation.mutate(
        {
          product_id: id,
          quantity: quantity,
        },
        {
          onSuccess: () => {
            refetchCart;
          },
        }
      );
    }

    console.log({ id, quantity });
  };
  useEffect(() => {
    if (inCart) {
      setIcon(faX);
    } else {
      setIcon(faShoppingCart);
    }
  }, [icon, cartAddMutation, cartDelMuation]);
  return (
    <>
      <button onClick={handleClick} className={styles.addToCart}>
        <FontAwesomeIcon icon={icon} size="1x" />
      </button>
    </>
  );
}
