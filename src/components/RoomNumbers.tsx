"use client";
import {
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { db } from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { Input } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function RoomNumbers() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [ref, setRef] = useState<DocumentReference<
    DocumentData,
    DocumentData
  > | null>(null);
  const [numToPost, setNumToPost] = useState<number>();

  const { id } = useParams<{ id: string }>();
  if (!id) return null;

  const roomsRef = collection(db, "rooms");
  const roomQuery = query(roomsRef, where("roomId", "==", +id));

  const getRef = async () => {
    const snapshot = await getDocs(roomQuery);
    setRef(snapshot.docs[0].ref);
  };

  onSnapshot(roomQuery, (snapshot) => {
    setNumbers(snapshot.docs[0].data().numbers);
  });

  useEffect(() => {
    getRef();
  }, [id]);

  const postNumber = async () => {
    if (!ref) return;
    await updateDoc(ref, { numbers: [...numbers, numToPost] });
  };

  return (
    <section className="h-1/2 bg-white rounded-r-2xl absolute left-0 inset-y-0 my-auto w-[70px] py-1 px-2 flex flex-col items-center border-b-4 border-gray-400 shadow-md">
      <div className="flex-1 flex flex-col gap-1 pt-1">
        {numbers.map((num) => (
          <p className="text-center font-bold mx-1 text-xl size-9 bg-orange-500 text-white rounded-full flex justify-center items-center">
            {num}
          </p>
        ))}
      </div>
      <div>
        <Input
          type="number"
          min={10}
          max={99}
          value={numToPost}
          className="input-default"
          onChange={(e) => setNumToPost(+e.target.value)}
        />
        <button
          onClick={postNumber}
          className="btn-green !p-2 flex justify-center items-center"
        >
          <PaperAirplaneIcon className="size-6" />
        </button>
      </div>
    </section>
  );
}
