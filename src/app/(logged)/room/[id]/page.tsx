"use client";
import CardWithAccount from "@/components/CardWithAccount";
import {
  collection,
  DocumentData,
  getDocs,
  Query,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../../firebaseConfig";

type DocSnap = QueryDocumentSnapshot<DocumentData>;

export default function RoomPage({ params }: { params: { id: number } }) {
  const id = +params.id;
  const [userDoc, setUserDoc] = useState<DocSnap | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const usersCol = collection(db, "users");

  const getUserDoc = (userQuery: Query<DocumentData, DocumentData>) => {
    if (!auth.currentUser?.uid || !id) {
      setMessage("Você não está logado!");
      return;
    }

    getDocs(userQuery)
      .then((doc) => {
        if (!doc.empty) setUserDoc(doc.docs[0]);
        else setMessage("Não encontramos seus dados nesta sala!");
      })
  };

  useEffect(() => {
    if (!auth.currentUser) return;
    let userQuery = query(
      usersCol,
      where("userId", "==", auth.currentUser?.uid),
      where("roomId", "==", id)
    );
    getUserDoc(userQuery);
  }, [loading]);

  auth.authStateReady().then(() => setLoading(false));

  if (loading) {
    return <p>loading...</p>;
  }

  if (!userDoc || !auth.currentUser?.uid || !id)
    return (
      <div>
        <h3 className="font-medium text-lg">Não ao carregar dados!</h3>
        <p>{message}</p>
      </div>
    );

  console.log("render page");
  return <CardWithAccount userDoc={userDoc} />;
}
