import { Note } from "../types/note.type";
import LocalStorageService from "./LocalStorageService";

export const LOCAL_STORAGE = new LocalStorageService<Note[]>('notes');
