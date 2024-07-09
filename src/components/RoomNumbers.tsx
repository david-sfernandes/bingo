"use client";
import { Input } from "@headlessui/react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";

export default function RoomNumbers({ id }: { id: number }) {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [ref, setRef] = useState<DocRef | null>(null);
  const [numToPost, setNumToPost] = useState<number>();

  const roomsRef = collection(db, "rooms");
  const roomQuery = query(roomsRef, where("roomId", "==", +id));

  useEffect(() => {
    const getNumbers = async () => {
      const snapshot = await getDocs(roomQuery);
      const docRef = snapshot.docs[0].ref;
      setRef(docRef);
      onSnapshot(docRef, (doc: DocRef) => {
        setNumbers(doc.data().numbers);
      });
    };

    getNumbers();
  }, []);

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
