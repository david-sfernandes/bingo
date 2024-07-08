"use client";
import {
  collection,
  doc,
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

  // onSnapshot(roomQuery, (snapshot) => {
  //   setNumbers(snapshot.docs[0].data().numbers);
  // });

  useEffect(() => {
    getRef();
  }, [id]);

  useEffect(() => {
    if (!ref) return;

    const unsubscribe = onSnapshot(ref, (doc) => {
      if (doc.exists()) {
        setNumbers(doc.data().numbers || []);
      }
    });

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, [ref]);

  const postNumber = async () => {
    if (!ref) return;
    updateDoc(ref, { numbers: [...numbers, numToPost] });
  };

  return (
    <section className="h-[410px] bg-white rounded-r-2xl absolute left-0 inset-y-0 my-auto w-[72px] py-1 px-2 items-center border-b-4 border-gray-400 shadow-md grid grid-rows-[300px_100px]">
      <div className="pt-1 overflow-y-scroll h-[300px]">
        {numbers.map((num) => (
          <p className="text-center mt-1 font-bold mx-1 text-xl size-9 bg-orange-500 text-white rounded-full flex justify-center items-center">
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
