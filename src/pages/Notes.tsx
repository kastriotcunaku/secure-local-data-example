import AddNoteDialog from "@/components/addNoteDialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LOCAL_STORAGE } from "@/lib/services";
import { Note } from "@/lib/types/note.type";
import { useEffect, useState } from "react";

const Notes = () => {
  const [privateNotes, setPrivateNotes] = useState<Note[]>(
    LOCAL_STORAGE.getData() ?? []
  );

  useEffect(() => {
    LOCAL_STORAGE.setData(privateNotes);
  }, [privateNotes]);

  const addNewNote = (note: Note) => {
    privateNotes.push(note);
    setPrivateNotes([...privateNotes]);
  };

  const deleteNote = (index: number) => {
    privateNotes.splice(index, 1);
    setPrivateNotes([...privateNotes]);
  };

  return (
    <div className="w-full">
      <div className="header-wrapper flex mb-6">
        <h1 className="text-2xl font-semibold flex-1">Private notes</h1>
        <AddNoteDialog onSubmit={addNewNote} />
      </div>
      {
        privateNotes.length === 0 && (
          <div className="text-center text-lg text-gray-500 mt-4">
            No notes available
          </div>
        )
      }
      <Accordion type="single" collapsible className="w-full">
        {privateNotes.map((note, i) => (
          <AccordionItem key={note.created_at} value={note.created_at.toString()}>
            <AccordionTrigger>{note.title}</AccordionTrigger>
            <AccordionContent>
              <p className="mb-3">
                {note.description}
              </p>
              <a className="hover:underline hover:cursor-pointer" onClick={() => deleteNote(i)}>Delete</a>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default Notes;
