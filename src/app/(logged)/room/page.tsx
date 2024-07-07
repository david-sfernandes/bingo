"use client";
import { Button, Input } from "@headlessui/react";
import { useState } from "react";
import { auth, db } from "../../../../firebaseConfig";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from "firebase/firestore";
import generateNumbers from "@/utils/generateNumbers";
import { useRouter } from "next/navigation";

export default function RoomPage() {
  const [room, setRoom] = useState<number>(0);
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const createRoom = async () => {
    if (!auth.currentUser && room > 0) return;
    let roomRef,
      playerRef = null;

    try {
      roomRef = await addDoc(collection(db, "rooms"), {
        roomId: room,
        players: [auth.currentUser?.email],
        numbers: [],
      });
      playerRef = await addDoc(collection(db, "users"), {
        userId: auth.currentUser?.uid,
        roomId: room,
        numbers: generateNumbers(10, 99),
        selectedNumbers: [],
      });
    } catch (error) {
      console.error("Error creating room: ", error);
      setMessage("Erro ao criar sala, tente novamente.");
    }

    if (roomRef && playerRef) {
      router.push(`/room/${room}`);
    }
  };

  const enterRoom = async () => {
    if (!auth.currentUser && room > 0) return;
    let roomsRef = collection(db, "rooms");

    const roomQuery = query(roomsRef, where("roomId", "==", room));
    const roomSnapshot = await getDocs(roomQuery);
    if (!roomSnapshot.empty) {
      roomSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.players.includes(auth.currentUser?.email)) {
          router.push(`/room/${room}`);
        } else {
          updateRoom(roomSnapshot.docs[0]);
        }
      });
    } else {
      setMessage(
        "Sala não encontrada! Você pode cria-la clicando no botão abaixo."
      );
    }
  };

  const updateRoom = async (
    roomDoc: QueryDocumentSnapshot<DocumentData, DocumentData>
  ) => {
    try {
      await updateDoc(roomDoc.ref, {
        players: [...roomDoc.data().players, auth.currentUser?.email],
      });
      await addDoc(collection(db, "users"), {
        userId: auth.currentUser?.uid,
        roomId: room,
        numbers: generateNumbers(10, 99),
        selectedNumbers: [],
      });
      router.push(`/room/${room}`);
    } catch (error) {
      console.error("Error updating room: ", error);
      setMessage("Erro ao entrar na sala, tente novamente.");
    }
  };

  return (
    <div>
      <h2>Selecione a sala que deleja jogar ou crie uma nova</h2>
      <Input
        type="number"
        className="input-default"
        value={room}
        onChange={(e) => setRoom(parseInt(e.target.value))}
      />
      {message && <p className="py-1">{message}</p>}
      <Button className="btn-green" onClick={enterRoom}>
        Entrar
      </Button>
      <Button className="btn-orange" onClick={createRoom}>
        Criar nova sala
      </Button>
    </div>
  );
}
