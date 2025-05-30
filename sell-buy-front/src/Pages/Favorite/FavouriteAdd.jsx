import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faHeart as faHeartSolid,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./favourite.module.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postFavAdd } from "../../fetchData/postData";
import { FavoriteContext } from "../../Context/FavoriteContext";
import { delFav } from "../../fetchData/delData";
import { AuthContext } from "../../Context/AuthContext";

export default function FavouriteAddDel({ id }) {
  const navigate = useNavigate();
  const { favorites, setFavorites, refetchFavorites } =
    useContext(FavoriteContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [inFav, setInFav] = useState(false);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (!favorites || favorites === "...Loading") return;

    const isInFavorites = favorites.items?.some(
      (item) => item.product.id === id
    );

    setInFav(isInFavorites);
  }, [favorites, id]);

  // Mutation to ADD favorite
  const favAddMutation = useMutation({
    mutationKey: ["favAdd", id],
    mutationFn: postFavAdd,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
      setFavorites(data); // update global favorites
      setInFav(true); // show solid heart immediately
    },
    onError: (err) => {
      console.error(err);
      setInFav(false); // rollback
    },
  });

  // Mutation to DELETE favorite
  const favDelMutation = useMutation({
    mutationKey: ["favDel", id],
    mutationFn: delFav,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
      setFavorites(data); // update global favorites
      setInFav(false); // show empty heart immediately
    },
    onError: (err) => {
      console.error(err);
      setInFav(true); // rollback
    },
  });

  const handleClick = () => {
    if (!isAuthenticated) {
      alert("please log in first");
      navigate("/login");
      return;
    }

    if (inFav) {
      setInFav(false); // optimistic update
      favDelMutation.mutate(
        { product_id: id },
        {
          onSuccess: () => {
            refetchFavorites;
          },
        }
      );
    } else {
      setInFav(true); // optimistic update
      favAddMutation.mutate(
        { product_id: id },
        {
          onSuccess: () => {
            refetchFavorites;
          },
        }
      );
    }
  };

  const icon = () => {
    if (!isAuthenticated) {
      return faHeartRegular;
    }
    if (!favorites || favorites === "...Loading") {
      return faSpinner;
    } else if (inFav) {
      return faHeartSolid;
    } else {
      return faHeartRegular;
    }
  };

  return (
    <button onClick={handleClick} className={styles.favouriteBtn}>
      {favAddMutation.isPending || favDelMutation.isPending ? (
        <FontAwesomeIcon icon={faSpinner} />
      ) : (
        <FontAwesomeIcon icon={icon()} size="1x" />
      )}
    </button>
  );
}
