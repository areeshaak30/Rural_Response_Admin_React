import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig/firebase";

const useFetchData = ({ collectionName, queryArray, dependency }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ref = collection(db, collectionName);
    const q = query(ref, ...queryArray);

    getDocs(q)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
        setLoading(false);
      });
  }, [collectionName, dependency, queryArray]);

  return { data, loading, error };
};

export default useFetchData;
