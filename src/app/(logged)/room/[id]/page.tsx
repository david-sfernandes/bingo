"use client";
import CardWithAccount from "@/components/CardWithAccount";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../../../../firebaseConfig";
import RoomNumbers from "@/components/RoomNumbers";

export default function RoomPage({ params }: { params: { id: number } }) {
  const id = +params.id;
  const [roomDoc, setRoomDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [userDoc, setUserDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);

  const getRoomDoc = () => {
    let roomsRef = collection(db, "rooms");
    const roomQuery = query(roomsRef, where("roomId", "==", id));
    getDocs(roomQuery).then((snapshot) => {
      if (!snapshot.empty) {
        setRoomDoc(snapshot.docs[0]);
      }
    });
  };

  const getUserDoc = () => {
    const userDoc = collection(db, "users");
    const userQuery = query(
      userDoc,
      where("userId", "==", auth.currentUser?.uid),
      where("roomId", "==", id)
    );
    getDocs(userQuery).then((snapshot) => {
      if (!snapshot.empty) setUserDoc(snapshot.docs[0]);
    });
  };

  const isPlayerInRoom = () => {
    if (!auth.currentUser || !roomDoc) return;
    const data = roomDoc.data();
    return data.players.includes(auth.currentUser.email);
  };

  useEffect(() => getRoomDoc(), []);
  useEffect(() => {
    if (roomDoc && isPlayerInRoom()) getUserDoc();
  }, [roomDoc]);

  if (!userDoc && !roomDoc) return null;
  console.log("render page");
  return (
    <>
      <CardWithAccount userDoc={userDoc} />
    </>
  );
}
